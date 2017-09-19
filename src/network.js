import fetch from "node-fetch";
import camelize from "./camelize";

let apiHost;

if (process.env.NODE_ENV === "prod") {
  apiHost = "https://api.culturehq.net";
} else {
  apiHost = "http://localhost:3000";
}

const sendRequest = (method, path, options) => {
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

  return new Promise((resolve, reject) => {
    fetch(`${apiHost}${path}`, reqOptions)
      .then(response => {
        if (response.status / 100 === 2) {
          response.json().then(json => resolve(camelize(json)))
                         .catch(error => reject(error));
        } else {
          reject(response.statusText);
        }
      })
      .catch(error => reject(error));
  });
};

export default {
  get: (path, options) => sendRequest("GET", path, options),
  patch: (path, options) => sendRequest("PATCH", path, options),
  post: (path, options) => sendRequest("POST", path, options)
};
