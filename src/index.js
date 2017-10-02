import state from "./state";

const CultureHQ = {
  isSignedIn: () => {
    return state.isSignedIn();
  },

  signOut: () => {
    state.signOut();
  }
};

import commentCalls from "./calls/comment";
commentCalls(CultureHQ);

import departmentCalls from "./calls/department";
departmentCalls(CultureHQ);

import eventCalls from "./calls/event";
eventCalls(CultureHQ);

import inviteCalls from "./calls/invite";
inviteCalls(CultureHQ);

import organizationCalls from "./calls/organization";
organizationCalls(CultureHQ);

import passwordCalls from "./calls/password";
passwordCalls(CultureHQ);

import userCalls from "./calls/user";
userCalls(CultureHQ);

if (window) {
  window.CultureHQ = CultureHQ;
}

export default CultureHQ;
