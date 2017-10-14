const constants = {
  API_HOST: {
    production: JSON.stringify("https://api.culturehq.net"),
    development: JSON.stringify("http://localhost:3000")
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

export default constants;
