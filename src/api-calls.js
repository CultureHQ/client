import calls from "./calls";
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

const buildCall = ([method, template, expected = [], optional = [], multipart = false]) => {
  const call = actual => {
    const { path, params } = prepare(expected, actual, template);

    return request(method, new URL(`${API_HOST}${path}`), {
      token: state.getToken(),
      simulation: state.getSimulationToken(),
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

const API_CALLS = Object.keys(calls).reduce((accum, callName) => ({
  ...accum,
  [callName]: buildCall(calls[callName])
}), {});

export default API_CALLS;
