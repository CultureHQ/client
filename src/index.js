import ActionCable from "actioncable";

import state from "./state";
import calls from "./calls";
import apiCall from "./api-call";
import { camelize } from "./string-case";

const signInCallback = response => {
  state.signIn(response.apiKey.token);
  return response;
};

class CultureHQ {
  constructor(options = {}) {
    this.apiHost = options.apiHost;

    Object.keys(calls).forEach(callName => {
      this[callName] = apiCall(this, calls[callName]);
    });

    this.onProfileUpdated = callback => {
      const [protocol, host] = this.apiHost.split("://");
      const wsProtocol = protocol === "https" ? "wss" : "ws";

      const endpoint = `${wsProtocol}://${host}/cable/${state.getToken()}`;
      const consumer = ActionCable.createConsumer(endpoint);

      consumer.subscriptions.create("ProfileChannel", {
        received: profile => callback(camelize(profile))
      });
    };
  }

  endUserSimulation() {
    state.endSimulation();
  }

  isSignedIn() {
    return state.isSignedIn();
  }

  isSimulating() {
    return state.isSimulating();
  }

  setToken(token) {
    state.signIn(token);
  }

  signIn(params) {
    return this.createApiKey(params).then(signInCallback);
  }

  signOut() {
    state.signOut();
  }

  startUserSimulation(params) {
    return this.createSimulation(params).then(response => {
      state.startSimulation(response.apiKey.token);
      return response;
    });
  }
}

export default CultureHQ;
