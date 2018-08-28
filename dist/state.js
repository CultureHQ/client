"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var TOKEN_KEY = "token";
var SIMULATION_KEY = "simulation";
var state = {
  clear: function clear() {
    return localStorage.clear();
  },
  clearSimulationToken: function clearSimulationToken() {
    state.setToken(localStorage.getItem(SIMULATION_KEY));
    localStorage.removeItem(SIMULATION_KEY);
  },
  getSimulationToken: function getSimulationToken() {
    return localStorage.getItem(SIMULATION_KEY);
  },
  getToken: function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
  isSignedIn: function isSignedIn() {
    return state.getToken() !== null;
  },
  isSimulating: function isSimulating() {
    return localStorage.getItem(SIMULATION_KEY) !== null;
  },
  setSimulationToken: function setSimulationToken(token) {
    localStorage.setItem(SIMULATION_KEY, state.getToken());
    state.setToken(token);
  },
  setToken: function setToken(token) {
    return localStorage.setItem(TOKEN_KEY, token);
  }
};
var _default = state;
exports.default = _default;