import createServer from "./create-server";
import CultureHQ from "../src/index";

afterEach(() => {
  CultureHQ.signOut();
});

test("starts signed out", () => {
  expect(CultureHQ.isSignedIn()).toBe(false);
});

test("signs in and reports signed in status correctly", async () => {
  const server = createServer({
    status: 200,
    body: { apiKey: { token: "baz" } }
  });
  server.listen(3000);

  try {
    const response = await CultureHQ.signIn({ email: "foo", password: "bar" });
    expect(response.apiKey.token).toEqual("baz");
    expect(CultureHQ.isSignedIn()).toBe(true);
  } finally {
    server.close();
  }
});

describe("with a signed in user", () => {
  let server, number;

  beforeEach(async () => {
    number = Math.random();
    server = createServer([
      { status: 200, body: { apiKey: { token: "baz" } } },
      { status: 200, body: { number } }
    ]);
    server.listen(3000);

    await CultureHQ.signIn({ email: "foo", password: "bar" });
  });

  afterEach(() => {
    server.close();
  });

  const actions = {
    changePassword: ["password"],
    createComment: ["eventId", "body"],
    createDepartment: ["name"],
    createEvent: ["name", "details", "startsAt", "endsAt", "eventType"],
    createFeedback: ["body", "anonymous"],
    createOrganization: ["name"],
    createReward: ["name", "points"],
    createRSVP: { eventId: "foo", responseType: "accepted", extra: "foo" },
    deactivateUser: ["userId"],
    deleteComment: ["eventId", "commentId"],
    deleteDepartment: ["dptId"],
    deleteOrganization: ["orgId"],
    deleteReward: ["rewardId"],
    getComment: ["eventId", "commentId"],
    getDepartment: ["dptId"],
    getFeedback: ["feedbackId"],
    getOrganization: ["orgId"],
    getProfile: [],
    getReward: ["rewardId"],
    getUser: ["userId"],
    listComments: ["eventId"],
    listDepartments: [],
    listFeedback: [],
    listInvites: [],
    listOrganizations: [],
    listRewards: [],
    listUserEvents: ["userId"],
    listUsers: [],
    reactivateUser: ["userId"],
    registerUser: ["token", "name", "password"],
    requestPasswordReset: ["email"],
    resetPassword: ["token", "password"],
    reviewFeedback: ["feedbackId"],
    sendInvite: ["email"],
    updateComment: ["eventId", "commentId", "body"],
    updateDepartment: ["dptId", "name"],
    updateOrganization: ["orgId", "name"],
    updateReward: ["name", "points", "description"],
    updateUser: ["userId", "name", "email", "departmentIds"]
  };

  const createParams = keys => {
    if (typeof keys.forEach === "undefined") {
      return keys;
    }

    const params = {};
    keys.forEach(key => (params[key] = "foo"));
    return params;
  };

  Object.keys(actions).forEach(action => {
    test(`can ${action}`, async () => {
      const response = await CultureHQ[action](createParams(actions[action]));
      expect(response).toEqual({ number });
    });
  });
});

test("fails when required parameters aren't given", async () => {
  const server = createServer({
    status: 200,
    body: { apiKey: { token: "baz" } }
  });
  server.listen(3000);

  await CultureHQ.signIn({ email: "foo", password: "bar" });
  server.close();

  const requiredParamActions = [
    "changePassword",
    "createEvent",
    "createOrganization",
    "createRSVP",
    "registerUser",
    "requestPasswordReset",
    "resetPassword",
    "sendInvite",
    "signIn",
    "updateOrganization"
  ];

  requiredParamActions.forEach(action => {
    expect(() => {
      CultureHQ[action]();
    }).toThrow();
  });
});
