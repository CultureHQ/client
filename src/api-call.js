import "url-polyfill";
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
  options.expectedParams = options.expectedParams || [];

  const apiCall = actualParams => {
    if (typeof actualParams !== "object") {
      actualParams = {};
    }

    ensureExpectedParams(options.expectedParams, actualParams);
    const callPath = substitutePath(options.path, actualParams);

    return request(options.method, new URL(`${client.apiHost}${callPath}`), {
      token: state.getToken(),
      simulation: state.getSimulationToken(),
      params: actualParams,
      multipart: options.multipart || false
    });
  };

  return Object.assign(apiCall, options);
};
