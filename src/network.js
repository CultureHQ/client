import "isomorphic-fetch";
import { camelize, snakerize } from "./string-case";

let apiHost;

if (process.env.NODE_ENV === "production") {
  apiHost = "https://api.culturehq.net";
} else {
  apiHost = "http://localhost:3000";
}

const buildRequest = (method, path, options) => {
  let url = new URL(`${apiHost}${path}`);
  let reqOptions = {
    headers: { "Content-Type": "application/json" }
  };

  if (typeof options.token === "string" && options.token.length) {
    reqOptions.headers["Authorization"] = `token ${options.token}`;
  }

  if (method === "GET") {
    const params = snakerize(options.params);
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );
  } else {
    reqOptions.method = method;
    reqOptions.body = JSON.stringify(snakerize(options.params));
  }

  return { url: url.href, options: reqOptions };
};

const sendRequest = (method, path, options) => {
  const request = buildRequest(method, path, options);

  return new Promise((resolve, reject) => {
    fetch(request.url, request.options)
      .then(response => {
        if (Math.round(response.status / 200) === 1) {
          response
            .json()
            .then(json => resolve(camelize(json)))
            .catch(error => reject(error));
        } else {
          reject(response.statusText);
        }
      })
      .catch(error => reject(error));
  });
};

export default {
  delete: (path, options) => sendRequest("DELETE", path, options),
  get: (path, options) => sendRequest("GET", path, options),
  patch: (path, options) => sendRequest("PATCH", path, options),
  post: (path, options) => sendRequest("POST", path, options)
};
