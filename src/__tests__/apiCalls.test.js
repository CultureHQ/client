import client from "../client";

const { getUser, createInterest } = client;

jest.mock("../state", () => ({
  getToken: () => "token",
  getSimulationToken: () => "simulation"
}));

jest.mock("../performRequest", () => (method, url, options) => {
  const { token, simulation, params } = options;

  return {
    method, url, token, simulation, params
  };
});

test("builds api calls from options", () => {
  expect(getUser({ userId: 5 })).toEqual({
    method: "GET",
    url: new URL("http://localhost:8080/users/5"),
    token: "token",
    simulation: "simulation",
    params: {}
  });
});

test("raises errors when expected parameters aren't given", () => {
  expect(() => createInterest()).toThrowError("Expected parameter");
});

test("attaches metadata to the calls", () => {
  expect(createInterest.method).toEqual("POST");
  expect(createInterest.expectedParams).toEqual(["name"]);
});

test("you can reuse params without fearing mutation", () => {
  const options = { userId: 5 };

  expect(getUser(options).url).toEqual(new URL("http://localhost:8080/users/5"));

  expect(options.userId).toEqual(5);
});
