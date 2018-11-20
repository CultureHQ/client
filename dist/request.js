"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fetcher = _interopRequireDefault(require("./fetcher"));

var _response = _interopRequireDefault(require("./response"));

var _stringCase = require("./string-case");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildHeaders = function buildHeaders(_ref) {
  var token = _ref.token,
      simulation = _ref.simulation;
  var headers = {
    "X-Client-Version": "6.7.0",
    "Content-Type": "application/json"
  };

  if (typeof token === "string" && token.length) {
    headers.Authorization = "token ".concat(token);
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
        return url.searchParams.append("".concat(key, "[]"), nestedValue);
      });
    }
  });
};

var buildRequest = function buildRequest(method, url, options) {
  var reqOptions = {
    headers: buildHeaders(options),
    method: method
  };
  var params = (0, _stringCase.snakerize)(options.params);

  if (method === "GET") {
    attachGetParams(url, params);
  } else {
    reqOptions.body = JSON.stringify(params);
  }

  return {
    url: url.href,
    options: reqOptions
  };
};

var performRequest = function performRequest(method, url, options) {
  var request = buildRequest(method, url, options);
  return (_fetcher.default.fetch || window.fetch)(request.url, request.options).then(_response.default);
};

var _default = performRequest;
exports.default = _default;