import "isomorphic-fetch";
import { camelize, snakerize } from "./string-case";

const buildHeaders = options => {
  let headers = { "X-Client-Version": CLIENT_VERSION };

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
    Object.keys(params).forEach(key => {
      if (!Array.isArray(params[key])) {
        url.searchParams.append(key, params[key]);
      } else if (params[key].length) {
        params[key].forEach(nestedValue =>
          url.searchParams.append(key + "[]", nestedValue)
        );
      }
    });
  } else if (options.multipart) {
    const formData = new FormData();

    Object.keys(params).forEach(key => {
      if (!Array.isArray(params[key])) {
        formData.append(key, params[key]);
      } else if (params[key].length) {
        params[key].forEach(nestedValue =>
          formData.append(`${key}[]`, nestedValue)
        );
      } else {
        formData.append(`${key}[]`, "");
      }
    });

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
        const success = Math.round(response.status / 200) === 1;

        if (response.status === 204) {
          resolve(null);
        } else if (response.headers.get("content-type") === "text/html") {
          if (success) {
            response
              .text()
              .then(text => resolve({ response, text }))
              .catch(error => reject(error));
          } else {
            reject({ response, error: response.statusText });
          }
        } else {
          response
            .json()
            .then(json => {
              const fullResponse = Object.assign({ response }, camelize(json));
              success ? resolve(fullResponse) : reject(fullResponse);
            })
            .catch(error => reject(error));
        }
      })
      .catch(error => reject(error));
  });
};
