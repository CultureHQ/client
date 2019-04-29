"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("./constants");

var _formData = _interopRequireDefault(require("./formData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
var signUpload = function signUpload(file, onProgress) {
  return new Promise(function (resolve, reject) {
    return fetch(_constants.SIGNER_URL).then(function (response) {
      return response.json();
    }).then(function (_ref) {
      var policy = _ref.policy,
          signature = _ref.signature,
          key = _ref.key;
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "".concat(_constants.UPLOAD_BUCKET, "/"));
      xhr.upload.addEventListener("load", function (event) {
        if (event.type === "error") {
          reject(event);
        } else {
          resolve("".concat(_constants.UPLOAD_BUCKET, "/").concat(key));
        }
      });
      xhr.upload.addEventListener("error", reject);

      if (onProgress) {
        xhr.upload.addEventListener("progress", function (_ref2) {
          var loaded = _ref2.loaded,
              total = _ref2.total;
          onProgress(total === 0 ? 100 : Math.ceil(loaded / total * 100));
        });
      }

      xhr.send((0, _formData["default"])({
        key: key,
        AWSAccessKeyId: _constants.AWS_ACCESS_KEY_ID,
        acl: "public-read",
        policy: policy,
        signature: signature,
        success_action_status: "201",
        "Content-Type": file.type,
        file: file
      }));
    })["catch"](reject);
  });
};

var _default = signUpload;
exports["default"] = _default;