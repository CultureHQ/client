"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Convert from lower_snake_case to lowerCamelCase
var camelizeString = function camelizeString(string) {
  var pattern = /_([a-z])/;

  var camelized = string;
  var match = pattern.exec(camelized);

  while (match !== null) {
    camelized = camelized.replace(match[0], match[1].toUpperCase());
    match = pattern.exec(camelized);
  }

  return camelized;
};

// Convert from lowerCamelCase to lower_snake_case
var snakerizeString = function snakerizeString(string) {
  var pattern = /([A-Z])/;

  var snakerized = string;
  var match = pattern.exec(snakerized);

  while (match !== null) {
    snakerized = snakerized.replace(match[0], "_" + match[1].toLowerCase());
    match = pattern.exec(snakerized);
  }

  return snakerized;
};

var shouldRecurse = function shouldRecurse(value) {
  return value && (value.toString() === "[object Object]" || Array.isArray(value));
};

var modifyKeys = function modifyKeys(object, stringFunc) {
  // If the node is not an object or is null, return the original object since
  // we don't need to modify its keys.
  if ((typeof object === "undefined" ? "undefined" : _typeof(object)) !== "object" || object === null) {
    return object;
  }

  // For arrays, loop through each elemenet and modify as necessary.
  if (Array.isArray(object)) {
    return object.map(function (element) {
      return modifyKeys(element, stringFunc);
    });
  }

  // For other objects, ensure they have at least one key returned from
  // Object.keys. This (should) ensure that we're only processing objects that
  // were constructed from object literals, as opposed to Blob or File objects.
  if (!Object.keys(object).length) {
    return object;
  }

  var modified = {};
  var value = void 0;

  Object.keys(object).forEach(function (key) {
    value = object[key];
    if (shouldRecurse(value)) {
      value = modifyKeys(value, stringFunc);
    }
    modified[stringFunc(key)] = value;
  });

  return modified;
};

var camelize = function camelize(object) {
  return modifyKeys(object, camelizeString);
};
var snakerize = function snakerize(object) {
  return modifyKeys(object, snakerizeString);
};

exports.camelize = camelize;
exports.snakerize = snakerize;