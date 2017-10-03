import network from "./network";
import state from "./state";

export default options => {
  const apiCall = actualParams => {
    if (typeof actualParams !== "object") {
      actualParams = {};
    }

    Object.keys(actualParams).forEach(param => {
      const needle = `:${param}`;
      if (options.path.indexOf(needle) !== -1) {
        options.path = options.path.replace(needle, actualParams[param]);
        delete actualParams[param];
      }
    });

    if (typeof options.expectedParams !== "undefined") {
      options.expectedParams.forEach(param => {
        if (!actualParams.hasOwnProperty(param)) {
          throw new Error(`Expected parameter ${param} not given`);
        }
      });
    }

    return network[options.method](options.path, {
      token: state.getToken(),
      params: actualParams
    });
  };

  Object.assign(apiCall, options);
  return apiCall;
};
