"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var valueFor = function valueFor(object) {
  if (object === undefined || object === null) {
    return "";
  }

  return object;
};

var formData = function formData(params) {
  var result = new FormData();

  Object.keys(params).forEach(function (key) {
    if (!Array.isArray(params[key])) {
      result.append(key, valueFor(params[key]));
    } else if (params[key].length) {
      params[key].forEach(function (value) {
        return result.append(key + "[]", value);
      });
    } else {
      result.append(key + "[]", "");
    }
  });

  return result;
};

exports.default = formData;