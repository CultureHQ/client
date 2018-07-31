import { API_HOST } from "./constants";
import request from "./request";
import state from "./state";

const prepare = (expected, actual, template) => {
  const params = typeof actual !== "object" ? {} : actual;
  let path = template;

  expected.forEach(param => {
    if (!(param in params)) {
      throw new Error(`Expected parameter ${param} not given`);
    }
  });

  Object.keys(params).forEach(param => {
    const needle = `:${param}`;

    if (path.indexOf(needle) !== -1) {
      path = path.replace(needle, params[param]);
      delete params[param];
    }
  });

  return { path, params };
};

const apiCall = ([method, template, expected = [], optional = [], multipart = false]) => {
  const call = actualParams => {
    const { path, params } = prepare(expectedParams, actualParams, template);

    return request(method, new URL(`${API_HOST}${path}`), {
      token: state.getToken(),
      simulation: state.getSimulation(),
      params,
      multipart
    });
  };

  return Object.assign(call, {
    method,
    path: template,
    expectedParams: expected,
    optionalParams: optional,
    multipart
  });
};

export default apiCall;
