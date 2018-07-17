"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

require("url-polyfill");

var _request = require("./request");

var _request2 = _interopRequireDefault(_request);

var _state = require("./state");

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasOwnProperty = Object.prototype.hasOwnProperty;


var ensureExpectedParams = function ensureExpectedParams(expectedParams, actualParams) {
  expectedParams.forEach(function (param) {
    if (!hasOwnProperty.call(actualParams, param)) {
      throw new Error("Expected parameter " + param + " not given");
    }
  });
};

var substitutePath = function substitutePath(path, params) {
  var substitutedPath = path;

  Object.keys(params).forEach(function (param) {
    var needle = ":" + param;

    if (substitutedPath.indexOf(needle) !== -1) {
      substitutedPath = substitutedPath.replace(needle, params[param]);

      /* eslint-disable-next-line no-param-reassign */
      delete params[param];
    }
  });

  return substitutedPath;
};

exports.default = function (client, options) {
  var _options = _slicedToArray(options, 5),
      method = _options[0],
      path = _options[1],
      _options$ = _options[2],
      expectedParams = _options$ === undefined ? [] : _options$,
      _options$2 = _options[3],
      optionalParams = _options$2 === undefined ? [] : _options$2,
      _options$3 = _options[4],
      multipart = _options$3 === undefined ? false : _options$3;

  var apiCall = function apiCall(actualParams) {
    var normalizedParams = (typeof actualParams === "undefined" ? "undefined" : _typeof(actualParams)) !== "object" ? {} : actualParams;

    ensureExpectedParams(expectedParams, normalizedParams);
    var callPath = substitutePath(path, normalizedParams);

    return (0, _request2.default)(method, new URL("" + client.apiHost + callPath), {
      token: _state2.default.getToken(),
      simulation: _state2.default.getSimulationToken(),
      params: normalizedParams,
      multipart: multipart
    });
  };

  return Object.assign(apiCall, {
    method: method, path: path, expectedParams: expectedParams, optionalParams: optionalParams, multipart: multipart
  });
};