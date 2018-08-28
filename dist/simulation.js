"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startUserSimulation = exports.endUserSimulation = exports.isSimulating = void 0;

var _apiCalls = _interopRequireDefault(require("./api-calls"));

var _cable = require("./cable");

var _state = _interopRequireDefault(require("./state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * If you're listed as a CultureHQ admin, you can simulate users for debugging
 * with read-only capabilities by using the `startUserSimulation` named export.
 * The corresponding end call is `endUserSimulation`, along with the check for
 * the current state which is `isSimulating`.
 */
var isSimulating = _state.default.isSimulating;
exports.isSimulating = isSimulating;

var endUserSimulation = function endUserSimulation() {
  _state.default.clearSimulationToken();

  (0, _cable.disconnect)();
};

exports.endUserSimulation = endUserSimulation;

var startUserSimulation = function startUserSimulation(params) {
  if (!_state.default.isSignedIn()) {
    throw new Error("Cannot simulate unless you're already logged in.");
  }

  return _apiCalls.default.createSimulation(params).then(function (response) {
    _state.default.setSimulationToken(response.apiKey.token);

    (0, _cable.disconnect)();
    return response;
  });
};

exports.startUserSimulation = startUserSimulation;