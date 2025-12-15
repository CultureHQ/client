import testServer from "./testServer";

import client, {
  getToken,
  isSignedIn,
  setToken,
  signIn,
  signOut,
  startUserSimulation,
  endUserSimulation,
  isSimulating
} from "../client";

import state from "../state";

afterEach(() => state.clear());

test("starts signed out", () => {
  expect(isSignedIn()).toBe(false);
});

test("signs in and reports signed in status correctly", async () => {
  testServer.mock({ status: 200, body: { apiKey: { token: "baz" } } });

  const response = await signIn({ email: "foo", password: "bar" });
  expect(response.apiKey.token).toEqual("baz");
  expect(isSignedIn()).toBe(true);
});

test("can sign out", async () => {
  testServer.mock({ status: 204 });

  setToken("foo");
  expect(isSignedIn()).toBe(true);

  await signOut();
  expect(isSignedIn()).toBe(false);
});

test("can call getProfile after logged in", async () => {
  const number = Math.random();

  testServer.mock({
    status: 200,
    body: {
      apiKey: {
        token: "baz",
        user: { number }
      }
    }
  });
  await signIn({ email: "foo", password: "bar" });

  testServer.mock({ status: 200, body: { number } });
  const response = await client.getProfile();

  expect(response.number).toEqual(number);
});

test("cannot call createApiKey without expected parameters", () => {
  expect(client.createApiKey).toThrow(/parameter email/);
});

test("substitutes values into the request path", async () => {
  testServer.mock({ status: 200, body: {} });

  const { response } = await client.getUser({ userId: 42 });
  expect(response.url.endsWith("/users/42")).toBe(true);
});

test("can start a user simulation", async () => {
  testServer.mock({
    status: 200,
    body: {
      apiKey: {
        token: "bar",
        user: { id: 42 }
      }
    }
  });

  setToken("foo");

  await startUserSimulation({ userId: 42 });
  expect(isSimulating()).toBe(true);
  expect(getToken()).toEqual("bar");

  endUserSimulation();
  expect(isSimulating()).toBe(false);
  expect(getToken()).toEqual("foo");
});
