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
/* eslint-disable no-promise-executor-return */
const signUpload = (file, onProgress) => (
  new Promise((resolve, reject) => (
    fetch(config.signerURL)
      .then(response => response.json())
      .then(({ policy, signature, key }) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${config.uploadBucket}/`);

        xhr.upload.addEventListener("load", event => {
          if (event.type === "error") {
            reject(event);
          } else {
            resolve(`${config.uploadBucket}/${key}`);
          }
        });

        xhr.upload.addEventListener("error", reject);

        if (onProgress) {
          xhr.upload.addEventListener("progress", ({ loaded, total }) => {
            onProgress(total === 0 ? 100 : Math.ceil((loaded / total) * 100));
          });
        }

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
      })
      .catch(reject)
  ))
);

export default signUpload;