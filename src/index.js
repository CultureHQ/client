import store from "store/dist/store.modern";
import network from "./network";

const Utils = {
  storeKey: "token",

  ensureSignedIn: () => {
    if (!CultureHQ.isSignedIn()) {
      throw new Error("signIn() must be called first.");
    }
  },

  signedInRequest: (method, path, params) => {
    Utils.ensureSignedIn();
    return network[method](path, { token: store.get(Utils.storeKey), params });
  },

  validateParams: (params, expected) => {
    expected.forEach(key => {
      if (!params.hasOwnProperty(key)) {
        throw new Error(`Required param ${key} not provided.`);
      }
    });
  }
};

const CultureHQ = {
  changePassword: (params) => {
    Utils.validateParams(params, ["password"]);
    return Utils.signedInRequest("patch", "/password", params);
  },

  /** Optional params = [sponsored] */
  createEvent: (params) => {
    Utils.validateParams(params, [
      "name", "details", "startsAt", "endsAt", "eventType"
    ]);
    return Utils.signedInRequest("post", "/events", params);
  },

  createOrganization: (params) => {
    Utils.validateParams(params, ["name"]);
    return Utils.signedInRequest("post", "/admin/organizations", params);
  },

  /** Optional params = [extra] */
  createRSVP: (params) => {
    Utils.validateParams(params, ["eventId", "responseType"]);

    const eventId = params.eventId;
    delete params.eventId;

    if (["declined", "interested", "accepted"].indexOf(params.responseType) === -1) {
      throw new Error("responseType parameter must be one of declined, interested, or accepted");
    }
    return Utils.signedInRequest("post", `/events/${eventId}/rsvps`, params);
  },

  getProfile: () => {
    return Utils.signedInRequest("get", "/profile", {});
  },

  getUser: (params) => {
    Utils.validateParams(params, ["userId"]);
    return Utils.signedInRequest("get", `/users/${params.userId}`, {});
  },

  getUserEvents: (params) => {
    Utils.validateParams(params, ["userId"]);
    return Utils.signedInRequest("get", `/users/${params.userId}/events`, {});
  },

  isSignedIn: () => {
    return store.get(Utils.storeKey) !== undefined;
  },

  registerUser: (params) => {
    Utils.validateParams(params, ["token", "name", "email", "password"]);
    const token = params.token;
    delete params.token;
    return Utils.signedInRequest("post", `/invites/${token}/users`, params);
  },

  sendInvite: (params) => {
    Utils.validateParams(params, ["email"]);
    return Utils.signedInRequest("post", "/invites", params);
  },

  signIn: (params) => {
    Utils.validateParams(params, ["email", "password"]);
    return network.post("/api_keys", { params }).then(response => {
      store.set(Utils.storeKey, response.token);
      return response;
    });
  },

  signOut: () => {
    store.clearAll();
  }
}

if (window) {
  window.CultureHQ = CultureHQ;
}

export default CultureHQ;
