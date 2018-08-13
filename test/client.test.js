import createServer from "./create-server";
import client, { getToken, isSignedIn, setToken, signIn, startUserSimulation, endUserSimulation, isSimulating } from "../src/client";
import state from "../src/state";

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
  const pattern = new RegExp("parameter email");

  expect(client.createApiKey).toThrow(pattern);
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
