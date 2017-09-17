let API_ENDPOINT;

if (process.env.NODE_ENV === "prod") {
  API_ENDPOINT = "https://api.culturehq.net";
} else {
  API_ENDPOINT = "http://localhost:3000";
}

const sendRequest = (method, path, options, callback) => {
  let reqOptions = {
    headers: { "Content-Type": "application/json" }
  };

  if (options.token) {
    reqOptions.headers["Authorization"] = `token ${options.token}`;
  }

  if (method === "POST") {
    reqOptions.method = "POST";
    reqOptions.body = JSON.stringify(options.params);
  }

  fetch(`${API_ENDPOINT}${path}`, reqOptions)
    .then(response => {
      if (response.status / 100 === 2) {
        response.json().then(json => callback(null, json));
      } else {
        callback(response.status, response.statusText);
      }
    })
    .catch(error => {
      callback(error, null);
    });
};

export default {
  get: (path, options, callback) =>
    sendRequest("GET", path, options, callback),

  post: (path, options, callback) =>
    sendRequest("POST", path, options, callback)
};
