import "isomorphic-fetch";

import { camelize, snakerize } from "./string-case";
import formData from "./form-data";

const buildHeaders = ({ multipart, token, simulation }) => {
  let headers = { "X-Client-Version": CLIENT_VERSION };

  if (!multipart) {
    headers["Content-Type"] = "application/json";
  }
  if (typeof token === "string" && token.length) {
    headers["Authorization"] = `token ${token}`;
  }
  if (typeof simulation === "string" && simulation.length) {
    headers["X-Client-Simulation"] = simulation;
  }

  return headers;
};

const buildRequest = (method, url, options) => {
  let reqOptions = { headers: buildHeaders(options), method };
  const params = snakerize(options.params);

  if (method === "GET") {
    Object.keys(params).forEach(key => {
      if (params[key] === undefined || params[key] === null) {
        return;
      }

      if (!Array.isArray(params[key])) {
        url.searchParams.append(key, params[key]);
      } else if (params[key].length) {
        params[key].forEach(nestedValue =>
          url.searchParams.append(key + "[]", nestedValue)
        );
      }
    });
  } else if (options.multipart) {
    reqOptions.body = formData(params);
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
        const { status } = response;
        const success = Math.round(status / 200) === 1;

        options.client.recordResponse(request, response).then(() => {
          if (status === 204) {
            resolve(null);
          } else if (response.headers.get("content-type") === "text/html") {
            if (success) {
              response
                .text()
                .then(text => resolve({ response, text }))
                .catch(error => reject(error));
            } else {
              reject({ response, error: response.statusText, status, url });
            }
          } else {
            response
              .json()
              .then(json => {
                const fullResponse = Object.assign(
                  { response },
                  camelize(json)
                );
                success ? resolve(fullResponse) : reject(fullResponse);
              })
              .catch(error => reject(error));
          }
        });
      })
      .catch(error => {
        reject(error);
      });
  });
};
