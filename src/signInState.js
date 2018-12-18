import apiCalls from "./apiCalls";
import { disconnect } from "./cable";
import state from "./state";

const { createApiKey, deleteSession } = apiCalls;

/**
 * Signed in state is handled through the client using the `signIn` and
 * `signOut` functions. These effectively act as normal API calls but with the
 * additional functionality of setting or clearing `localStorage` with the
 * returned API token.
 *
 * You can also manually set the API token by using the `setToken` named export.
 * This is especially useful if the token is fixed in some context (as in most
 * integrations).
 */

export const { getToken, isSignedIn, setToken } = state;

export const signIn = params => createApiKey(params).then(response => {
  state.setToken(response.apiKey.token);
  return response;
});

export const signOut = () => deleteSession().then(response => {
  state.clear();
  disconnect();
  return response;
});
