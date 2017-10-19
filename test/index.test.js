import fs from "fs";

import createServer from "./create-server";
import CultureHQ from "../src/index";
import calls from "../src/calls";

const port = 8080;
const client = new CultureHQ({ apiHost: `http://localhost:${port}` });

afterEach(() => {
  client.signOut();
});

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

        if (client[callName].method === "DELETE") {
          expect(response).toEqual({});
        } else {
          expect(response).toEqual({ number });
        }
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
