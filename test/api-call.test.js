import apiCall from "../src/api-call";

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
  const call = apiCall(["GET", "/users/:userId"]);

  expect(call({ userId: 5 })).toEqual({
    method: "GET",
    url: new URL("http://localhost:8080/users/5"),
    token: "token",
    simulation: "simulation",
    params: {},
    multipart: false
  });
});

test("raises errors when expected parameters aren't given", () => {
  const call = apiCall(["POST", "/interests", ["name"]]);

  expect(() => call()).toThrowError("Expected parameter");
});

test("attaches metadata to the calls", () => {
  const call = apiCall(["POST", "/interests", ["name"]]);

  expect(call.method).toEqual("POST");
  expect(call.expectedParams).toEqual(["name"]);
});
