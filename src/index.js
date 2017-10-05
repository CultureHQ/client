import state from "./state";
import caller from "./caller";
import apiCall from "./api-call";

const signInCallOptions = {
  method: "post",
  path: "/api_keys",
  expectedParams: ["email", "password"]
};

const CultureHQ = caller({
  isSignedIn: () => {
    return state.isSignedIn();
  },

  signIn: params =>
    apiCall(signInCallOptions)(params).then(response => {
      state.signIn(response.apiKey.token);
      return response;
    }),

  signOut: () => {
    state.signOut();
  }
});

export default CultureHQ;
