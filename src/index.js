import state from "./state";
import calls from "./calls";
import apiCall from "./api-call";

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
