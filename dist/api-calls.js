"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _calls = _interopRequireDefault(require("./calls"));

var _constants = require("./constants");

var _request = _interopRequireDefault(require("./request"));

var _state = _interopRequireDefault(require("./state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var prepare = function prepare(expected, actual, template) {
  var params = _typeof(actual) !== "object" ? {} : _objectSpread({}, actual);
  var path = template;
  expected.forEach(function (param) {
    if (!(param in params)) {
      throw new Error("Expected parameter ".concat(param, " not given"));
    }
  });
  Object.keys(params).forEach(function (param) {
    var needle = ":".concat(param);

    if (path.indexOf(needle) !== -1) {
      path = path.replace(needle, params[param]);
      delete params[param];
    }
  });
  return {
    path: path,
    params: params
  };
};

var buildCall = function buildCall(_ref) {
  var _ref2 = _slicedToArray(_ref, 4),
      method = _ref2[0],
      template = _ref2[1],
      _ref2$ = _ref2[2],
      expected = _ref2$ === void 0 ? [] : _ref2$,
      _ref2$2 = _ref2[3],
      optional = _ref2$2 === void 0 ? [] : _ref2$2;

  var call = function call(actual) {
    var _prepare = prepare(expected, actual, template),
        path = _prepare.path,
        params = _prepare.params;

    return (0, _request.default)(method, new URL("".concat(_constants.API_HOST).concat(path)), {
      token: _state.default.getToken(),
      simulation: _state.default.getSimulationToken(),
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

var apiCalls = Object.keys(_calls.default).reduce(function (accum, callName) {
  return _objectSpread({}, accum, _defineProperty({}, callName, buildCall(_calls.default[callName])));
}, {});
var _default = apiCalls;
exports.default = _default;