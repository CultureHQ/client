import fetch from "node-fetch";
import camelize from "./camelize";

let apiHost;

if (process.env.NODE_ENV === "prod") {
  apiHost = "https://api.culturehq.net";
} else {
  apiHost = "http://localhost:3000";
}

const sendRequest = (method, path, options, callback) => {
  let reqOptions = {
    headers: { "Content-Type": "application/json" }
  };

  if (options.token) {
    reqOptions.headers["Authorization"] = `token ${options.token}`;
  }

  if (method !== "GET") {
    reqOptions.method = method;
    reqOptions.body = JSON.stringify(options.params);
  }

  fetch(`${apiHost}${path}`, reqOptions)
    .then(response => {
      if (response.status / 100 === 2) {
        response.json().then(json => callback(null, camelize(json)));
      } else {
        callback(response.status, response.statusText);
      }
    })
    .catch(error => {
      callback(error, null);
    });
};

export default {
  get: (path, options, callback) => sendRequest("GET", path, options, callback),

  patch: (path, options, callback) =>
    sendRequest("PATCH", path, options, callback),

  post: (path, options, callback) =>
    sendRequest("POST", path, options, callback)
};
