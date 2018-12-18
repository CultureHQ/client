"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
        return result.append("".concat(key, "[]"), value);
      });
    } else {
      result.append("".concat(key, "[]"), "");
    }
  });
  return result;
};

var _default = formData;
exports.default = _default;