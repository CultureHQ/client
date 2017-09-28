import state from "./state";

const CultureHQ = {
  isSignedIn: () => {
    return state.isSignedIn();
  },

  signOut: () => {
    state.signOut();
  }
};

import eventCalls from "./calls/event";
eventCalls(CultureHQ);

import organizationCalls from "./calls/organization";
organizationCalls(CultureHQ);

import userCalls from "./calls/user";
userCalls(CultureHQ);

if (window) {
  window.CultureHQ = CultureHQ;
}

export default CultureHQ;
