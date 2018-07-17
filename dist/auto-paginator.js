"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _calls = require("./calls");

var _calls2 = _interopRequireDefault(_calls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A class that wraps an API call and automatically concatenates the results
 * across multiple pages.
 */
var AutoPaginator = function () {
  function AutoPaginator(client, dataType) {
    _classCallCheck(this, AutoPaginator);

    this.client = client;
    this.dataType = dataType;
  }

  _createClass(AutoPaginator, [{
    key: "aggregate",
    value: function aggregate(callName, options) {
      var _this = this;

      return this.client[callName](_extends({}, options, { page: 1 })).then(function (response) {
        var totalPages = response.pagination.totalPages;

        // There's no need to make multiple calls if there is only one or zero
        // pages of results.

        if (totalPages <= 1) {
          return response;
        }

        var page = void 0;
        var promises = [];

        for (page = 2; page <= totalPages; page += 1) {
          promises.push(_this.client[callName](_extends({}, options, { page: page })));
        }

        // Wait for every API call to resolve before proceeding (this allows all
        // of the requests to be executed in parallel)
        return Promise.all(promises).then(function (responses) {
          // Pull the data from the first request and all the rest of the requests
          // into one list
          var data = [].concat(_toConsumableArray(response[_this.dataType]));
          for (page = 0; page <= totalPages - 2; page += 1) {
            data = [].concat(_toConsumableArray(data), _toConsumableArray(responses[page][_this.dataType]));
          }

          var aggregated = _extends({}, response);
          aggregated[_this.dataType] = data;

          return aggregated;
        });
      });
    }
  }]);

  return AutoPaginator;
}();

Object.keys(_calls2.default).forEach(function (callName) {
  /* eslint-disable-next-line func-names */
  AutoPaginator.prototype[callName] = function (options) {
    return this.aggregate(callName, options);
  };
});

exports.default = AutoPaginator;