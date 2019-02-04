import createServer from "./createServer";
import performRequest from "../performRequest";

const withServer = async callback => {
  const server = createServer({ status: 200, body: { foo: "bar" } });
  server.listen(withServer.currentPort += 1);

  try {
    await callback(server, new URL(`http://localhost:${server.address().port}`));
  } finally {
    server.close();
  }
};

withServer.currentPort = 1693;

test("attaches GET params directly to the query string", () => (
  withServer(async (server, url) => {
    const { response } = await performRequest("GET", url, {
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

test("adds appropriate headers", () => (
  withServer(async (server, url) => {
    await performRequest("GET", url, {
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
