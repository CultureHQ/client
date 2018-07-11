import createServer from "./create-server";
import request from "../src/request";

const parseMultipart = request => {
  const contentType = request.headers["content-type"];
  const boundary = contentType.split("boundary=")[1];

  const values = [];
  const parts = request.parsedBody.split(boundary);
  const namePattern = /"(.+)"/;

  for (let idx = 1; idx < parts.length - 1; idx++) {
    const components = parts[idx].split("\r\n");
    const name = components[1].match(namePattern)[1];
    values.push({ name, value: components[3] });
  }

  return values;
};

test("attaches GET params directly to the query string", async () => {
  const server = createServer({ status: 200, body: {} });
  server.listen(1693);

  try {
    const { response } = await request("GET", new URL("http://localhost:1693"), {
      params: { one: "one", two: [], three: [1, 2, 3], four: null, five: undefined }
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
  } finally {
    server.close();
  }
});

test("passes nulls through as empty strings on multipart", async () => {
  const server = createServer({ status: 200, body: { foo: "bar" } });
  const port = 1694;
  server.listen(port);

  try {
    const url = new URL(`http://localhost:${port}`);
    const response = await request("POST", url, {
      params: { foo: null },
      multipart: true
    });
    expect(server.requests.length).toEqual(1);

    const parsedBody = parseMultipart(server.requests[0]);
    expect(parsedBody[0]).toEqual({ name: "foo", value: "" });
  } finally {
    server.close();
  }
});

test("properly handles multipart array parameters", async () => {
  const server = createServer({ status: 200, body: { foo: "bar" } });
  const port = 1695;
  server.listen(port);

  try {
    const url = new URL(`http://localhost:${port}`);
    const response = await request("POST", url, {
      params: { foo: [1, 2, 3] },
      multipart: true
    });
    expect(server.requests.length).toEqual(1);

    const parsedBody = parseMultipart(server.requests[0]);
    for (let idx = 0; idx < 3; idx++) {
      expect(parsedBody[idx]).toEqual({
        name: "foo[]",
        value: (idx + 1).toString()
      });
    }
  } finally {
    server.close();
  }
});

test("properly handles multiparty empty array parameters", async () => {
  const server = createServer({ status: 200, body: { foo: "bar" } });
  const port = 1696;
  server.listen(port);

  try {
    const url = new URL(`http://localhost:${port}`);
    const response = await request("POST", url, {
      params: { foo: [] },
      multipart: true
    });
    expect(server.requests.length).toEqual(1);

    const parsedBody = parseMultipart(server.requests[0]);
    expect(parsedBody[0]).toEqual({ name: "foo[]", value: "" });
  } finally {
    server.close();
  }
});
