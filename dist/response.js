"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _stringCase = require("./string-case");

var jsonResponse = function jsonResponse(response) {
  return function (json) {
    return new Promise(function (resolve, reject) {
      var status = response.status;

      var callback = Math.round(status / 100) === 2 ? resolve : reject;

      callback(_extends({}, (0, _stringCase.camelize)(json), { response: response, status: status }));
    });
  };
};

var textResponse = function textResponse(response) {
  return function (text) {
    return new Promise(function (resolve, reject) {
      var status = response.status,
          statusText = response.statusText;


      if (Math.round(status / 100) === 2) {
        resolve({ text: text, response: response, status: status });
      } else {
        /* eslint-disable-next-line prefer-promise-reject-errors */
        reject({ error: statusText, response: response, status: status });
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

exports.default = processResponse;