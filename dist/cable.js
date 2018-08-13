"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onUserActivityCreated = exports.onRecognitionCreated = exports.onNotificationReceived = exports.onLeaderboardUpdated = exports.onEventStarting = exports.disconnect = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _actioncable = require("actioncable");

var _actioncable2 = _interopRequireDefault(_actioncable);

var _constants = require("./constants");

var _state = require("./state");

var _state2 = _interopRequireDefault(_state);

var _stringCase = require("./string-case");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var consumer = null;

var getEndpoint = function getEndpoint() {
  var _API_HOST$split = _constants.API_HOST.split("://"),
      _API_HOST$split2 = _slicedToArray(_API_HOST$split, 2),
      protocol = _API_HOST$split2[0],
      host = _API_HOST$split2[1];

  var wsProtocol = protocol === "https" ? "wss" : "ws";
  return wsProtocol + "://" + host + "/cable/" + _state2.default.getToken();
};

var getConsumer = function getConsumer() {
  if (!consumer) {
    consumer = _actioncable2.default.createConsumer(getEndpoint());
  }
  return consumer;
};

var subscribe = function subscribe(channel) {
  return function (callback) {
    return getConsumer().subscriptions.create(channel, {
      received: function received(data) {
        return callback((0, _stringCase.camelize)(data));
      }
    });
  };
};

var disconnect = exports.disconnect = function disconnect() {
  if (consumer) {
    consumer.disconnect();
    consumer = null;
  }
};

var onEventStarting = exports.onEventStarting = subscribe("EventStartingChannel");

var onLeaderboardUpdated = exports.onLeaderboardUpdated = subscribe("LeaderboardChannel");

var onNotificationReceived = exports.onNotificationReceived = subscribe("NotificationChannel");

var onRecognitionCreated = exports.onRecognitionCreated = subscribe("RecognitionChannel");

var onUserActivityCreated = exports.onUserActivityCreated = subscribe("UserActivityChannel");