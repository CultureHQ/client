import network from "./network";

class CultureHQ {
  constructor() {
    this.token = null;
  }

  changePassword(params, callback) {
    this._ensureSignedIn();
    this._validateParams(params, ["password"]);
    network.patch("/password", { token: this.token, params }, callback);
  }

  createCompany(params, callback) {
    this._ensureSignedIn();
    this._validateParams(params, ["name"]);
    network.post("/admin/companies", { token: this.token, params }, callback);
  }

  getProfile(callback) {
    this._ensureSignedIn();
    network.get("/profile", { token: this.token }, callback);
  }

  isSignedIn() {
    return this.token !== null;
  }

  sendInvite(params, callback) {
    this._ensureSignedIn();
    this._validateParams(params, ["email"]);
    network.post("/invites", { token: this.token, params }, callback);
  }

  signIn(params, callback) {
    this._validateParams(params, ["email", "password"]);
    network.post("/api_keys", { params }, (error, response) => {
      if (error === null) {
        this.token = response.token;
      }
      callback(error, response);
    });
  }

  signOut() {
    this.token = null;
  }

  _ensureSignedIn() {
    if (!this.isSignedIn()) {
      throw new Error("signIn() must be called first.");
    }
  }

  _validateParams(params, expected) {
    expected.forEach(key => {
      if (!params.hasOwnProperty(key)) {
        throw new Error(`Required param ${key} not provided.`);
      }
    });
  }
}

if (window) {
  window.CultureHQ = new CultureHQ();
}

export default CultureHQ;
