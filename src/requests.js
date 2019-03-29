import { API_HOST } from "./constants";
import performRequest from "./performRequest";
import state from "./state";

const makeRequest = method => (path, params = {}) => (
  performRequest(method, new URL(`${API_HOST}${path}`), {
    token: state.getToken(),
    simulation: state.getSimulationToken(),
    params
  })
);

export const makeGet = makeRequest("GET");
export const makePost = makeRequest("POST");
export const makePatch = makeRequest("PATCH");
export const makeDelete = makeRequest("DELETE");
