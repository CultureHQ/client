"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _stringCase = require("./stringCase");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var jsonResponse = function jsonResponse(response) {
  return function (json) {
    return new Promise(function (resolve, reject) {
      var status = response.status;
      var callback = Math.round(status / 100) === 2 ? resolve : reject;
      callback(_objectSpread({}, (0, _stringCase.camelize)(json), {
        response: response,
        status: status
      }));
    });
  };
};

var textResponse = function textResponse(response) {
  return function (text) {
    return new Promise(function (resolve, reject) {
      var status = response.status,
          statusText = response.statusText;

      if (Math.round(status / 100) === 2) {
        resolve({
          text: text,
          response: response,
          status: status
        });
      } else {
        /* eslint-disable-next-line prefer-promise-reject-errors */
        reject({
          error: statusText,
          response: response,
          status: status
        });
      }
    });
  };
};

var processResponse = function processResponse(response) {
  var status = response.status;

  if (status === 204) {
    return Promise.resolve(null);
  }

  var contentType = response.headers.get("content-type");

  if (contentType.startsWith("text/html") || contentType.startsWith("text/plain")) {
    return response.text().then(textResponse(response));
  }

  return response.json().then(jsonResponse(response));
};

var _default = processResponse;
exports["default"] = _default;