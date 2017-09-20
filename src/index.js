import network from "./network";

class CultureHQ {
  constructor() {
    this.token = null;
  }

  changePassword(params) {
    this._ensureSignedIn();
    this._validateParams(params, ["password"]);
    return network.patch("/password", { token: this.token, params });
  }

  createOrganization(params) {
    this._ensureSignedIn();
    this._validateParams(params, ["name"]);
    return network.post("/admin/organizations", { token: this.token, params });
  }

  getProfile() {
    this._ensureSignedIn();
    return network.get("/profile", { token: this.token });
  }

  isSignedIn() {
    return this.token !== null;
  }

  registerUser(params) {
    this._validateParams(params, ["token", "name", "email", "password"]);
    const token = params.token;
    delete params.token;
    return network.post(`/invites/${token}/users`, { params });
  }

  sendInvite(params) {
    this._ensureSignedIn();
    this._validateParams(params, ["email"]);
    return network.post("/invites", { token: this.token, params });
  }

  signIn(params) {
    this._validateParams(params, ["email", "password"]);
    return network.post("/api_keys", { params }).then(response => {
      this.token = response.token;
      return response;
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
