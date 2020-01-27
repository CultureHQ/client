import performRequest from "./performRequest";
import state from "./state";

const makeRequest = ({ apiHost }, verb, path, params) => (
  performRequest(verb, new URL(`${apiHost}${path}`), {
    token: state.getToken(),
    simulation: state.getSimulationToken(),
    params
  })
);

const performPaginatedGet = (entity, onGetPage) => onGetPage(1).then(initial => {
  const { totalPages } = initial.pagination;
  if (totalPages <= 1) {
    return initial;
  }

  const promises = [];
  for (let page = 2; page <= totalPages; page += 1) {
    promises.push(onGetPage(page));
  }

  return Promise.all(promises).then(responses => responses.reduce(
    (accum, response) => ({
      ...response,
      [entity]: accum[entity].concat(response[entity])
    }),
    initial
  ));
});

const makeClient = options => ({
  ...options,
  makeGet(path, params = {}) {
    return makeRequest(options, "GET", path, params);
  },
  makePost(path, params = {}) {
    return makeRequest(options, "POST", path, params);
  },
  makePatch(path, params = {}) {
    return makeRequest(options, "PATCH", path, params);
  },
  makeDelete(path, params = {}) {
    return makeRequest(options, "DELETE", path, params);
  },
  makePaginatedGet(entity, path, params = {}) {
    return performPaginatedGet(entity, page => (
      makeRequest(options, path, { ...params, page })
    ));
  }
});

export default makeClient;
