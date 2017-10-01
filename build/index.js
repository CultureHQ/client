/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _store = __webpack_require__(3);

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
  getToken: function getToken() {
    return _store2.default.get(state.storeKey);
  },

  isSignedIn: function isSignedIn() {
    return state.getToken() !== undefined;
  },

  signIn: function signIn(token) {
    _store2.default.set(state.storeKey, token);
  },

  signOut: function signOut() {
    _store2.default.clearAll();
  },

  storeKey: "token"
};

exports.default = state;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _network = __webpack_require__(5);

var _network2 = _interopRequireDefault(_network);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (options) {
  return function (actualParams) {
    if ((typeof actualParams === "undefined" ? "undefined" : _typeof(actualParams)) !== "object") {
      actualParams = {};
    }

    Object.keys(actualParams).forEach(function (param) {
      var needle = ":" + param;
      if (options.path.indexOf(needle) !== -1) {
        options.path = options.path.replace(needle, actualParams[param]);
        delete actualParams[param];
      }
    });

    if (typeof options.expectedParams !== "undefined") {
      options.expectedParams.forEach(function (param) {
        if (!actualParams.hasOwnProperty(param)) {
          throw new Error("Required parameter " + param + " not given");
        }
      });
    }

    return _network2.default[options.method](options.path, {
      token: _state2.default.getToken(),
      params: actualParams
    });
  };
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _event = __webpack_require__(4);

var _event2 = _interopRequireDefault(_event);

var _organization = __webpack_require__(9);

var _organization2 = _interopRequireDefault(_organization);

var _user = __webpack_require__(10);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CultureHQ = {
  isSignedIn: function isSignedIn() {
    return _state2.default.isSignedIn();
  },

  signOut: function signOut() {
    _state2.default.signOut();
  }
};

(0, _event2.default)(CultureHQ);

(0, _organization2.default)(CultureHQ);

(0, _user2.default)(CultureHQ);

if (window) {
  window.CultureHQ = CultureHQ;
}

exports.default = CultureHQ;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("store/dist/store.modern");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apiCall = __webpack_require__(1);

var _apiCall2 = _interopRequireDefault(_apiCall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createRSVPCall = (0, _apiCall2.default)({
  method: "post",
  path: "/events/:eventId/rsvps",
  expectedParams: ["responseType"],
  optionalParams: ["extra"]
});

exports.default = function (object) {
  return Object.assign(object, {
    createEvent: (0, _apiCall2.default)({
      method: "post",
      path: "/events",
      expectedParams: ["name", "details", "startsAt", "endsAt", "eventType"],
      optionalParams: ["sponsored"]
    }),

    createRSVP: function createRSVP(params) {
      var responseTypes = ["declined", "interested", "accepted"];
      if (responseTypes.indexOf(params.responseType) === -1) {
        throw new Error("responseType parameter must be one of " + responseTypes.join(", "));
      }
      return createRSVPCall(params);
    },

    getEvent: (0, _apiCall2.default)({ method: "get", path: "/events/:eventId" }),

    listEvents: (0, _apiCall2.default)({ method: "get", path: "/events" }),

    listUserEvents: (0, _apiCall2.default)({ method: "get", path: "/users/:userId/events" })
  });
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFetch = __webpack_require__(7);

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _stringCase = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiHost = void 0;

if (process.env.NODE_ENV === "production") {
  apiHost = "https://api.culturehq.net";
} else {
  apiHost = "http://localhost:3000";
}

var buildRequest = function buildRequest(method, path, options) {
  var url = new URL("" + apiHost + path);
  var reqOptions = {
    headers: { "Content-Type": "application/json" }
  };

  if (typeof options.token === "string" && options.token.length) {
    reqOptions.headers["Authorization"] = "token " + options.token;
  }

  if (method === "GET") {
    var params = (0, _stringCase.snakerize)(options.params);
    Object.keys(params).forEach(function (key) {
      return url.searchParams.append(key, params[key]);
    });
  } else {
    reqOptions.method = method;
    reqOptions.body = JSON.stringify((0, _stringCase.snakerize)(options.params));
  }

  return { url: url.href, options: reqOptions };
};

var sendRequest = function sendRequest(method, path, options) {
  var request = buildRequest(method, path, options);

  return new Promise(function (resolve, reject) {
    (0, _nodeFetch2.default)(request.url, request.options).then(function (response) {
      if (Math.round(response.status / 200) === 1) {
        response.json().then(function (json) {
          return resolve((0, _stringCase.camelize)(json));
        }).catch(function (error) {
          return reject(error);
        });
      } else {
        reject(response.statusText);
      }
    }).catch(function (error) {
      return reject(error);
    });
  });
};

exports.default = {
  delete: function _delete(path, options) {
    return sendRequest("DELETE", path, options);
  },
  get: function get(path, options) {
    return sendRequest("GET", path, options);
  },
  patch: function patch(path, options) {
    return sendRequest("PATCH", path, options);
  },
  post: function post(path, options) {
    return sendRequest("POST", path, options);
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Convert from lower_snake_case to lowerCamelCase
var camelizeString = function camelizeString(string) {
  var pattern = /_([a-z])/;
  var match = void 0;

  while ((match = pattern.exec(string)) !== null) {
    string = string.replace(match[0], match[1].toUpperCase());
  }
  return string;
};

// Convert from lowerCamelCase to lower_snake_case
var snakerizeString = function snakerizeString(string) {
  var pattern = /([A-Z])/;
  var match = void 0;

  while ((match = pattern.exec(string)) !== null) {
    string = string.replace(match[0], "_" + match[1].toLowerCase());
  }
  return string;
};

var modifyKeys = function modifyKeys(object, stringFunc) {
  if ((typeof object === "undefined" ? "undefined" : _typeof(object)) !== "object" || object === null) {
    return object;
  }

  var modified = {};
  var value = void 0;

  Object.keys(object).forEach(function (key) {
    value = object[key];
    if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object") {
      value = modifyKeys(value, stringFunc);
    }
    modified[stringFunc(key)] = value;
  });
  return modified;
};

var camelize = function camelize(object) {
  return modifyKeys(object, camelizeString);
};
var snakerize = function snakerize(object) {
  return modifyKeys(object, snakerizeString);
};
exports.camelize = camelize;
exports.snakerize = snakerize;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apiCall = __webpack_require__(1);

var _apiCall2 = _interopRequireDefault(_apiCall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (object) {
  return Object.assign(object, {
    createOrganization: (0, _apiCall2.default)({
      method: "post",
      path: "/admin/organizations",
      expectedParams: ["name"]
    }),

    deleteOrganization: (0, _apiCall2.default)({
      method: "delete",
      path: "/admin/organizations/:orgId"
    }),

    getOrganization: (0, _apiCall2.default)({
      method: "get",
      path: "/admin/organizations/:orgId"
    }),

    listOrganizations: (0, _apiCall2.default)({ method: "get", path: "/admin/organizations" }),

    updateOrganization: (0, _apiCall2.default)({
      method: "patch",
      path: "/admin/organizations/:orgId",
      expectedParams: ["name"]
    })
  });
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apiCall = __webpack_require__(1);

var _apiCall2 = _interopRequireDefault(_apiCall);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signInCall = (0, _apiCall2.default)({
  method: "post",
  path: "/api_keys",
  expectedParams: ["email", "password"]
});

exports.default = function (object) {
  return Object.assign(object, {
    changePassword: (0, _apiCall2.default)({
      method: "patch",
      path: "/password",
      expectedParams: ["password"]
    }),

    getProfile: (0, _apiCall2.default)({ method: "get", path: "/profile" }),

    getUser: (0, _apiCall2.default)({ method: "get", path: "/users/:userId" }),

    registerUser: (0, _apiCall2.default)({
      method: "post",
      path: "/invites/:token/users",
      expectedParams: ["name", "email", "password"]
    }),

    sendInvite: (0, _apiCall2.default)({
      method: "post",
      path: "/invites",
      expectedParams: ["email"]
    }),

    signIn: function signIn(params) {
      return signInCall(params).then(function (response) {
        _state2.default.signIn(response.apiKey.token);
        return response;
      });
    }
  });
};

/***/ })
/******/ ]);