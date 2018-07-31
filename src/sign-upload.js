import { AWS_ACCESS_KEY_ID, SIGNER_URL, UPLOAD_BUCKET } from "./constants";
import formData from "./form-data";

const signUpload = (file, onProgress) => (
  new Promise((resolve, reject) => (
    fetch(SIGNER_URL).then(response => response.json()).then(({ policy, signature, key }) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${UPLOAD_BUCKET}/`);

      xhr.upload.addEventListener("load", event => {
        if (event.type === "error") {
          reject(event);
        } else {
          resolve(`${client.uploadBucket}/${key}`);
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
          AWSAccessKeyId: AWS_ACCESS_KEY_ID,
          acl: "public-read",
          policy,
          signature,
          success_action_status: "201",
          "Content-Type": file.type,
          file
        })
      );
    }).catch(reject)
  ))
);

export default signUpload;
