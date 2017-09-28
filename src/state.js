import store from "store/dist/store.modern";

const state = {
  getToken: () => store.get(state.storeKey),

  isSignedIn: () => {
    return state.getToken() !== undefined;
  },

  signIn: token => {
    store.set(state.storeKey, token);
  },

  signOut: () => {
    store.clearAll();
  },

  storeKey: "token"
};

export default state;
