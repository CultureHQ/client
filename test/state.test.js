import state from "../src/state";

test("isSimulating returns true when simulation is occurring", () => {
  state.signIn("foo");
  expect(state.isSimulating()).toBe(false);

  state.startSimulation("bar");
  expect(state.isSimulating()).toBe(true);

  state.endSimulation();
  expect(state.isSimulating()).toBe(false);

  state.signOut();
});

test("startSimulation throws an error when you're not logged in", () => {
  expect(() => {
    state.startSimulation("foo");
  }).toThrow();
});
