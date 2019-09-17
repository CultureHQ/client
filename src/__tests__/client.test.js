import createServer from "./createServer";

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
  const server = createServer({
    status: 200,
    body: { apiKey: { token: "baz" } }
  });
  server.listen(8080);

  try {
    const response = await signIn({ email: "foo", password: "bar" });
    expect(response.apiKey.token).toEqual("baz");
    expect(isSignedIn()).toBe(true);
  } finally {
    server.close();
  }
});

test("can sign out", async () => {
  const server = createServer({ status: 204 });
  server.listen(8080);

  setToken("foo");
  expect(isSignedIn()).toBe(true);

  try {
    await signOut();
    expect(isSignedIn()).toBe(false);
  } finally {
    server.close();
  }
});

test("can call getProfile after logged in", async () => {
  const number = Math.random();
  const server = createServer([
    { status: 200, body: { apiKey: { token: "baz" } } },
    { status: 200, body: { number } }
  ]);

  server.listen(8080);

  try {
    await signIn({ email: "foo", password: "bar" });
    const response = await client.getProfile();
    expect(response.number).toEqual(number);
  } finally {
    server.close();
  }
});

test("cannot call createApiKey without expected parameters", () => {
  expect(client.createApiKey).toThrow(/parameter email/);
});

test("substitutes values into the request path", async () => {
  const server = createServer({ status: 200, body: {} });
  server.listen(8080);

  try {
    const { response } = await client.getUser({ userId: 42 });
    expect(response.url.endsWith("/users/42")).toBe(true);
  } finally {
    server.close();
  }
});

test("can start a user simulation", async () => {
  const server = createServer({ status: 200, body: { apiKey: { token: "bar" } } });
  server.listen(8080);

  setToken("foo");

  try {
    await startUserSimulation({ userId: 42 });
    expect(isSimulating()).toBe(true);
    expect(getToken()).toEqual("bar");

    endUserSimulation();
    expect(isSimulating()).toBe(false);
    expect(getToken()).toEqual("foo");
  } finally {
    server.close();
  }
});
