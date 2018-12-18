import { camelize, snakerize } from "../src/stringCase";

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

test("snakerizes the keys of basic objects", () => {
  const object = {
    alphaBeta: "gamma",
    deltaEpsilon: "zeta",
    eta: "iota"
  };

  expect(snakerize(object)).toEqual({
    alpha_beta: "gamma",
    delta_epsilon: "zeta",
    eta: "iota"
  });
});

test("handle arrays properly", () => {
  const object = {
    alphaBeta: [
      {
        gammaDelta: "epsilon"
      },
      {
        zetaEta: "iota"
      }
    ]
  };

  expect(snakerize(object)).toEqual({
    alpha_beta: [
      {
        gamma_delta: "epsilon"
      },
      {
        zeta_eta: "iota"
      }
    ]
  });
});

test("handles null or undefined objects", () => {
  expect(snakerize(null)).toEqual(null);
  expect(snakerize(undefined)).toEqual(undefined);
});

test("does not attempt to modify non-simple objects", () => {
  class Foobar {}
  const foobar = new Foobar();
  expect(snakerize(foobar)).toEqual(foobar);
});

test("handles nested null", () => {
  expect(snakerize({ alphaBeta: null })).toEqual({ alpha_beta: null });
});
