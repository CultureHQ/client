"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeDelete = exports.makePatch = exports.makePost = exports.makeGet = void 0;

var _constants = require("./constants");

var _performRequest = _interopRequireDefault(require("./performRequest"));

var _state = _interopRequireDefault(require("./state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var makeRequest = function makeRequest(method) {
  return function (path) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return (0, _performRequest["default"])(method, new URL("".concat(_constants.API_HOST).concat(path)), {
      token: _state["default"].getToken(),
      simulation: _state["default"].getSimulationToken(),
      params: params
    });
  };
};

var makeGet = makeRequest("GET");
exports.makeGet = makeGet;
var makePost = makeRequest("POST");
exports.makePost = makePost;
var makePatch = makeRequest("PATCH");
exports.makePatch = makePatch;
var makeDelete = makeRequest("DELETE");
exports.makeDelete = makeDelete;