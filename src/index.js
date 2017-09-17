import fetch from "node-fetch";

const API_ENDPOINT = "http://localhost:3000";
const CultureHQ = {};

CultureHQ.signIn = (email, password, callback) => {
  fetch(`${apiEndpoint}/api_keys`, { method: 'POST', body: `email=${email}&password=${password}` })
    .then(res => res.json()).then(json => {
      console.log(json);
    });
};

export default CultureHQ;
