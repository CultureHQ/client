import { camelize } from "./stringCase";
import { disconnect } from "./cable";
import state from "./state";

// Global handler for session expiration (403 responses)
// Note: We use state.clear() directly instead of signOut() to avoid circular dependency
const handleSessionExpired = () => {
  state.clear();
  disconnect();
  // Redirect to login page
  window.location.replace(`${window.location.origin}/login`);
};

const jsonResponse = response => json => new Promise((resolve, reject) => {
  const { status } = response;

  // Handle session expired globally
  if (status === 403) {
    handleSessionExpired();
    // Still reject so the calling code knows something went wrong
    /* eslint-disable-next-line prefer-promise-reject-errors */
    reject({ ...camelize(json), response, status });
    return;
  }

  const callback = Math.round(status / 100) === 2 ? resolve : reject;

  callback({ ...camelize(json), response, status });
});

const textResponse = response => text => new Promise((resolve, reject) => {
  const { status, statusText } = response;

  // Handle session expired globally
  if (status === 403) {
    handleSessionExpired();
    /* eslint-disable-next-line prefer-promise-reject-errors */
    reject({ error: statusText, response, status });
    return;
  }

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

  // Handle 403 early for empty responses
  if (status === 403) {
    handleSessionExpired();
    /* eslint-disable-next-line prefer-promise-reject-errors */
    return Promise.reject({ error: "Session expired", response, status });
  }

  const contentType = response.headers.get("content-type");
  if (contentType.startsWith("text/html") || contentType.startsWith("text/plain")) {
    return response.text().then(textResponse(response));
  }

  return response.json().then(jsonResponse(response));
};

export default processResponse;
