import testServer from "./testServer";
import performRequest from "../performRequest";

test("attaches GET params directly to the query string", async () => {
  testServer.mock({ status: 200 });

  const { response } = await performRequest("GET", new URL(`http://localhost:${testServer.port}`), {
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
});

test("adds appropriate headers", async () => {
  testServer.mock({ status: 200 });

  await performRequest("GET", new URL(`http://localhost:${testServer.port}`), {
    params: {},
    simulation: "simulation-token",
    token: "regular-token"
  });

  const expected = {
    "content-type": "application/json",
    authorization: "token regular-token",
    "x-client-simulation": "simulation-token"
  };

  const { headers } = testServer.requests[testServer.requests.length - 1];

  Object.keys(expected).forEach(headerKey => {
    expect(headers[headerKey]).toEqual(expected[headerKey]);
  });
});
