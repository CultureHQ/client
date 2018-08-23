"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _calls = require("./calls");

var _calls2 = _interopRequireDefault(_calls);

var _constants = require("./constants");

var _request = require("./request");

var _request2 = _interopRequireDefault(_request);

var _state = require("./state");

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prepare = function prepare(expected, actual, template) {
  var params = (typeof actual === "undefined" ? "undefined" : _typeof(actual)) !== "object" ? {} : actual;
  var path = template;

  expected.forEach(function (param) {
    if (!(param in params)) {
      throw new Error("Expected parameter " + param + " not given");
    }
  });

  Object.keys(params).forEach(function (param) {
    var needle = ":" + param;

    if (path.indexOf(needle) !== -1) {
      path = path.replace(needle, params[param]);
      delete params[param];
    }
  });

  return { path: path, params: params };
};

var buildCall = function buildCall(_ref) {
  var _ref2 = _slicedToArray(_ref, 4),
      method = _ref2[0],
      template = _ref2[1],
      _ref2$ = _ref2[2],
      expected = _ref2$ === undefined ? [] : _ref2$,
      _ref2$2 = _ref2[3],
      optional = _ref2$2 === undefined ? [] : _ref2$2;

  var call = function call(actual) {
    var _prepare = prepare(expected, actual, template),
        path = _prepare.path,
        params = _prepare.params;

    return (0, _request2.default)(method, new URL("" + _constants.API_HOST + path), {
      token: _state2.default.getToken(),
      simulation: _state2.default.getSimulationToken(),
      params: params
    });
  };

  return Object.assign(call, {
    method: method,
    path: template,
    expectedParams: expected,
    optionalParams: optional
  });
};

var apiCalls = Object.keys(_calls2.default).reduce(function (accum, callName) {
  return _extends({}, accum, _defineProperty({}, callName, buildCall(_calls2.default[callName])));
}, {});

exports.default = apiCalls;