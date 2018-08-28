"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signOut = exports.signIn = exports.setToken = exports.isSignedIn = exports.getToken = void 0;

var _apiCalls = _interopRequireDefault(require("./api-calls"));

var _cable = require("./cable");

var _state = _interopRequireDefault(require("./state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createApiKey = _apiCalls.default.createApiKey,
    deleteSession = _apiCalls.default.deleteSession;
/**
 * Signed in state is handled through the client using the `signIn` and
 * `signOut` functions. These effectively act as normal API calls but with the
 * additional functionality of setting or clearing `localStorage` with the
 * returned API token.
 *
 * You can also manually set the API token by using the `setToken` named export.
 * This is especially useful if the token is fixed in some context (as in most
 * integrations).
 */

var getToken = _state.default.getToken,
    isSignedIn = _state.default.isSignedIn,
    setToken = _state.default.setToken;
exports.setToken = setToken;
exports.isSignedIn = isSignedIn;
exports.getToken = getToken;

var signIn = function signIn(params) {
  return createApiKey(params).then(function (response) {
    _state.default.setToken(response.apiKey.token);

    return response;
  });
};

exports.signIn = signIn;

var signOut = function signOut() {
  return deleteSession().then(function (response) {
    _state.default.clear();

    (0, _cable.disconnect)();
    return response;
  });
};

exports.signOut = signOut;