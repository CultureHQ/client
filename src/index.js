import state from "./state";
import calls from "./calls";
import apiCall from "./api-call";

class CultureHQ {
  constructor(options = {}) {
    this.apiHost = options.apiHost;

    Object.keys(calls).forEach(callName => {
      this[callName] = apiCall(this, calls[callName]);
    });
  }

  isSignedIn() {
    return state.isSignedIn();
  }

  signIn(params) {
    return this.createApiKey(params).then(response => {
      state.signIn(response.apiKey.token);
      return response;
    });
  }

  signOut() {
    state.signOut();
  }
}

export default CultureHQ;
