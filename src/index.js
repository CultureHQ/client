import fetch from "node-fetch";
import FormData from "form-data";
import Network from "./network";

class CultureHQ {
  signIn (email, password, callback) {
    const params = { email, password };
    Network.post("/api_keys", { params }, (error, response) => {
      if (error === null) {
        this.token = response.token;
      }
      callback(error, response);
    });
  }

  getProfile (callback) {
    Network.get("/profile", { token: this.token }, callback);
  }
}

window.cultureHQ = new CultureHQ();
export default CultureHQ;
