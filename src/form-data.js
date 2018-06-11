const valueFor = object => {
  if (object === undefined || object === null) {
    return "";
  }

  return object;
};

const formData = params => {
  const result = new FormData();

  Object.keys(params).forEach(key => {
    if (!Array.isArray(params[key])) {
      result.append(key, valueFor(params[key]));
    } else if (params[key].length) {
      params[key].forEach(value => result.append(`${key}[]`, value));
    } else {
      result.append(`${key}[]`, "");
    }
  });

  return result;
};

export default formData;
