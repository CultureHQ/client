import API_CALLS from "../src/api-calls";

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
  expect(API_CALLS.getUser({ userId: 5 })).toEqual({
    method: "GET",
    url: new URL("http://localhost:8080/users/5"),
    token: "token",
    simulation: "simulation",
    params: {},
    multipart: false
  });
});

test("raises errors when expected parameters aren't given", () => {
  expect(() => API_CALLS.createInterest()).toThrowError("Expected parameter");
});

test("attaches metadata to the calls", () => {
  const { createInterest } = API_CALLS;

  expect(createInterest.method).toEqual("POST");
  expect(createInterest.expectedParams).toEqual(["name"]);
});
