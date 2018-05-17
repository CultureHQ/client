import "url-polyfill";
import store from "store/dist/store.modern";
import fs from "fs";

import createServer from "./create-server";
import CultureHQ from "../src/index";
import calls from "../src/calls";
import state from "../src/state";

const port = 1693;
const client = new CultureHQ({ apiHost: `http://localhost:${port}` });

afterEach(() => state.signOut());

test("starts signed out", () => {
  expect(client.isSignedIn()).toBe(false);
});

test("signs in and reports signed in status correctly", async () => {
  const server = createServer({
    status: 200,
    body: { apiKey: { token: "baz" } }
  });
  server.listen(port);

  try {
    const response = await client.signIn({ email: "foo", password: "bar" });
    expect(response.apiKey.token).toEqual("baz");
    expect(client.isSignedIn()).toBe(true);
  } finally {
    server.close();
  }
});

test("auto signs out you hit 3 403s in a row", async () => {
  const server = createServer([
    { status: 200, body: { apiKey: { token: "baz" } } },
    { status: 403, body: { error: "foo" } },
    { status: 403, body: { error: "foo" } },
    { status: 403, body: { error: "foo" } },
    { status: 200, body: { foo: "bar" } }
  ]);
  server.listen(1700);

  try {
    const autoClient = new CultureHQ({ apiHost: "http://localhost:1700" });
    await autoClient.signIn({ email: "foo", password: "bar" });

    for (let idx = 0; idx < 3; idx += 1) {
      try {
        await autoClient.listInterests();
      } catch (error) {}
    }

    expect(autoClient.isSignedIn()).toBe(false);
  } finally {
    server.close();
  }
});

test("auto signs out you hit a 403 on the profile", async () => {
  const server = createServer([
    { status: 200, body: { apiKey: { token: "baz" } } },
    { status: 403, body: { error: "foo" } },
    { status: 200, body: { foo: "bar" } }
  ]);
  server.listen(1701);

  try {
    const autoClient = new CultureHQ({ apiHost: "http://localhost:1701" });
    await autoClient.signIn({ email: "foo", password: "bar" });

    try {
      await autoClient.getProfile();
    } catch (error) {}

    expect(autoClient.isSignedIn()).toBe(false);
  } finally {
    server.close();
  }
});

describe("with a signed in user", () => {
  Object.keys(calls).forEach(callName => {
    const number = Math.random();
    const server = createServer([
      { status: 200, body: { apiKey: { token: "baz" } } },
      { status: 200, body: { number } }
    ]);

    const params = {};
    const apiCall = client[callName];

    if (apiCall.expectedParams.length) {
      apiCall.expectedParams.forEach(key => (params[key] = "foo"));
    }

    test(`can ${callName}`, async () => {
      server.listen(port);

      try {
        await client.signIn({ email: "foo", password: "bar" });
        const response = await client[callName](params);
        expect(response.number).toEqual(number);
      } finally {
        server.close();
      }
    });
  });
});

describe("with an action that expects parameters", () => {
  Object.keys(calls).forEach(callName => {
    const expectedParams = client[callName].expectedParams;

    if (expectedParams.length) {
      test(`cannot call ${callName} without expected parameters`, async () => {
        const server = createServer({
          status: 200,
          body: { apiKey: { token: "baz" } }
        });
        server.listen(port);

        try {
          await client.signIn({ email: "foo", password: "bar" });
        } finally {
          server.close();
        }

        const pattern = new RegExp(`parameter ${expectedParams[0]}`);
        expect(() => client[callName]({})).toThrow(pattern);
      });
    }
  });
});
