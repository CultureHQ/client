"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.skipPreflightChecks = exports.onUserActivityCreated = exports.onRecognitionCreated = exports.onNotificationReceived = exports.onLeaderboardUpdated = exports.onEventStarting = exports.autoPaginate = exports.startUserSimulation = exports.endUserSimulation = exports.isSimulating = exports.signUpload = exports.signOut = exports.signIn = exports.setToken = exports.isSignedIn = exports.getToken = undefined;

var _signUpload = require("./sign-upload");

Object.defineProperty(exports, "signUpload", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_signUpload).default;
  }
});

var _autoPaginate = require("./auto-paginate");

Object.defineProperty(exports, "autoPaginate", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_autoPaginate).default;
  }
});

var _cable = require("./cable");

Object.defineProperty(exports, "onEventStarting", {
  enumerable: true,
  get: function get() {
    return _cable.onEventStarting;
  }
});
Object.defineProperty(exports, "onLeaderboardUpdated", {
  enumerable: true,
  get: function get() {
    return _cable.onLeaderboardUpdated;
  }
});
Object.defineProperty(exports, "onNotificationReceived", {
  enumerable: true,
  get: function get() {
    return _cable.onNotificationReceived;
  }
});
Object.defineProperty(exports, "onRecognitionCreated", {
  enumerable: true,
  get: function get() {
    return _cable.onRecognitionCreated;
  }
});
Object.defineProperty(exports, "onUserActivityCreated", {
  enumerable: true,
  get: function get() {
    return _cable.onUserActivityCreated;
  }
});

var _fetcher = require("./fetcher");

Object.defineProperty(exports, "skipPreflightChecks", {
  enumerable: true,
  get: function get() {
    return _fetcher.skipPreflightChecks;
  }
});

var _apiCalls = require("./api-calls");

var _apiCalls2 = _interopRequireDefault(_apiCalls);

var _state = require("./state");

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createApiKey = _apiCalls2.default.createApiKey,
    createSimulation = _apiCalls2.default.createSimulation,
    deleteSession = _apiCalls2.default.deleteSession;

/**
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
 */

exports.default = _apiCalls2.default;

/**
 * == State ==
 *
 * Signed in state is handled through the client using the `signIn` and
 * `signOut` functions. These effectively act as normal API calls but with the
 * additional functionality of setting or clearing `localStorage` with the
 * returned API token.
 *
 * You can also manually set the API token by using the `setToken` named export.
 * This is especially useful if the token is fixed in some context (as in most
 * integrations).
 */

var getToken = _state2.default.getToken,
    isSignedIn = _state2.default.isSignedIn,
    setToken = _state2.default.setToken;
exports.getToken = getToken;
exports.isSignedIn = isSignedIn;
exports.setToken = setToken;
var signIn = exports.signIn = function signIn(params) {
  return createApiKey(params).then(function (response) {
    _state2.default.setToken(response.apiKey.token);
    return response;
  });
};

var signOut = exports.signOut = function signOut() {
  return deleteSession().then(function (response) {
    _state2.default.clear();
    (0, _cable.disconnect)();
    return response;
  });
};

/**
 * == Upload signing ==
 *
 * To support faster uploading, we allow images to be uploaded directly to S3,
 * and then just send along the signed URL to the API for fetching. This allows
 * API servers to continue processing requests instead of waiting for the upload
 * to complete.
 *
 * To use this mechanism, call this function with a file object and it will
 * return a Promise that resolves to the URL of the file that was uploaded, as
 * in the following example:
 *
 *     import { signUpload } from "@culturehq/client";
 *
 *     signUpload(document.querySelector("#file").files[0]).then(url => {
 *       console.log(url);
 *     });
 */


/**
 * == Simulation ==
 *
 * If you're listed as a CultureHQ admin, you can simulate users for debugging
 * with read-only capabilities by using the `startUserSimulation` named export.
 * The corresponding end call is `endUserSimulation`, along with the check for
 * the current state which is `isSimulating`.
 */
var isSimulating = _state2.default.isSimulating;
exports.isSimulating = isSimulating;
var endUserSimulation = exports.endUserSimulation = function endUserSimulation() {
  _state2.default.clearSimulationToken();
  (0, _cable.disconnect)();
};

var startUserSimulation = exports.startUserSimulation = function startUserSimulation(params) {
  if (!_state2.default.isSignedIn()) {
    throw new Error("Cannot simulate unless you're already logged in.");
  }

  return createSimulation(params).then(function (response) {
    _state2.default.setSimulationToken(response.apiKey.token);
    (0, _cable.disconnect)();
    return response;
  });
};

/**
 * == Pagination ==
 *
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