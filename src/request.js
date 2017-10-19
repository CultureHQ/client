import "isomorphic-fetch";
import { camelize, snakerize } from "./string-case";

const buildHeaders = options => {
  let headers = {};

  if (!options.multipart) {
    headers["Content-Type"] = "application/json";
  }
  if (typeof options.token === "string" && options.token.length) {
    headers["Authorization"] = `token ${options.token}`;
  }

  return headers;
};

const buildRequest = (method, url, options) => {
  let reqOptions = { headers: buildHeaders(options), method };
  const params = snakerize(options.params);

  if (method === "GET") {
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );
  } else if (options.multipart) {
    const formData = new FormData();
    Object.keys(params).forEach(key => formData.append(key, params[key]));
    reqOptions.body = formData;
  } else {
    reqOptions.body = JSON.stringify(params);
  }

  return { url: url.href, options: reqOptions };
};

export default (method, url, options) => {
  const request = buildRequest(method, url, options);

  return new Promise((resolve, reject) => {
    fetch(request.url, request.options)
      .then(response => {
        if (Math.round(response.status / 200) !== 1) {
          reject(response.statusText);
        } else if (method === "DELETE") {
          resolve({});
        } else {
          response
            .json()
            .then(json => resolve(camelize(json)))
            .catch(error => reject(error));
        }
      })
      .catch(error => reject(error));
  });
};
