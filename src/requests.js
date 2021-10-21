import config from "./config";
import performFormRequest from "./performFormRequest";
import performRequest from "./performRequest";
import state from "./state";

const makeRequest = method => (path, params = {}) => (
  performRequest(method, new URL(`${config.apiHost}${path}`), {
    token: state.getToken(),
    simulation: state.getSimulationToken(),
    params
  })
);

const makeFormRequest = method => (path, body) => (
  performFormRequest(method, new URL(`${config.apiHost}${path}`), {
    token: state.getToken(),
    simulation: state.getSimulationToken(),
    body
  })
);

const makeLinkedinRequest = method => (url, linkedinToken, params = {}) => (
  performRequest(method, new URL(url), {
    linkedinToken,
    params
  })
);

export const makeGet = makeRequest("GET");
export const makePost = makeRequest("POST");
export const makePatch = makeRequest("PATCH");
export const makeDelete = makeRequest("DELETE");

export const makeFormPost = makeFormRequest("POST");
export const makeFormPatch = makeFormRequest("PATCH");

export const makeLinkedinGet = makeLinkedinRequest("GET");
export const makeLinkedinPost = makeLinkedinRequest("POST");
export const makeLinkedinPatch = makeLinkedinRequest("PATCH");
export const makeLinkedinDelete = makeLinkedinRequest("DELETE");

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
        [entity]: accum[entity].concat(response[entity])
      }),
      initial
    ));
  });
};
