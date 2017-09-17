import Network from "./network";

class CultureHQ {
  constructor() {
    this.token = null;
  }

  changePassword(password, callback) {
    this._ensureSignedIn();
    const params = { password };
    Network.patch("/password", { token: this.token, params }, callback);
  }

  createCompany(name, callback) {
    this._ensureSignedIn();
    const params = { name };
    Network.post("/admin/companies", { token: this.token, params }, callback);
  }

  getProfile(callback) {
    this._ensureSignedIn();
    Network.get("/profile", { token: this.token }, callback);
  }

  isSignedIn() {
    return this.token !== null;
  }

  sendInvite(email, callback) {
    this._ensureSignedIn();
    const params = { email };
    Network.post("/invites", { token: this.token, params }, callback);
  }

  signIn(email, password, callback) {
    const params = { email, password };
    Network.post("/api_keys", { params }, (error, response) => {
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
      throw new Error("You must first sign in!");
    }
  }
}

if (window) {
  window.CultureHQ = new CultureHQ();
}

export default CultureHQ;
