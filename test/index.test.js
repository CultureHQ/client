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
  expect(() => {
    cultureHQ.createOrganization({});
  }).toThrow();

  expect(() => {
    cultureHQ.getProfile();
  }).toThrow();

  expect(() => {
    cultureHQ.sendInvite({});
  }).toThrow();
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

  test("can change password", async () => {
    const response = await cultureHQ.changePassword({ password: "foo" });
    expect(response).toEqual({ number });
  });

  test("can create an organization", async () => {
    const response = await cultureHQ.changePassword({ password: "foo" });
    expect(response).toEqual({ number });
  });

  test("can get the profile", async () => {
    const response = await cultureHQ.getProfile();
    expect(response).toEqual({ number });
  });

  test("can register a user", async () => {
    const params = {
      token: "some-random-token",
      name: "Kevin",
      email: "kevin@culturehq.net",
      password: "password"
    };
    const response = await cultureHQ.registerUser(params);
    expect(response).toEqual({ number });
  });

  test("can send invite", async () => {
    const response = await cultureHQ.sendInvite({ email: "foo" });
    expect(response).toEqual({ number });
  });
});

describe("fails when required parameters aren't given", () => {
  beforeEach(async () => {
    const server = createServer({ status: 200, body: { token: "baz" } });
    server.listen(3000);

    await cultureHQ.signIn({ email: "foo", password: "bar" });
    server.close();
  });

  test("on the changePassword function", () => {
    expect(() => {
      cultureHQ.changePassword();
    }).toThrow();
  });

  test("on the createOrganization function", () => {
    expect(() => {
      cultureHQ.createOrganization();
    }).toThrow();
  });

  test("on the registerUser function", () => {
    expect(() => {
      cultureHQ.registerUser();
    }).toThrow();
  });

  test("on the sendInvite function", () => {
    expect(() => {
      cultureHQ.sendInvite();
    }).toThrow();
  });
});
