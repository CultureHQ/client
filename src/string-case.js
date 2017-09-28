// Convert from lower_snake_case to lowerCamelCase
const camelizeString = string => {
  const pattern = /_([a-z])/;
  let match;

  while ((match = pattern.exec(string)) !== null) {
    string = string.replace(match[0], match[1].toUpperCase());
  }
  return string;
};

// Convert from lowerCamelCase to lower_snake_case
const snakerizeString = string => {
  const pattern = /([A-Z])/;
  let match;

  while ((match = pattern.exec(string)) !== null) {
    string = string.replace(match[0], `_${match[1].toLowerCase()}`);
  }
  return string;
};

const modifyKeys = (object, stringFunc) => {
  let modified = {};
  let value;

  // If object is undefined/null
  if (typeof object == 'undefined' || object == null) return

  Object.keys(object).forEach(key => {
    value = object[key];
    if (typeof value === "object") {
      value = modifyKeys(value, stringFunc);
    }
    modified[stringFunc(key)] = value;
  });
  return modified;
};

const camelize = object => modifyKeys(object, camelizeString);
const snakerize = object => modifyKeys(object, snakerizeString);
export { camelize, snakerize };
