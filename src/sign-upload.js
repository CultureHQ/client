import "isomorphic-fetch";

import formData from "./form-data";

const signUpload = (client, file, onProgress) => (
  new Promise((resolve, reject) => (
    fetch(client.signerUrl).then(response => response.json()).then(({ policy, signature, key }) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${client.uploadBucket}/`);

      xhr.addEventListener("load", event => {
        if (event.type === "error") {
          reject(event);
        } else {
          resolve(`${client.uploadBucket}/${key}`);
        }
      });

      xhr.addEventListener("error", reject);

      if (onProgress) {
        xhr.addEventListener("progress", event => {
          onProgress(Math.ceil((event.loaded / event.total) * 100));
        });
      }

      xhr.send(
        formData({
          key,
          AWSAccessKeyId: client.awsAccessKeyId,
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
