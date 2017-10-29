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

  isSignedIn() {
    return state.isSignedIn();
  }

  signIn(params) {
    return this.createApiKey(params).then(signInCallback);
  }

  signInWithOkta(params) {
    return this.createOktaApiKey(params).then(signInCallback);
  }

  signOut() {
    state.signOut();
  }
}

export default CultureHQ;
