"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _store = require("store/dist/store.modern");

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tokenKey = "token";
var simulationKey = "simulation";

var state = {
  endSimulation: function endSimulation() {
    state.signIn(_store2.default.get(simulationKey));
    _store2.default.remove(simulationKey);
  },

  getSimulationToken: function getSimulationToken() {
    return _store2.default.get(simulationKey);
  },

  getToken: function getToken() {
    return _store2.default.get(tokenKey);
  },

  isSignedIn: function isSignedIn() {
    return state.getToken() !== undefined;
  },

  isSimulating: function isSimulating() {
    return _store2.default.get(simulationKey) !== undefined;
  },

  signIn: function signIn(token) {
    return _store2.default.set(tokenKey, token);
  },

  signOut: function signOut() {
    return _store2.default.clearAll();
  },

  startSimulation: function startSimulation(token) {
    if (!state.isSignedIn()) {
      throw new Error("Cannot simulate unless you're already logged in.");
    }

    _store2.default.set(simulationKey, state.getToken());
    state.signIn(token);
  }
};

exports.default = state;