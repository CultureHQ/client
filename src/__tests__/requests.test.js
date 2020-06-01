import testServer from "./testServer";
import { makeGet, makePost, makePatch, makeDelete } from "../requests";

describe("requests", () => {
  const getMethod = () => testServer.requests[testServer.requests.length - 1].method;

  test("makeGet", async () => {
    testServer.mock({ status: 200 });
    await makeGet("/foo");
    expect(getMethod()).toEqual("GET");
  });

  test("makePost", async () => {
    testServer.mock({ status: 200 });
    await makePost("/foo");
    expect(getMethod()).toEqual("POST");
  });

  test("makePatch", async () => {
    testServer.mock({ status: 200 });
    await makePatch("/foo");
    expect(getMethod()).toEqual("PATCH");
  });

  test("makeDelete", async () => {
    testServer.mock({ status: 200 });
    await makeDelete("/foo");
    expect(getMethod()).toEqual("DELETE");
  });
});
