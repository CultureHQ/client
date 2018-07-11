import createServer from "./create-server";
import request from "../src/request";

const parseMultipart = ({ headers, parsedBody }) => {
  const contentType = headers["content-type"];
  const boundary = contentType.split("boundary=")[1];

  const values = [];
  const parts = parsedBody.split(boundary);
  const namePattern = /"(.+)"/;

  for (let idx = 1; idx < parts.length - 1; idx += 1) {
    const components = parts[idx].split("\r\n");
    const name = components[1].match(namePattern)[1];
    values.push({ name, value: components[3] });
  }

  return values;
};

const withServer = async callback => {
  const server = createServer({ status: 200, body: { foo: "bar" } });
  server.listen(1693);

  try {
    await callback(server);
  } finally {
    server.close();
  }
};

test("attaches GET params directly to the query string", () => (
  withServer(async () => {
    const { response } = await request("GET", new URL("http://localhost:1693"), {
      params: {
        one: "one",
        two: [],
        three: [1, 2, 3],
        four: null,
        five: undefined
      }
    });

    const entries = new URL(response.url).searchParams.entries();
    const expected = [
      ["one", "one"],
      ["three[]", "1"],
      ["three[]", "2"],
      ["three[]", "3"]
    ];

    let next;
    for (next = entries.next(); !next.done; next = entries.next()) {
      const { value: [actualKey, actualValue] } = next;
      const [expectedKey, expectedValue] = expected.shift();

      expect(actualKey).toEqual(expectedKey);
      expect(actualValue).toEqual(expectedValue);
    }
  })
));

test("passes nulls through as empty strings on multipart", () => (
  withServer(async server => {
    await request("POST", new URL("http://localhost:1693"), {
      params: { foo: null },
      multipart: true
    });

    expect(server.requests.length).toEqual(1);

    const parsedBody = parseMultipart(server.requests[0]);
    expect(parsedBody[0]).toEqual({ name: "foo", value: "" });
  })
));

test("properly handles multipart array parameters", () => (
  withServer(async server => {
    await request("POST", new URL("http://localhost:1693"), {
      params: { foo: [1, 2, 3] },
      multipart: true
    });

    expect(server.requests.length).toEqual(1);

    const parsedBody = parseMultipart(server.requests[0]);

    for (let idx = 0; idx < 3; idx += 1) {
      expect(parsedBody[idx]).toEqual({
        name: "foo[]",
        value: (idx + 1).toString()
      });
    }
  })
));

test("properly handles multiparty empty array parameters", () => (
  withServer(async server => {
    await request("POST", new URL("http://localhost:1693"), {
      params: { foo: [] },
      multipart: true
    });

    expect(server.requests.length).toEqual(1);

    const parsedBody = parseMultipart(server.requests[0]);
    expect(parsedBody[0]).toEqual({ name: "foo[]", value: "" });
  })
));

test("adds appropriate headers", () => (
  withServer(async server => {
    await request("GET", new URL("http://localhost:1693"), {
      params: {},
      simulation: "simulation-token",
      token: "regular-token"
    });

    const expected = {
      "content-type": "application/json",
      authorization: "token regular-token",
      "x-client-simulation": "simulation-token"
    };

    const { requests: [{ headers }] } = server;

    Object.keys(expected).forEach(headerKey => {
      expect(headers[headerKey]).toEqual(expected[headerKey]);
    });
  })
));
