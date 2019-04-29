"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  getToken: true,
  isSignedIn: true,
  setToken: true,
  signIn: true,
  signOut: true,
  signUpload: true,
  isSimulating: true,
  endUserSimulation: true,
  startUserSimulation: true,
  autoPaginate: true,
  onEventStarting: true,
  onLeaderboardUpdated: true,
  onNotificationReceived: true,
  onRecognitionCreated: true,
  onUserActivityCreated: true,
  skipPreflightChecks: true
};
Object.defineProperty(exports, "getToken", {
  enumerable: true,
  get: function get() {
    return _signInState.getToken;
  }
});
Object.defineProperty(exports, "isSignedIn", {
  enumerable: true,
  get: function get() {
    return _signInState.isSignedIn;
  }
});
Object.defineProperty(exports, "setToken", {
  enumerable: true,
  get: function get() {
    return _signInState.setToken;
  }
});
Object.defineProperty(exports, "signIn", {
  enumerable: true,
  get: function get() {
    return _signInState.signIn;
  }
});
Object.defineProperty(exports, "signOut", {
  enumerable: true,
  get: function get() {
    return _signInState.signOut;
  }
});
Object.defineProperty(exports, "signUpload", {
  enumerable: true,
  get: function get() {
    return _signUpload["default"];
  }
});
Object.defineProperty(exports, "isSimulating", {
  enumerable: true,
  get: function get() {
    return _simulation.isSimulating;
  }
});
Object.defineProperty(exports, "endUserSimulation", {
  enumerable: true,
  get: function get() {
    return _simulation.endUserSimulation;
  }
});
Object.defineProperty(exports, "startUserSimulation", {
  enumerable: true,
  get: function get() {
    return _simulation.startUserSimulation;
  }
});
Object.defineProperty(exports, "autoPaginate", {
  enumerable: true,
  get: function get() {
    return _autoPaginate["default"];
  }
});
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
Object.defineProperty(exports, "skipPreflightChecks", {
  enumerable: true,
  get: function get() {
    return _fetcher.skipPreflightChecks;
  }
});
exports["default"] = void 0;

var _apiCalls = _interopRequireDefault(require("./apiCalls"));

var _signInState = require("./signInState");

var _signUpload = _interopRequireDefault(require("./signUpload"));

var _simulation = require("./simulation");

var _autoPaginate = _interopRequireDefault(require("./autoPaginate"));

var _cable = require("./cable");

var _fetcher = require("./fetcher");

var _requests = require("./requests");

Object.keys(_requests).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _requests[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _apiCalls["default"];
exports["default"] = _default;