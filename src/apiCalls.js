import calls from "./calls.json";
import config from "./config";
import performRequest from "./performRequest";
import state from "./state";

const prepare = (expected, actual, template) => {
  const params = typeof actual !== "object" ? {} : { ...actual };
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

const buildCall = ([method, template, expected = [], optional = []]) => {
  const call = actual => {
    const { path, params } = prepare(expected, actual, template);

    return performRequest(method, new URL(`${config.apiHost}${path}`), {
      token: state.getToken(),
      simulation: state.getSimulationToken(),
      params
    });
  };

  return Object.assign(call, {
    method,
    path: template,
    expectedParams: expected,
    optionalParams: optional
  });
};

const apiCalls = Object.keys(calls).reduce((accum, callName) => ({
  ...accum,
  [callName]: buildCall(calls[callName])
}), {});

export default apiCalls;
