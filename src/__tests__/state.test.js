import { setToken, isSimulating, startUserSimulation } from "../client";
import state from "../state";

const { clear, clearSimulationToken, setSimulationToken } = state;

test("isSimulating returns true when simulation is occurring", () => {
  setToken("foo");
  expect(isSimulating()).toBe(false);

  setSimulationToken("bar");
  expect(isSimulating()).toBe(true);

  clearSimulationToken();
  expect(isSimulating()).toBe(false);

  clear();
});

test("startUserSimulation throws an error when you're not logged in", () => {
  expect(() => startUserSimulation({ userId: 5 })).toThrow("Cannot simulate");
});
