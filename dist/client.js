"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actioncable = require("actioncable");

var _actioncable2 = _interopRequireDefault(_actioncable);

var _apiCalls = require("./api-calls");

var _apiCalls2 = _interopRequireDefault(_apiCalls);

var _autoPaginator = require("./auto-paginator");

var _autoPaginator2 = _interopRequireDefault(_autoPaginator);

var _constants = require("./constants");

var _state = require("./state");

var _state2 = _interopRequireDefault(_state);

var _signUpload = require("./sign-upload");

var _signUpload2 = _interopRequireDefault(_signUpload);

var _stringCase = require("./string-case");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * An object for handling the connection to and querying of the CultureHQ API.
 * Mostly everything is represented in the `calls.json` file, as every call
 * listed in that file represents a member function on this class.
 *
 * == API call semantics ==
 *
 * Every API call function returns a `Promise` object. You can call them with
 * normal `Promise` semantics, as in below:
 *
 *     const getProfile = () => {
 *       client.getProfile().then(response => {
 *         console.log(response);
 *       }).catch(error => {
 *         console.error(error);
 *       });
 *     };
 *
 * or you can use `async`/`await` syntax, as in below:
 *
 *     const getProfile = async () => {
 *       try {
 *         const response = await client.getProfile();
 *         console.log(response);
 *       } catch (error) {
 *         console.error(error);
 *       }
 *     };
 *
 * == Pagination ==
 *
 * Almost every one of the `list*` events is paginated, and will return
 * pagination metadata along with the actual data of the call. The `pagination`
 * object will look like:
 *
 *     { currentPage, totalPages, totalCount }
 *
 * You can handle this pagination manually, e.g., links on the bottom of the
 * page. Alternatively, you can use the client's built-in automatic pagination
 * capabilities. You prefix your API call with a call to `autoPaginate`, as in
 * the following example:
 *
 *     const { events } = await client.autoPaginate("events").listEvents();
 *
 * This will return the pagination information as normal, but the events will
 * be concatenated together.
 *
 * == WebSocket connection semantics ==
 *
 * There are a few functions on the client that will establish a WebSocket
 * connection and call a callback function when data is received. For these
 * functions, in order to avoid leaking memory, it's important to ensure that
 * when you're done with the subscription (for instance when the component
 * containing it is unmounted) that you call `unsubscribe` on the subscription
 * object. An example with React of using these functions is below:
 *
 *     class MyComponent {
 *       state = { lastNotification: null };
 *
 *       componentDidMount() {
 *         this.subscription = client.onNotificationReceived(notification => {
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
var client = _extends({
  consumer: null,

  endUserSimulation: function endUserSimulation() {
    _state2.default.endSimulation();
    client.disconnectConsumer();
  },

  isSignedIn: function isSignedIn() {
    return _state2.default.isSignedIn();
  },

  isSimulating: function isSimulating() {
    return _state2.default.isSimulating();
  },

  onLeaderboardUpdated: function onLeaderboardUpdated(callback) {
    return client.subscribeToChannel("LeaderboardChannel", callback);
  },

  onNotificationReceived: function onNotificationReceived(callback) {
    return client.subscribeToChannel("NotificationChannel", callback);
  },

  onRecognitionCreated: function onRecognitionCreated(callback) {
    return client.subscribeToChannel("RecognitionChannel", callback);
  },

  onUserActivityCreated: function onUserActivityCreated(callback) {
    return client.subscribeToChannel("UserActivityChannel", callback);
  },

  setToken: function setToken(token) {
    return _state2.default.signIn(token);
  },

  signIn: function signIn(params) {
    return client.createApiKey(params).then(function (response) {
      _state2.default.signIn(response.apiKey.token);
      return response;
    });
  },

  signOut: function signOut() {
    return client.deleteSession().then(function (response) {
      _state2.default.signOut();
      client.disconnectConsumer();
      return response;
    });
  },

  signUpload: _signUpload2.default,

  startUserSimulation: function startUserSimulation(params) {
    return client.createSimulation(params).then(function (response) {
      _state2.default.startSimulation(response.apiKey.token);
      client.disconnectConsumer();
      return response;
    });
  },

  autoPaginate: function autoPaginate(dataType) {
    return new _autoPaginator2.default(dataType);
  },

  disconnectConsumer: function disconnectConsumer() {
    if (client.consumer) {
      client.consumer.disconnect();
      client.consumer = null;
    }
  },

  ensureConsumer: function ensureConsumer() {
    if (client.consumer) {
      return client.consumer;
    }

    var _API_HOST$split = _constants.API_HOST.split("://"),
        _API_HOST$split2 = _slicedToArray(_API_HOST$split, 2),
        protocol = _API_HOST$split2[0],
        host = _API_HOST$split2[1];

    var wsProtocol = protocol === "https" ? "wss" : "ws";
    var endpoint = wsProtocol + "://" + host + "/cable/" + _state2.default.getToken();

    client.consumer = _actioncable2.default.createConsumer(endpoint);
    return client.consumer;
  },

  subscribeToChannel: function subscribeToChannel(channel, callback) {
    return client.ensureConsumer().subscriptions.create(channel, {
      received: function received(data) {
        return callback((0, _stringCase.camelize)(data));
      }
    });
  }

}, _apiCalls2.default);

exports.default = client;