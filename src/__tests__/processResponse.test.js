import processResponse from "../processResponse";

class Headers {
  constructor(headers) {
    this.headers = headers;
  }

  get(key) {
    return this.headers[key];
  }
}

const textHeaders = new Headers({ "content-type": "text/html" });

const jsonHeaders = new Headers({ "content-type": "application/json; charset=utf-8" });

test("handles 204 (no content) responses", async () => {
  const processed = await processResponse({ status: 204 });

  expect(processed).toBe(null);
});

test("handles successful text/html responses", async () => {
  const status = 200;
  const response = {
    headers: textHeaders,
    status,
    text: () => Promise.resolve("This is a response")
  };

  const processed = await processResponse(response);
  expect(processed).toEqual({ text: "This is a response", response, status });
});

test("handles unsuccessful text/html responses", async () => {
  const status = 500;
  const response = {
    headers: textHeaders,
    status,
    statusText: "Internal Server Error",
    text: () => Promise.resolve()
  };

  await expect(processResponse(response)).rejects.toEqual({
    error: "Internal Server Error",
    response,
    status
  });
});

test("handles successful application/json responses", async () => {
  const status = 200;
  const response = {
    headers: jsonHeaders,
    status,
    json: () => Promise.resolve({ foo_bar: "baz" })
  };

  const processed = await processResponse(response);
  expect(processed).toEqual({ fooBar: "baz", response, status });
});

test("handles unsuccessful application/json responses", async () => {
  const status = 500;
  const response = {
    headers: jsonHeaders,
    status,
    json: () => Promise.resolve({ foo_bar: "baz" })
  };

  await expect(processResponse(response)).rejects.toEqual({
    fooBar: "baz",
    response,
    status
  });
});
