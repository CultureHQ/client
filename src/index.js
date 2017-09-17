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

  sendInvite (email, callback) {
    const params = { email };
    Network.post("/invites", { token: this.token, params }, callback);
  }

  changePassword (password, callback) {
    const params = { password };
    Network.patch("/password", { token: this.token, params }, callback);
  }

  createCompany (name, callback) {
    const params = { name };
    Network.post("/admin/companies", { token: this.token, params }, callback);
  }
}

if (window) {
  window.cultureHQ = new CultureHQ();
}

export default CultureHQ;
