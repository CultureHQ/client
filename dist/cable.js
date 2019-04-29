"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onUserActivityCreated = exports.onRecognitionCreated = exports.onNotificationReceived = exports.onLeaderboardUpdated = exports.onEventStarting = exports.disconnect = void 0;

var _actioncable = _interopRequireDefault(require("actioncable"));

var _constants = require("./constants");

var _state = _interopRequireDefault(require("./state"));

var _stringCase = require("./stringCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var consumer = null;

var getEndpoint = function getEndpoint() {
  var _API_HOST$split = _constants.API_HOST.split("://"),
      _API_HOST$split2 = _slicedToArray(_API_HOST$split, 2),
      protocol = _API_HOST$split2[0],
      host = _API_HOST$split2[1];

  var wsProtocol = protocol === "https" ? "wss" : "ws";
  return "".concat(wsProtocol, "://").concat(host, "/cable/").concat(_state["default"].getToken());
};

var getConsumer = function getConsumer() {
  if (!consumer) {
    consumer = _actioncable["default"].createConsumer(getEndpoint());
  }

  return consumer;
};
/**
 * There are a few functions on the client that will establish a WebSocket
 * connection and call a callback function when data is received. For these
 * functions, in order to avoid leaking memory, it's important to ensure that
 * when you're done with the subscription (for instance when the component
 * containing it is unmounted) that you call `unsubscribe` on the subscription
 * object. An example with React of using these functions is below:
 *
 *     import { onNotificationReceived } from "@culturehq/client";
 *
 *     class MyComponent {
 *       state = { lastNotification: null };
 *
 *       componentDidMount() {
 *         this.subscription = onNotificationReceived(notification => {
 *           this.setState({ lastNotification: notification });
 *         });
 *       }
 *
 *       componentWillUnmount() {
 *         if (this.subscription) {
 *           this.subscription.unsubscribe();
 *         }
 *       }
 *
 *       render() {
 *         const { lastNotification } = this.state;
 *
 *         return <span>{lastNotification}<span>;
 *       }
 *     }
 */


var subscribe = function subscribe(channel) {
  return function (callback) {
    return getConsumer().subscriptions.create(channel, {
      received: function received(data) {
        return callback((0, _stringCase.camelize)(data));
      }
    });
  };
};

var disconnect = function disconnect() {
  if (consumer) {
    consumer.disconnect();
    consumer = null;
  }
};

exports.disconnect = disconnect;
var onEventStarting = subscribe("EventStartingChannel");
exports.onEventStarting = onEventStarting;
var onLeaderboardUpdated = subscribe("LeaderboardChannel");
exports.onLeaderboardUpdated = onLeaderboardUpdated;
var onNotificationReceived = subscribe("NotificationChannel");
exports.onNotificationReceived = onNotificationReceived;
var onRecognitionCreated = subscribe("RecognitionChannel");
exports.onRecognitionCreated = onRecognitionCreated;
var onUserActivityCreated = subscribe("UserActivityChannel");
exports.onUserActivityCreated = onUserActivityCreated;