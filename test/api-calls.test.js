import client from "../src/client";

const { getUser, createInterest } = client;

jest.mock("../src/state", () => ({
  getToken: () => "token",
  getSimulationToken: () => "simulation"
}));

jest.mock("../src/request", () => (method, url, options) => {
  const {
    token,
    simulation,
    params,
    multipart
  } = options;

  return {
    method,
    url,
    token,
    simulation,
    params,
    multipart
  };
});

test("builds api calls from options", () => {
  expect(getUser({ userId: 5 })).toEqual({
    method: "GET",
    url: new URL("http://localhost:8080/users/5"),
    token: "token",
    simulation: "simulation",
    params: {},
    multipart: false
  });
});

test("raises errors when expected parameters aren't given", () => {
  expect(() => createInterest()).toThrowError("Expected parameter");
});

test("attaches metadata to the calls", () => {
  expect(createInterest.method).toEqual("POST");
  expect(createInterest.expectedParams).toEqual(["name"]);
});
