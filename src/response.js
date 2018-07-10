import { camelize } from "./string-case";

const processJSONResponse = response => json => new Promise((resolve, reject) => {
  const { status } = response;
  const decorated = { ...camelize(json), response, status };

  return Math.round(status / 100) === 2 ? resolve(decorated) : reject(decorated);
});

const processTextResponse = response => text => new Promise((resolve, reject) => {
  const { status, statusText } = response;

  if (Math.round(status / 100) === 2) {
    resolve({ text, response, status });
  } else {
    reject({ error: statusText, response, status });
  }
});

const processResponse = response => {
  const { status } = response;

  if (status === 204) {
    return null;
  } else if (response.headers.get("content-type") === "text/html") {
    return response.text().then(processTextResponse(response));
  } else {
    return response.json().then(processJSONResponse(response));
  }
};

export default processResponse;
