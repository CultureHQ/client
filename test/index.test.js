import fs from "fs";

import createServer from "./create-server";
import CultureHQ from "../src/index";
import caller from "../src/caller";

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
  server.listen(8080);

  try {
    const response = await CultureHQ.signIn({ email: "foo", password: "bar" });
    expect(response.apiKey.token).toEqual("baz");
    expect(CultureHQ.isSignedIn()).toBe(true);
  } finally {
    server.close();
  }
});

describe("with a signed in user", () => {
  const apiCaller = caller({});

  Object.keys(apiCaller).forEach(callName => {
    const number = Math.random();
    const server = createServer([
      { status: 200, body: { apiKey: { token: "baz" } } },
      { status: 200, body: { number } }
    ]);

    const params = {};
    const apiCall = CultureHQ[callName];

    if (typeof apiCall.expectedParams !== "undefined") {
      apiCall.expectedParams.forEach(key => (params[key] = "foo"));
    }

    test(`can ${callName}`, async () => {
      server.listen(8080);

      try {
        await CultureHQ.signIn({ email: "foo", password: "bar" });
        const response = await CultureHQ[callName](params);
        expect(response).toEqual({ number });
      } finally {
        server.close();
      }
    });
  });
});

describe("with an action that expects parameters", () => {
  Object.keys(CultureHQ).forEach(callName => {
    const expectedParams = CultureHQ[callName].expectedParams;

    if (typeof expectedParams !== "undefined") {
      test(`cannot call ${callName} without expected parameters`, async () => {
        const server = createServer({
          status: 200,
          body: { apiKey: { token: "baz" } }
        });
        server.listen(8080);

        try {
          await CultureHQ.signIn({ email: "foo", password: "bar" });
        } finally {
          server.close();
        }

        const pattern = new RegExp(`parameter ${expectedParams[0]}`);
        expect(() => CultureHQ[callName]({})).toThrow(pattern);
      });
    }
  });
});

describe("contains the expected calls", () => {
  const filepathToEntityName = filepath => {
    let entityName = filepath.replace(".js", "");
    entityName = `${entityName[0].toUpperCase()}${entityName.slice(1)}`;

    const pattern = /\-([a-z])/;
    let match;

    while ((match = pattern.exec(entityName)) !== null) {
      entityName = entityName.replace(match[0], match[1].toUpperCase());
    }
    return entityName;
  };

  fs.readdirSync("./src/calls").forEach(filepath => {
    const entityName = filepathToEntityName(filepath);

    test(`CultureHQ object contains calls for the ${entityName} entity`, () => {
      const entityPattern = new RegExp(entityName);
      const matched = Object.keys(CultureHQ).filter(callName =>
        entityPattern.test(callName)
      );
      expect(matched.length).toBeGreaterThanOrEqual(1);
    });
  });
});
