import AWS from "aws-sdk";
import fs from "fs";
import path from "path";
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
const signUpload = (file, onProgress) => {
  if (config.uploadBucket !== "https://culturehq-direct-uploads-eu.s3-eu-west-2.amazonaws.com") {
    return new Promise((resolve, reject) => (
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
    ));
  }

  AWS.config.loadFromPath("./aws-config.json");
  const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
  // call S3 to retrieve upload file to specified bucket
  const uploadParams = { Bucket: config.uploadBucket, Key: "", Body: "" };

  // Configure the file stream and obtain the upload parameters
  const fileStream = fs.createReadStream(file);
  fileStream.on("error", err => {
    // eslint-disable-next-line no-console
    console.log("File Error", err);
  });
  uploadParams.Body = fileStream;
  uploadParams.Key = path.basename(file);

  // call S3 to retrieve upload file to specified bucket
  return new Promise((resolve, reject) => (
    s3.upload(uploadParams, (err, data) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log("Error", err);
        reject(err);
      } if (data) {
        // eslint-disable-next-line no-console
        console.log("Upload Success", data.Location);
        resolve(`${config.uploadBucket}/${data.Location}`);
      }
    })
  ));
};

export default signUpload;
