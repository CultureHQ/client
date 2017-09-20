import createServer from "./create-server";
import CultureHQ from "../src/index";

const cultureHQ = new CultureHQ();

afterEach(() => {
  cultureHQ.signOut();
});

test("starts signed out", () => {
  expect(cultureHQ.isSignedIn()).toBe(false);
});

test("cannot call signed in functions without signing in first", () => {
  const signedInActions = [
    "changePassword",
    "createEvent",
    "createOrganization",
    "getProfile",
    "getUser",
    "getUserEvents",
    "sendInvite"
  ];

  signedInActions.forEach(action => {
    expect(() => {
      cultureHQ[action]({});
    }).toThrow();
  });
});

test("signs in and reports signed in status correctly", async () => {
  const server = createServer({ status: 200, body: { token: "baz" } });
  server.listen(3000);

  const response = await cultureHQ.signIn({ email: "foo", password: "bar" });
  expect(response.token).toEqual("baz");
  expect(cultureHQ.isSignedIn()).toBe(true);

  server.close();
});

describe("with a signed in user", () => {
  let server, number;

  beforeEach(async () => {
    number = Math.random();
    server = createServer([
      { status: 200, body: { token: "baz" } },
      { status: 200, body: { number } }
    ]);
    server.listen(3000);

    await cultureHQ.signIn({ email: "foo", password: "bar" });
  });

  afterEach(() => {
    server.close();
  });

  const actions = {
    changePassword: { password: "foo" },
    createEvent: {
      name: "Test event",
      details: "This is a test event",
      startsAt: "2017-01-01",
      endsAt: "2018-01-01",
      eventType: "Social"
    },
    createOrganization: { name: "foo" },
    getProfile: {},
    getUser: { userId: 1 },
    getUserEvents: { userId: 1 },
    registerUser: {
      token: "some-random-token",
      name: "Kevin",
      email: "kevin@culturehq.net",
      password: "password"
    },
    sendInvite: { email: "foo" }
  };

  Object.keys(actions).forEach(action => {
    test(`can ${action}`, async () => {
      const response = await cultureHQ[action](actions[action]);
      expect(response).toEqual({ number });
    });
  });
});

test("fails when required parameters aren't given", async () => {
  const server = createServer({ status: 200, body: { token: "baz" } });
  server.listen(3000);

  await cultureHQ.signIn({ email: "foo", password: "bar" });
  server.close();

  const requiredParamActions = [
    "changePassword",
    "createEvent",
    "createOrganization",
    "getUser",
    "getUserEvents",
    "registerUser",
    "sendInvite"
  ];

  requiredParamActions.forEach(action => {
    expect(() => {
      cultureHQ[action]();
    }).toThrow();
  });
});
