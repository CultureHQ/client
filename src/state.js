const TOKEN_KEY = "token";
const SIMULATION_KEY = "simulation";

const state = {
  clear: () => localStorage.clear(),

  clearSimulationToken: () => {
    state.setToken(localStorage.getItem(SIMULATION_KEY));
    localStorage.removeItem(SIMULATION_KEY);
  },

  getSimulationToken: () => localStorage.getItem(SIMULATION_KEY),

  getToken: () => localStorage.getItem(TOKEN_KEY),

  isSignedIn: () => state.getToken() !== null,

  isSimulating: () => localStorage.getItem(SIMULATION_KEY) !== null,

  setSimulationToken: token => {
    localStorage.setItem(SIMULATION_KEY, state.getToken());
    state.setToken(token);
  },

  setToken: token => localStorage.setItem(TOKEN_KEY, token),
};

export default state;
