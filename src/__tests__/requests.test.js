import createServer from "./createServer";
import { makeGet, makePost, makePatch, makeDelete } from "../requests";

describe("requests", () => {
  const withServer = async callback => {
    const server = createServer({ status: 200, body: { foo: "bar" } });
    server.listen(8080);

    try {
      await callback(() => server.requests[server.requests.length - 1].method);
    } finally {
      server.close();
    }
  };

  test("makeGet", () => (
    withServer(async getMethod => {
      await makeGet("/foo");
      expect(getMethod()).toEqual("GET");
    })
  ));

  test("makePost", () => (
    withServer(async getMethod => {
      await makePost("/foo");
      expect(getMethod()).toEqual("POST");
    })
  ));

  test("makePatch", () => (
    withServer(async getMethod => {
      await makePatch("/foo");
      expect(getMethod()).toEqual("PATCH");
    })
  ));

  test("makeDelete", () => (
    withServer(async getMethod => {
      await makeDelete("/foo");
      expect(getMethod()).toEqual("DELETE");
    })
  ));
});
