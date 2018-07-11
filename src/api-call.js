import request from "./request";
import state from "./state";

const { hasOwnProperty } = Object.prototype;

const ensureExpectedParams = (expectedParams, actualParams) => {
  expectedParams.forEach(param => {
    if (!hasOwnProperty.call(actualParams, param)) {
      throw new Error(`Expected parameter ${param} not given`);
    }
  });
};

const substitutePath = (path, params) => {
  let substitutedPath = path;

  Object.keys(params).forEach(param => {
    const needle = `:${param}`;

    if (substitutedPath.indexOf(needle) !== -1) {
      substitutedPath = substitutedPath.replace(needle, params[param]);

      /* eslint-disable-next-line no-param-reassign */
      delete params[param];
    }
  });

  return substitutedPath;
};

export default (client, options) => {
  const [
    method,
    path,
    expectedParams = [],
    optionalParams = [],
    multipart = false
  ] = options;

  const apiCall = actualParams => {
    const normalizedParams = typeof actualParams !== "object" ? {} : actualParams;

    ensureExpectedParams(expectedParams, normalizedParams);
    const callPath = substitutePath(path, normalizedParams);

    return request(method, new URL(`${client.apiHost}${callPath}`), {
      token: state.getToken(),
      simulation: state.getSimulationToken(),
      params: normalizedParams,
      multipart
    });
  };

  return Object.assign(apiCall, {
    method, path, expectedParams, optionalParams, multipart
  });
};
