const constants = {
  API_HOST: {
    production: JSON.stringify("https://api.culturehq.net"),
    development: JSON.stringify("http://localhost:3000"),
    test: "http://localhost:8080"
  }
};

constants.for = environment => {
  const envConstants = {};

  Object.keys(constants).forEach(key => {
    if (key !== "for") {
      envConstants[key] = constants[key][environment];
    }
  });

  return envConstants;
};

module.exports = constants;
