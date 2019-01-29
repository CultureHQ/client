"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apiCalls = _interopRequireDefault(require("./apiCalls"));

var _calls = _interopRequireDefault(require("./calls"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AutoPaginator =
/*#__PURE__*/
function () {
  function AutoPaginator(dataType) {
    _classCallCheck(this, AutoPaginator);

    this.dataType = dataType;
  }

  _createClass(AutoPaginator, [{
    key: "aggregate",
    value: function aggregate(call, options) {
      var _this = this;

      return call(_objectSpread({}, options, {
        page: 1
      })).then(function (response) {
        var totalPages = response.pagination.totalPages; // There's no need to make multiple calls if there is only one or zero
        // pages of results.

        if (totalPages <= 1) {
          return response;
        }

        var page;
        var promises = [];

        for (page = 2; page <= totalPages; page += 1) {
          promises.push(call(_objectSpread({}, options, {
            page: page
          })));
        } // Wait for every API call to resolve before proceeding (this allows all
        // of the requests to be executed in parallel)


        return Promise.all(promises).then(function (responses) {
          // Pull the data from the first request and all the rest of the requests
          // into one list
          var data = _toConsumableArray(response[_this.dataType]);

          for (page = 0; page <= totalPages - 2; page += 1) {
            data = [].concat(_toConsumableArray(data), _toConsumableArray(responses[page][_this.dataType]));
          }

          var aggregated = _objectSpread({}, response);

          aggregated[_this.dataType] = data;
          return aggregated;
        });
      });
    }
  }]);

  return AutoPaginator;
}();

Object.keys(_calls.default).forEach(function (callName) {
  /* eslint-disable-next-line func-names */
  AutoPaginator.prototype[callName] = function (options) {
    return this.aggregate(_apiCalls.default[callName], options);
  };
});
/**
 * Almost every one of the `list*` events is paginated, and will return
 * pagination metadata along with the actual data of the call. The `pagination`
 * object will look like:
 *
 *     { currentPage, totalPages, totalCount }
 *
 * You can handle this pagination manually, e.g., links on the bottom of the
 * page. You can also use the client's built-in automatic pagination
 * capabilities by using the `autoPaginate` named export, as in the following
 * example:
 *
 *     import { autoPaginate } from "@culturehq/client";
 *     const { events } = await autoPaginate("events").listEvents();
 *
 * This will return the pagination information as normal, but the events will
 * be concatenated together.
 */

var autoPaginate = function autoPaginate(dataType) {
  return new AutoPaginator(dataType);
};

var _default = autoPaginate;
exports.default = _default;