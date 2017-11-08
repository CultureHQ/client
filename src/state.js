import store from "store/dist/store.modern";

const tokenKey = "token";
const simulationKey = "simulation";

const state = {
  endSimulation: () => {
    state.signIn(store.get(simulationKey));
    store.remove(simulationKey);
  },

  getToken: () => store.get(tokenKey),

  isSignedIn: () => {
    return state.getToken() !== undefined;
  },

  isSimulating: () => {
    return store.get(simulationKey) !== undefined;
  },

  signIn: token => {
    store.set(tokenKey, token);
  },

  signOut: () => {
    store.clearAll();
  },

  startSimulation: token => {
    if (!state.isSignedIn()) {
      throw new Error("Cannot simulate unless you're already logged in.");
    }

    store.set(simulationKey, state.getToken());
    state.signIn(token);
  }
};

export default state;
