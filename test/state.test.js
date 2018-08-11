import state from "../src/state";

test("isSimulating returns true when simulation is occurring", () => {
  state.setToken("foo");
  expect(state.isSimulating()).toBe(false);

  state.setSimulationToken("bar");
  expect(state.isSimulating()).toBe(true);

  state.clearSimulationToken();
  expect(state.isSimulating()).toBe(false);

  state.clear();
});

test("startSimulation throws an error when you're not logged in", () => {
  expect(() => state.startSimulation("foo")).toThrow();
});
