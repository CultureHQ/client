import apiCalls from "./apiCalls";
import { disconnect } from "./cable";
import state from "./state";

/**
 * If you're listed as a CultureHQ admin, you can simulate users for debugging
 * with read-only capabilities by using the `startUserSimulation` named export.
 * The corresponding end call is `endUserSimulation`, along with the check for
 * the current state which is `isSimulating`.
 */
export const { isSimulating } = state;

export const endUserSimulation = () => {
  state.clearSimulationToken();
  disconnect();
};

export const startUserSimulation = params => {
  if (!state.isSignedIn()) {
    throw new Error("Cannot simulate unless you're already logged in.");
  }

  return apiCalls.createSimulation(params).then(response => {
    state.setSimulationToken(response.apiKey.token);
    disconnect();
    return response;
  });
};
