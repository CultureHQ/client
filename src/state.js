const TOKEN_KEY = "token";
const SIMULATION_KEY = "simulation";

const state = {
  endSimulation: () => {
    state.signIn(localStorage.getItem(SIMULATION_KEY));
    localStorage.removeItem(SIMULATION_KEY);
  },

  getSimulationToken: () => localStorage.getItem(SIMULATION_KEY),

  getToken: () => localStorage.getItem(TOKEN_KEY),

  isSignedIn: () => state.getToken() !== null,

  isSimulating: () => localStorage.getItem(SIMULATION_KEY) !== null,

  signIn: token => localStorage.setItem(TOKEN_KEY, token),

  signOut: () => localStorage.clear(),

  startSimulation: token => {
    if (!state.isSignedIn()) {
      throw new Error("Cannot simulate unless you're already logged in.");
    }

    localStorage.setItem(SIMULATION_KEY, state.getToken());
    state.signIn(token);
  }
};

export default state;
