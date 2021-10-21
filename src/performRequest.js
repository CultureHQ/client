import fetcher from "./fetcher";
import processResponse from "./processResponse";
import { snakerize } from "./stringCase";

const buildHeaders = ({ token, simulation, linkedinToken }) => {
  const headers = { "Content-Type": "application/json" };

  if (typeof token === "string" && token.length) {
    headers.Authorization = `token ${token}`;
  }

  if (typeof simulation === "string" && simulation.length) {
    headers["X-Client-Simulation"] = simulation;
  }

  if (linkedinToken) {
    headers["X-Restli-Protocol-Version"] = "2.0.0";
    headers.Authorization = `Bearer ${linkedinToken}`;
  }

  return headers;
};

const attachGetParams = (url, params) => {
  Object.keys(params).forEach(key => {
    if (params[key] === undefined || params[key] === null) {
      return;
    }

    if (!Array.isArray(params[key])) {
      url.searchParams.append(key, params[key]);
    } else if (params[key].length) {
      params[key].forEach(nestedValue => (
        url.searchParams.append(`${key}[]`, nestedValue)
      ));
    }
  });
};

const buildRequest = (method, url, options) => {
  const reqOptions = { headers: buildHeaders(options), method };
  const params = snakerize(options.params);

  if (method === "GET") {
    attachGetParams(url, params);
  } else {
    reqOptions.body = JSON.stringify(params);
  }

  return { url: url.href, options: reqOptions };
};

const performRequest = (method, url, options) => {
  const request = buildRequest(method, url, options);
  return (fetcher.fetch || window.fetch)(request.url, request.options).then(processResponse);
};

export default performRequest;
