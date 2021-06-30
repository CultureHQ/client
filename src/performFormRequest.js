import fetcher from "./fetcher";
import processResponse from "./processResponse";
import { snakerize } from "./stringCase";

const buildHeaders = ({ token, simulation }) => {
  const headers = {};

  if (typeof token === "string" && token.length) {
    headers.Authorization = `token ${token}`;
  }

  if (typeof simulation === "string" && simulation.length) {
    headers["X-Client-Simulation"] = simulation;
  }

  return headers;
};

const buildRequest = (method, url, options) => {
  const reqOptions = { headers: buildHeaders(options), method };
  const body = snakerize(options.body);
  reqOptions.body = body;

  return { url: url.href, options: reqOptions };
};

const performFormRequest = (method, url, options) => {
  const request = buildRequest(method, url, options);
  return (fetcher.fetch || window.fetch)(request.url, request.options).then(processResponse);
};

export default performFormRequest;
