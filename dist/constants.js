"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CONSTANTS = {
  production: {
    API_HOST: "https://api.culturehq.com",
    AWS_ACCESS_KEY_ID: "AKIAIPWT257FWZ5I4ZGQ",
    SIGNER_URL: "https://726l7tpb5a.execute-api.us-west-2.amazonaws.com/production/signature",
    UPLOAD_BUCKET: "https://culturehq-direct-uploads.s3-us-west-2.amazonaws.com"
  },
  development: {
    API_HOST: "http://localhost:3000",
    AWS_ACCESS_KEY_ID: null,
    SIGNER_URL: "http://localhost:3001",
    UPLOAD_BUCKET: "http://localhost:3001"
  },
  test: {
    API_HOST: "http://localhost:8080",
    AWS_ACCESS_KEY_ID: "access-key-id",
    SIGNER_URL: "http://localhost:8081",
    UPLOAD_BUCKET: "http://localhost:8082"
  }
};

var _CONSTANTS = CONSTANTS[undefined || "development"],
    API_HOST = _CONSTANTS.API_HOST,
    AWS_ACCESS_KEY_ID = _CONSTANTS.AWS_ACCESS_KEY_ID,
    SIGNER_URL = _CONSTANTS.SIGNER_URL,
    UPLOAD_BUCKET = _CONSTANTS.UPLOAD_BUCKET;
exports.API_HOST = API_HOST;
exports.AWS_ACCESS_KEY_ID = AWS_ACCESS_KEY_ID;
exports.SIGNER_URL = SIGNER_URL;
exports.UPLOAD_BUCKET = UPLOAD_BUCKET;