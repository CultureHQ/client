import camelize from "../src/camelize";

test("camelizes the keys of basic objects", () => {
  const object = {
    alpha_beta: "gamma",
    delta_epsilon: "zeta",
    eta: "iota"
  };

  expect(camelize(object)).toEqual({
    alphaBeta: "gamma",
    deltaEpsilon: "zeta",
    eta: "iota"
  });
});

test("camelizes the keys of deeply nested objects", () => {
  const object = {
    alpha_beta: {
      gamma_delta: {
        epsilon_zeta: "eta",
        iota: "kappa"
      }
    }
  };

  expect(camelize(object)).toEqual({
    alphaBeta: {
      gammaDelta: {
        epsilonZeta: "eta",
        iota: "kappa"
      }
    }
  });
});
