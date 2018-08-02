"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TOKEN_KEY = "token";
var SIMULATION_KEY = "simulation";

var state = {
  endSimulation: function endSimulation() {
    state.signIn(localStorage.getItem(SIMULATION_KEY));
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

  signIn: function signIn(token) {
    return localStorage.setItem(TOKEN_KEY, token);
  },

  signOut: function signOut() {
    return localStorage.clear();
  },

  startSimulation: function startSimulation(token) {
    if (!state.isSignedIn()) {
      throw new Error("Cannot simulate unless you're already logged in.");
    }

    localStorage.setItem(SIMULATION_KEY, state.getToken());
    state.signIn(token);
  }
};

exports.default = state;