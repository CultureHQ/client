const camelizeString = string => {
  const pattern = /_([a-z])/;
  let match;

  while ((match = pattern.exec(string)) !== null) {
    string = string.replace(match[0], match[1].toUpperCase());
  }
  return string;
};

const camelizeKeys = object => {
  let camelized = {};
  let value;

  Object.keys(object).forEach(key => {
    value = object[key];
    if (typeof value === "object") {
      value = camelizeKeys(value);
    }
    camelized[camelizeString(key)] = value;
  });
  return camelized;
};

export default camelizeKeys;
