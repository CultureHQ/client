import request from "./request";
import state from "./state";

const ensureExpectedParams = (expectedParams, actualParams) => {
  expectedParams.forEach(param => {
    if (!actualParams.hasOwnProperty(param)) {
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
    if (typeof actualParams !== "object") {
      actualParams = {};
    }

    ensureExpectedParams(expectedParams, actualParams);
    const callPath = substitutePath(path, actualParams);

    return request(method, new URL(`${client.apiHost}${callPath}`), {
      token: state.getToken(),
      simulation: state.getSimulationToken(),
      params: actualParams,
      multipart
    });
  };

  return Object.assign(apiCall, {
    method, path, expectedParams, optionalParams, multipart
  });
};
