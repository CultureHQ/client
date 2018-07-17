"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _actioncable = require("actioncable");

var _actioncable2 = _interopRequireDefault(_actioncable);

var _state = require("./state");

var _state2 = _interopRequireDefault(_state);

var _calls = require("./calls");

var _calls2 = _interopRequireDefault(_calls);

var _apiCall = require("./api-call");

var _apiCall2 = _interopRequireDefault(_apiCall);

var _stringCase = require("./string-case");

var _autoPaginator = require("./auto-paginator");

var _autoPaginator2 = _interopRequireDefault(_autoPaginator);

var _signUpload2 = require("./sign-upload");

var _signUpload3 = _interopRequireDefault(_signUpload2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CONFIG = {
  apiHost: "http://localhost:3000",
  awsAccessKeyId: null,
  signerUrl: "http://localhost:3001",
  uploadBucket: "http://localhost:3001"
};

/**
 * A class for handling the connection to and querying of the CultureHQ API.
 * Mostly everything is represented in the `calls.json` file, as every call
 * listed in that file represents a member function on this class.
 *
 * == API call semantics ==
 *
 * Every API call function returns a `Promise` object. You can call them with
 * normal `Promise` semantics, as in below:
 *
 *     const getProfile = () => {
 *       cultureHQ.getProfile().then(response => {
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
 *         const response = await cultureHQ.getProfile();
 *         console.log(response);
 *       } catch (error) {
 *         console.error(error);
 *       }
 *     };
 *
 * == Pagination ==
 *
 * Almost every one of the `list*` events is paginated, and will result
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
 *       state = { notification: null };
 *
 *       componentDidMount() {
 *         this.subscription = client.onNotificationReceived(notification => {
 *           this.setState({ notification });
 *         });
 *       }
 *
 *       componentWillUnmount() {
 *         if (this.subscription) {
 *           this.subscription.unsubscribe();
 *         }
 *       }
 *     }
 */

var CultureHQ = function () {
  function CultureHQ() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, CultureHQ);

    Object.keys(CONFIG).forEach(function (key) {
      _this[key] = options[key] || CONFIG[key];
    });

    Object.keys(_calls2.default).forEach(function (callName) {
      _this[callName] = (0, _apiCall2.default)(_this, _calls2.default[callName]);
    });
  }

  _createClass(CultureHQ, [{
    key: "endUserSimulation",
    value: function endUserSimulation() {
      _state2.default.endSimulation();
      this.disconnectConsumer();
    }
  }, {
    key: "isSignedIn",
    value: function isSignedIn() {
      /* eslint-disable-line class-methods-use-this */
      return _state2.default.isSignedIn();
    }
  }, {
    key: "isSimulating",
    value: function isSimulating() {
      /* eslint-disable-line class-methods-use-this */
      return _state2.default.isSimulating();
    }
  }, {
    key: "onLeaderboardUpdated",
    value: function onLeaderboardUpdated(callback) {
      return this.subscribeToChannel("LeaderboardChannel", callback);
    }
  }, {
    key: "onNotificationReceived",
    value: function onNotificationReceived(callback) {
      return this.subscribeToChannel("NotificationChannel", callback);
    }
  }, {
    key: "onRecognitionCreated",
    value: function onRecognitionCreated(callback) {
      return this.subscribeToChannel("RecognitionChannel", callback);
    }
  }, {
    key: "onUserActivityCreated",
    value: function onUserActivityCreated(callback) {
      return this.subscribeToChannel("UserActivityChannel", callback);
    }
  }, {
    key: "setToken",
    value: function setToken(token) {
      /* eslint-disable-line class-methods-use-this */
      _state2.default.signIn(token);
    }
  }, {
    key: "signIn",
    value: function signIn(params) {
      return this.createApiKey(params).then(function (response) {
        _state2.default.signIn(response.apiKey.token);
        return response;
      });
    }
  }, {
    key: "signOut",
    value: function signOut() {
      var _this2 = this;

      return this.deleteSession().then(function (response) {
        _state2.default.signOut();
        _this2.disconnectConsumer();
        return response;
      });
    }
  }, {
    key: "signUpload",
    value: function signUpload(file, onProgress) {
      return (0, _signUpload3.default)(this, file, onProgress);
    }
  }, {
    key: "startUserSimulation",
    value: function startUserSimulation(params) {
      var _this3 = this;

      return this.createSimulation(params).then(function (response) {
        _state2.default.startSimulation(response.apiKey.token);
        _this3.disconnectConsumer();
        return response;
      });
    }
  }, {
    key: "autoPaginate",
    value: function autoPaginate(dataType) {
      return new _autoPaginator2.default(this, dataType);
    }
  }, {
    key: "disconnectConsumer",
    value: function disconnectConsumer() {
      if (this.consumer) {
        this.consumer.disconnect();
        this.consumer = null;
      }
    }
  }, {
    key: "ensureConsumer",
    value: function ensureConsumer() {
      if (this.consumer) {
        return this.consumer;
      }

      var _apiHost$split = this.apiHost.split("://"),
          _apiHost$split2 = _slicedToArray(_apiHost$split, 2),
          protocol = _apiHost$split2[0],
          host = _apiHost$split2[1];

      var wsProtocol = protocol === "https" ? "wss" : "ws";

      var endpoint = wsProtocol + "://" + host + "/cable/" + _state2.default.getToken();
      this.consumer = _actioncable2.default.createConsumer(endpoint);
      return this.consumer;
    }
  }, {
    key: "subscribeToChannel",
    value: function subscribeToChannel(channel, callback) {
      return this.ensureConsumer().subscriptions.create(channel, {
        received: function received(data) {
          return callback((0, _stringCase.camelize)(data));
        }
      });
    }
  }]);

  return CultureHQ;
}();

exports.default = CultureHQ;