"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringCase = require("./string-case");

var _formData = require("./form-data");

var _formData2 = _interopRequireDefault(_formData);

var _response = require("./response");

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildHeaders = function buildHeaders(_ref) {
  var multipart = _ref.multipart,
      token = _ref.token,
      simulation = _ref.simulation;

  var headers = { "X-Client-Version": "4.1.0" };

  if (!multipart) {
    headers["Content-Type"] = "application/json";
  }
  if (typeof token === "string" && token.length) {
    headers.Authorization = "token " + token;
  }
  if (typeof simulation === "string" && simulation.length) {
    headers["X-Client-Simulation"] = simulation;
  }

  return headers;
};

var attachGetParams = function attachGetParams(url, params) {
  Object.keys(params).forEach(function (key) {
    if (params[key] === undefined || params[key] === null) {
      return;
    }

    if (!Array.isArray(params[key])) {
      url.searchParams.append(key, params[key]);
    } else if (params[key].length) {
      params[key].forEach(function (nestedValue) {
        return url.searchParams.append(key + "[]", nestedValue);
      });
    }
  });
};

var buildRequest = function buildRequest(method, url, options) {
  var reqOptions = { headers: buildHeaders(options), method: method };
  var params = (0, _stringCase.snakerize)(options.params);

  if (method === "GET") {
    attachGetParams(url, params);
  } else if (options.multipart) {
    reqOptions.body = (0, _formData2.default)(params);
  } else {
    reqOptions.body = JSON.stringify(params);
  }

  return { url: url.href, options: reqOptions };
};

var performRequest = function performRequest(method, url, options) {
  var request = buildRequest(method, url, options);
  return fetch(request.url, request.options).then(_response2.default);
};

exports.default = performRequest;