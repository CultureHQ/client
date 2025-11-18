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

  try {
    const response = await fetch(config.signerURL);
    if (!response.ok) {
      throw new Error(`Failed to get upload credentials: ${response.status} ${response.statusText}`);
    }
    const credentials = await response.json();
    // eslint-disable-next-line no-use-before-define
    return performUpload(file, credentials, onProgress, attempt);
  } catch (error) {
    if (attempt < UPLOAD_CONFIG.MAX_RETRIES) {
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
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${config.uploadBucket}/`);
    xhr.timeout = UPLOAD_CONFIG.UPLOAD_TIMEOUT;

    const retryOrReject = error => {
      const errorDetails = getErrorDetails(error, file, xhr);

      if (attempt < UPLOAD_CONFIG.MAX_RETRIES) {
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

        reject(new UploadError(
          `Upload failed after ${UPLOAD_CONFIG.MAX_RETRIES} attempts: ${errorMessage}`,
          {
            ...errorDetails,
            errorType,
            attemptsMade: UPLOAD_CONFIG.MAX_RETRIES,
            finalError: errorMessage
          }
        ));
      }
    };

    // Handle successful response from S3
    xhr.onload = () => {
      // S3 returns 201 for successful uploads (due to success_action_status: "201")
      if (xhr.status === 201) {
        // Verify the response contains valid XML from S3
        if (xhr.responseText && xhr.responseText.includes('<PostResponse>')) {
          // Additional validation: check if we actually uploaded the file data
          // The uploadedBytes should be close to file.size (accounting for multipart form overhead)
          if (uploadedBytes === 0) {
            retryOrReject(new Error("Upload completed but no data was transmitted - likely blocked by proxy/firewall"));
          } else if (uploadedBytes < file.size * 0.9) {
            // If less than 90% of file size was uploaded (accounting for form data overhead)
            retryOrReject(new Error(`Upload incomplete: only ${uploadedBytes} bytes transmitted of ${file.size} byte file - may be blocked by proxy/firewall`));
          } else {
            resolve(`${config.uploadBucket}/${key}`);
          }
        } else {
          // Response doesn't look like valid S3 response - might be intercepted
          retryOrReject(new Error("Invalid S3 response - upload may have been intercepted by proxy/firewall"));
        }
      } else if (xhr.status >= 200 && xhr.status < 300) {
        // Unexpected success status - S3 should return 201
        retryOrReject(new Error(`Unexpected response status ${xhr.status} - expected 201 from S3`));
      } else {
        // Clear error status
        retryOrReject(new Error(`S3 returned error status: ${xhr.status}`));
      }
    };

    // Handle upload error
    xhr.upload.addEventListener("error", retryOrReject);

    // Handle timeout
    xhr.ontimeout = () => {
      retryOrReject(new Error("Upload timed out"));
    };

    // Handle network errors
    xhr.onerror = () => {
      retryOrReject(new Error("Network error occurred"));
    };

    // Track uploaded bytes for validation
    let uploadedBytes = 0;
    
    // Handle progress
    xhr.upload.addEventListener("progress", ({ loaded, total }) => {
      uploadedBytes = loaded;
      if (onProgress) {
        const progress = total === 0 ? 100 : Math.ceil((loaded / total) * 100);
        onProgress(Math.min(progress, 100));
      }
    });

    // Send the upload
    try {
      xhr.send(
        formData({
          key,
          AWSAccessKeyId: config.awsAccessKeyId,
          acl: "public-read",
          policy,
          signature,
          success_action_status: "201",
          "Content-Type": file.type,
          file
        })
      );
    } catch (error) {
      retryOrReject(error);
    }
  })
);

export default signUpload;
