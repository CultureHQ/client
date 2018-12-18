import { camelize } from "./stringCase";

const jsonResponse = response => json => new Promise((resolve, reject) => {
  const { status } = response;
  const callback = Math.round(status / 100) === 2 ? resolve : reject;

  callback({ ...camelize(json), response, status });
});

const textResponse = response => text => new Promise((resolve, reject) => {
  const { status, statusText } = response;

  if (Math.round(status / 100) === 2) {
    resolve({ text, response, status });
  } else {
    /* eslint-disable-next-line prefer-promise-reject-errors */
    reject({ error: statusText, response, status });
  }
});

const processResponse = response => {
  const { status } = response;

  if (status === 204) {
    return Promise.resolve(null);
  }

  const contentType = response.headers.get("content-type");
  if (contentType.startsWith("text/html") || contentType.startsWith("text/plain")) {
    return response.text().then(textResponse(response));
  }

  return response.json().then(jsonResponse(response));
};

export default processResponse;
