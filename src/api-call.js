import request from "./request";
import state from "./state";

export default options => {
  const apiCall = (client, actualParams) => {
    if (typeof actualParams !== "object") {
      actualParams = {};
    }

    let callPath = options.path;
    Object.keys(actualParams).forEach(param => {
      const needle = `:${param}`;
      if (callPath.indexOf(needle) !== -1) {
        callPath = callPath.replace(needle, actualParams[param]);
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

    return request(options.method, new URL(`${client.apiHost}${callPath}`), {
      token: state.getToken(),
      params: actualParams,
      multipart: options.multipart || false
    });
  };

  apiCall.options = options;
  return apiCall;
};
