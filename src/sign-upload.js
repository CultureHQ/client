import "isomorphic-fetch";

import formData from "./form-data";

const signUpload = async (client, file, onProgress) => {
  const response = await fetch(client.signerUrl);
  const { policy, signature, key } = await response.json();

  return new Promise((resolve, reject) => {
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
  });
};

export default signUpload;
