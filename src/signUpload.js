/* eslint-disable no-console */
import config from "./config";
import formData from "./formData";

/**
 * To support faster uploading, we allow images to be uploaded directly to S3,
 * and then just send along the signed URL to the API for fetching. This allows
 * API servers to continue processing requests instead of waiting for the upload
 * to complete.
 *
 * To use this mechanism, call this function with a file object and it will
 * return a Promise that resolves to the URL of the file that was uploaded, as
 * in the following example:
 *
 *     import { signUpload } from "@culturehq/client";
 *
 *     signUpload(document.querySelector("#file").files[0]).then(url => {
 *       console.log(url);
 *     });
 */

/**
 * @typedef {Object} UploadCredentials
 * @property {string} policy - The S3 policy document
 * @property {string} signature - The S3 signature
 * @property {string} key - The S3 object key
 */

/**
 * @typedef {Object} UploadErrorDetails
 * @property {Object} fileInfo - Information about the uploaded file
 * @property {Object} error - Error information
 * @property {Object} request - Request information
 * @property {string} timestamp - Error timestamp
 */

/**
 * @typedef {Object} UploadProgress
 * @property {number} loaded - Bytes loaded
 * @property {number} total - Total bytes to upload
 */

// Constants
const UPLOAD_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 2000, // 2 seconds
  UPLOAD_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  ERROR_TYPES: {
    VALIDATION: "VALIDATION_ERROR",
    INITIALIZATION: "INITIALIZATION_ERROR",
    NETWORK: "NETWORK_ERROR",
    PERMISSION: "PERMISSION_ERROR",
    FILE_TOO_LARGE: "FILE_TOO_LARGE",
    UPLOAD: "UPLOAD_ERROR",
    S3: "S3_ERROR",
    RESPONSE: "RESPONSE_ERROR",
    UNKNOWN: "UNKNOWN_ERROR"
  }
};

class UploadError extends Error {
  constructor(message, details) {
    super(message);
    this.name = "UploadError";
    this.details = details;
    this.errorInfo = {
      message: this.message,
      details: this.details,
      name: this.name
    };
  }
}

const getErrorDetails = (error, file, xhr) => ({
  fileInfo: {
    size: file.size,
    type: file.type,
    name: file.name
  },
  error: {
    type: error?.type,
    message: error?.message,
    stack: error?.stack
  },
  request: {
    status: xhr?.status,
    responseText: xhr?.responseText,
    readyState: xhr?.readyState
  },
  timestamp: new Date().toISOString()
});

/**
 * Logs detailed information about the file being uploaded
 * This helps diagnose issues with MediaRecorder blobs vs regular files
 * @param {File} file - The file to analyze
 * @param {string} uploadId - Upload tracking ID
 */
const logFileDetails = (file, uploadId) => {
  console.log(`[Upload ${uploadId}] Detailed file analysis`, {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    // Check if it"s a Blob vs File
    isBlob: file instanceof Blob,
    isFile: file instanceof File,
    // For MediaRecorder blobs, these might be different
    constructor: file.constructor.name,
    // Try to detect if this is a MediaRecorder blob
    likelyMediaRecorderBlob: !file.lastModifiedDate && file.type.includes("video")
  });
};

/**
 * Signs and uploads a file to S3
 * @param {File} file - The file to upload
 * @param {function(number): void} [onProgress] - Optional progress callback
 * @param {number} [attempt=0] - Current attempt number
 * @returns {Promise<string>} Promise resolving to the uploaded file URL
 * @throws {UploadError} If the upload fails
 */
