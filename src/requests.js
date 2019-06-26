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

export const makePaginatedGet = (entity, path, params = {}) => {
  const onFetch = page => makeGet(path, { ...params, page });

  return onFetch(1).then(initial => {
    const { totalPages } = initial.pagination;
    if (totalPages <= 1) {
      return initial;
    }

    const promises = [];
    for (let page = 2; page <= totalPages; page += 1) {
      promises.push(onFetch(page));
    }

    return Promise.all(promises).then(responses => responses.reduce(
      (accum, response) => ({
        ...response,
        [entity]: [...accum[entity], response[entity]]
      }),
      initial
    ));
  });
};
