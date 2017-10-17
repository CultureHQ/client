import state from "./state";
import calls from "./calls";
import apiCall from "./api-call";

class CultureHQ {
  constructor(options = {}) {
    this.apiHost = options.apiHost;
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

Object.keys(calls).forEach(callName => {
  const builtApiCall = apiCall(calls[callName]);

  CultureHQ.prototype[callName] = function(params) {
    return builtApiCall(this, params);
  };

  Object.assign(CultureHQ.prototype[callName], calls[callName]);
});

export default CultureHQ;