const signUpload = async (file, onProgress, attempt = 0) => {
  if (!file) {
    throw new UploadError("No file provided", {
      errorType: UPLOAD_CONFIG.ERROR_TYPES.VALIDATION,
      attemptsMade: 0,
      timestamp: new Date().toISOString()
    });
  }

  console.log("[signUpload] Initiating upload", {
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
    attempt: attempt + 1,
    signerURL: config.signerURL
  });

  try {
    console.log("[signUpload] Fetching upload credentials");
    const response = await fetch(config.signerURL);
    if (!response.ok) {
      throw new Error(`Failed to get upload credentials: ${response.status} ${response.statusText}`);
    }
    const credentials = await response.json();
    console.log("[signUpload] Credentials received", {
      hasPolicy: !!credentials.policy,
      hasSignature: !!credentials.signature,
      hasKey: !!credentials.key,
      key: credentials.key
    });
    // eslint-disable-next-line no-use-before-define
    return performUpload(file, credentials, onProgress, attempt);
  } catch (error) {
    console.error("[signUpload] Error during initialization", {
      error: error.message,
      attempt: attempt + 1
    });

    if (attempt < UPLOAD_CONFIG.MAX_RETRIES) {
      console.log(`[signUpload] Retrying credential fetch (attempt ${attempt + 2}/${UPLOAD_CONFIG.MAX_RETRIES + 1})`);
      // eslint-disable-next-line no-promise-executor-return
      await new Promise(resolve => setTimeout(resolve, UPLOAD_CONFIG.RETRY_DELAY));
      return signUpload(file, onProgress, attempt + 1);
    }

    if (error instanceof UploadError) throw error;

    throw new UploadError("Failed to initialize upload", {
      errorType: UPLOAD_CONFIG.ERROR_TYPES.INITIALIZATION,
      attemptsMade: attempt + 1,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
};

/**
 * Performs the actual file upload to S3
 * @param {File} file - The file to upload
 * @param {UploadCredentials} credentials - S3 upload credentials
 * @param {function(number): void} [onProgress] - Optional progress callback
 * @param {number} [attempt=0] - Current attempt number
 * @returns {Promise<string>} Promise resolving to the uploaded file URL
 */
const performUpload = (file, { policy, signature, key }, onProgress, attempt = 0) => (
  new Promise((resolve, reject) => {
    // Generate upload ID for tracking this specific upload
    const uploadId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    console.log(`[Upload ${uploadId}] Starting upload`, {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      attempt: attempt + 1,
      key,
      timestamp: new Date().toISOString()
    });

    // Log detailed file information to help diagnose MediaRecorder blob issues
    logFileDetails(file, uploadId);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${config.uploadBucket}/`);
    xhr.timeout = UPLOAD_CONFIG.UPLOAD_TIMEOUT;

    // Track uploaded bytes for validation - MUST be declared before onload handler
    let uploadedBytes = 0;
    let progressEventFired = false;

    const retryOrReject = error => {
      const errorDetails = getErrorDetails(error, file, xhr);

      console.error(`[Upload ${uploadId}] Upload error`, {
        ...errorDetails,
        uploadedBytes,
        progressEventFired,
        attempt: attempt + 1
      });

      if (attempt < UPLOAD_CONFIG.MAX_RETRIES) {
        console.log(`[Upload ${uploadId}] Retrying upload (attempt ${attempt + 2}/${UPLOAD_CONFIG.MAX_RETRIES + 1})`);
        setTimeout(() => {
          signUpload(file, onProgress, attempt + 1)
            .then(resolve)
            .catch(reject);
        }, UPLOAD_CONFIG.RETRY_DELAY);
      } else {
        let errorMessage = "Unknown error occurred";
        let errorType = UPLOAD_CONFIG.ERROR_TYPES.UNKNOWN;

        if (xhr.status === 0) {
          errorMessage = "Network error - check your internet connection";
          errorType = UPLOAD_CONFIG.ERROR_TYPES.NETWORK;
        } else if (xhr.status === 403) {
          errorMessage = "Permission denied - upload authorization failed";
          errorType = UPLOAD_CONFIG.ERROR_TYPES.PERMISSION;
        } else if (xhr.status === 413) {
          errorMessage = "File is too large to upload";
          errorType = UPLOAD_CONFIG.ERROR_TYPES.FILE_TOO_LARGE;
        } else if (error?.message) {
          errorMessage = error.message;
          errorType = UPLOAD_CONFIG.ERROR_TYPES.UPLOAD;
        } else if (xhr.responseText) {
          try {
            const response = JSON.parse(xhr.responseText);
            errorMessage = response.message || response.error || xhr.responseText;
            errorType = UPLOAD_CONFIG.ERROR_TYPES.S3;
          } catch {
            errorMessage = xhr.responseText;
            errorType = UPLOAD_CONFIG.ERROR_TYPES.RESPONSE;
          }
        }

        console.error(`[Upload ${uploadId}] Upload failed after all retries`, {
          errorMessage,
          errorType,
          attemptsMade: UPLOAD_CONFIG.MAX_RETRIES
        });

        reject(new UploadError(
          `Upload failed after ${UPLOAD_CONFIG.MAX_RETRIES} attempts: ${errorMessage}`,
          {
            ...errorDetails,
            errorType,
            attemptsMade: UPLOAD_CONFIG.MAX_RETRIES,
            finalError: errorMessage,
            uploadId
          }
        ));
      }
    };

    // Handle successful response from S3
    xhr.onload = () => {
      console.log(`[Upload ${uploadId}] XHR onload fired`, {
        status: xhr.status,
        statusText: xhr.statusText,
        uploadedBytes,
        expectedBytes: file.size,
        progressEventFired,
        responseTextLength: xhr.responseText?.length,
        responsePreview: xhr.responseText?.substring(0, 200)
      });

      // S3 returns 201 for successful uploads (due to success_action_status: "201")
      if (xhr.status === 201) {
        // Verify the response contains valid XML from S3
        if (xhr.responseText && xhr.responseText.includes("<PostResponse>")) {
          // Additional validation: check if we actually uploaded the file data
          // The uploadedBytes should be close to file.size (accounting for multipart form overhead)

          if (!progressEventFired) {
            console.warn(`[Upload ${uploadId}] WARNING: No progress events fired during upload - cannot verify data transmission`);
            // For files where progress events don"t fire, we"ll trust the S3 response
            // but log a warning
          } else if (uploadedBytes === 0) {
            console.error(`[Upload ${uploadId}] CRITICAL: Upload completed but no data was transmitted`);
            retryOrReject(new Error("Upload completed but no data was transmitted - likely blocked by proxy/firewall"));
            return;
          } else if (uploadedBytes < file.size * 0.9) {
            // If less than 90% of file size was uploaded (accounting for form data overhead)
            console.error(`[Upload ${uploadId}] CRITICAL: Incomplete upload detected`, {
              uploadedBytes,
              fileSize: file.size,
              percentageUploaded: ((uploadedBytes / file.size) * 100).toFixed(2)
            });
            retryOrReject(new Error(`Upload incomplete: only ${uploadedBytes} bytes transmitted of ${file.size} byte file - may be blocked by proxy/firewall`));
            return;
          }

          const finalUrl = `${config.uploadBucket}/${key}`;
          console.log(`[Upload ${uploadId}] Upload successful`, {
            url: finalUrl,
            uploadedBytes,
            fileSize: file.size,
            progressEventFired
          });
          resolve(finalUrl);
        } else {
          // Response doesn"t look like valid S3 response - might be intercepted
          console.error(`[Upload ${uploadId}] Invalid S3 response detected`, {
            responseText: xhr.responseText?.substring(0, 500)
          });
          retryOrReject(new Error("Invalid S3 response - upload may have been intercepted by proxy/firewall"));
        }
      } else if (xhr.status >= 200 && xhr.status < 300) {
        // Unexpected success status - S3 should return 201
        console.error(`[Upload ${uploadId}] Unexpected success status: ${xhr.status}`);
        retryOrReject(new Error(`Unexpected response status ${xhr.status} - expected 201 from S3`));
      } else {
        // Clear error status
        console.error(`[Upload ${uploadId}] S3 error status: ${xhr.status}`);
        retryOrReject(new Error(`S3 returned error status: ${xhr.status}`));
      }
    };

    // Handle upload error
    xhr.upload.addEventListener("error", error => {
      console.error(`[Upload ${uploadId}] Upload error event`, { error });
      retryOrReject(error);
    });

    // Handle timeout
    xhr.ontimeout = () => {
      console.error(`[Upload ${uploadId}] Upload timeout after ${UPLOAD_CONFIG.UPLOAD_TIMEOUT}ms`);
      retryOrReject(new Error("Upload timed out"));
    };

    // Handle network errors
    xhr.onerror = () => {
      console.error(`[Upload ${uploadId}] Network error`);
      retryOrReject(new Error("Network error occurred"));
    };

    // Handle progress
    xhr.upload.addEventListener("progress", ({ loaded, total }) => {
      progressEventFired = true;
      uploadedBytes = loaded;

      console.log(`[Upload ${uploadId}] Progress`, {
        loaded,
        total,
        percentage: total > 0 ? ((loaded / total) * 100).toFixed(2) : 0
      });

      if (onProgress) {
        const progress = total === 0 ? 100 : Math.ceil((loaded / total) * 100);
        onProgress(Math.min(progress, 100));
      }
    });

    // Handle loadstart to track if upload actually starts
    xhr.upload.addEventListener("loadstart", () => {
      console.log(`[Upload ${uploadId}] Upload started`);
    });

    // Handle loadend to track when upload completes
    xhr.upload.addEventListener("loadend", () => {
      console.log(`[Upload ${uploadId}] Upload loadend`, {
        uploadedBytes,
        progressEventFired
      });
    });

    // Send the upload
    try {
      const formDataToSend = formData({
        key,
        AWSAccessKeyId: config.awsAccessKeyId,
        acl: "public-read",
        policy,
        signature,
        success_action_status: "201",
        "Content-Type": file.type,
        file
      });

      console.log(`[Upload ${uploadId}] Sending XHR request`, {
        bucket: config.uploadBucket,
        key,
        fileType: file.type,
        hasFormData: !!formDataToSend
      });

      xhr.send(formDataToSend);
    } catch (error) {
      console.error(`[Upload ${uploadId}] Error sending XHR`, { error });
      retryOrReject(error);
    }
  })
);

export default signUpload;
