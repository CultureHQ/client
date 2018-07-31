import createServer from "./create-server";
import client from "../src/client";
import state from "../src/state";

afterEach(() => state.signOut());

test("starts signed out", () => {
  expect(client.isSignedIn()).toBe(false);
});

test("signs in and reports signed in status correctly", async () => {
  const server = createServer({
    status: 200,
    body: { apiKey: { token: "baz" } }
  });
  server.listen(8080);

  try {
    const response = await client.signIn({ email: "foo", password: "bar" });
    expect(response.apiKey.token).toEqual("baz");
    expect(client.isSignedIn()).toBe(true);
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
    await client.signIn({ email: "foo", password: "bar" });
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
