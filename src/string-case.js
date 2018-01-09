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

const shouldRecurse = value =>
  value && (value.toString() === "[object Object]" || Array.isArray(value));

const modifyKeys = (object, stringFunc) => {
  // If the node is not an object or is null, return the original object since
  // we don't need to modify its keys.
  if (typeof object !== "object" || object === null) {
    return object;
  }

  // For arrays, loop through each elemenet and modify as necessary.
  if (Array.isArray(object)) {
    return object.map(element => modifyKeys(element, stringFunc));
  }

  // For other objects, ensure they have at least one key returned from
  // Object.keys. This (should) ensure that we're only processing objects that
  // were constructed from object literals, as opposed to Blob or File objects.
  if (!Object.keys(object).length) {
    return object;
  }

  let modified = {};
  let value;

  Object.keys(object).forEach(key => {
    value = object[key];
    if (shouldRecurse(value)) {
      value = modifyKeys(value, stringFunc);
    }
    modified[stringFunc(key)] = value;
  });

  return modified;
};

const camelize = object => modifyKeys(object, camelizeString);
const snakerize = object => modifyKeys(object, snakerizeString);
export { camelize, snakerize };
