"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require("./constants");

var _formData = require("./form-data");

var _formData2 = _interopRequireDefault(_formData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signUpload = function signUpload(file, onProgress) {
  return new Promise(function (resolve, reject) {
    return fetch(_constants.SIGNER_URL).then(function (response) {
      return response.json();
    }).then(function (_ref) {
      var policy = _ref.policy,
          signature = _ref.signature,
          key = _ref.key;

      var xhr = new XMLHttpRequest();
      xhr.open("POST", _constants.UPLOAD_BUCKET + "/");

      xhr.upload.addEventListener("load", function (event) {
        if (event.type === "error") {
          reject(event);
        } else {
          resolve(_constants.UPLOAD_BUCKET + "/" + key);
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

      xhr.send((0, _formData2.default)({
        key: key,
        AWSAccessKeyId: _constants.AWS_ACCESS_KEY_ID,
        acl: "public-read",
        policy: policy,
        signature: signature,
        success_action_status: "201",
        "Content-Type": file.type,
        file: file
      }));
    }).catch(reject);
  });
};

exports.default = signUpload;