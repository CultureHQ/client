(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("store/dist/store.modern"), require("node-fetch"));
	else if(typeof define === 'function' && define.amd)
		define(["store/dist/store.modern", "node-fetch"], factory);
	else if(typeof exports === 'object')
		exports["CultureHQClient"] = factory(require("store/dist/store.modern"), require("node-fetch"));
	else
		root["CultureHQClient"] = factory(root["store/dist/store.modern"], root["node-fetch"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_7__) {
return /******/ (function(modules) { // webpackBootstrap
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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _network = __webpack_require__(6);

var _network2 = _interopRequireDefault(_network);

var _state = __webpack_require__(1);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (options) {
  var apiCall = function apiCall(actualParams) {
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
          throw new Error("Expected parameter " + param + " not given");
        }
      });
    }

    return _network2.default[options.method](options.path, {
      token: _state2.default.getToken(),
      params: actualParams
    });
  };

  Object.assign(apiCall, options);
  return apiCall;
};

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = __webpack_require__(1);

var _state2 = _interopRequireDefault(_state);

var _caller = __webpack_require__(4);

var _caller2 = _interopRequireDefault(_caller);

var _apiCall = __webpack_require__(0);

var _apiCall2 = _interopRequireDefault(_apiCall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signInCallOptions = {
  method: "post",
  path: "/api_keys",
  expectedParams: ["email", "password"]
};

var CultureHQ = (0, _caller2.default)({
  isSignedIn: function isSignedIn() {
    return _state2.default.isSignedIn();
  },

  signIn: function signIn(params) {
    return (0, _apiCall2.default)(signInCallOptions)(params).then(function (response) {
      _state2.default.signIn(response.apiKey.token);
      return response;
    });
  },

  signOut: function signOut() {
    _state2.default.signOut();
  }
});

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

var _analytics = __webpack_require__(5);

var _analytics2 = _interopRequireDefault(_analytics);

var _announcement = __webpack_require__(9);

var _announcement2 = _interopRequireDefault(_announcement);

var _comment = __webpack_require__(10);

var _comment2 = _interopRequireDefault(_comment);

var _department = __webpack_require__(11);

var _department2 = _interopRequireDefault(_department);

var _event = __webpack_require__(12);

var _event2 = _interopRequireDefault(_event);

var _expense = __webpack_require__(13);

var _expense2 = _interopRequireDefault(_expense);

var _feedback = __webpack_require__(14);

var _feedback2 = _interopRequireDefault(_feedback);

var _interest = __webpack_require__(15);

var _interest2 = _interopRequireDefault(_interest);

var _invite = __webpack_require__(16);

var _invite2 = _interopRequireDefault(_invite);

var _organization = __webpack_require__(17);

var _organization2 = _interopRequireDefault(_organization);

var _password = __webpack_require__(18);

var _password2 = _interopRequireDefault(_password);

var _redemption = __webpack_require__(19);

var _redemption2 = _interopRequireDefault(_redemption);

var _reward = __webpack_require__(20);

var _reward2 = _interopRequireDefault(_reward);

var _user = __webpack_require__(21);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (object) {
  (0, _analytics2.default)(object);
  (0, _announcement2.default)(object);
  (0, _comment2.default)(object);
  (0, _department2.default)(object);
  (0, _event2.default)(object);
  (0, _expense2.default)(object);
  (0, _feedback2.default)(object);
  (0, _interest2.default)(object);
  (0, _invite2.default)(object);
  (0, _organization2.default)(object);
  (0, _password2.default)(object);
  (0, _redemption2.default)(object);
  (0, _reward2.default)(object);
  (0, _user2.default)(object);
  return object;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apiCall = __webpack_require__(0);

var _apiCall2 = _interopRequireDefault(_apiCall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (object) {
  return Object.assign(object, {
    listEventAnalytics: (0, _apiCall2.default)({
      method: "get",
      path: "/analytics/events",
      optionalParams: ["page"]
    }),

    listUserAnalytics: (0, _apiCall2.default)({
      method: "get",
      path: "/analytics/users",
      optionalParams: ["page"]
    })
  });
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

var _apiCall = __webpack_require__(0);

var _apiCall2 = _interopRequireDefault(_apiCall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (object) {
  return Object.assign(object, {
    createAnnouncement: (0, _apiCall2.default)({
      method: "post",
      path: "/announcements",
      expectedParams: ["title", "body"]
    }),

    deleteAnnouncement: (0, _apiCall2.default)({
      method: "delete",
      path: "/announcements/:announcementId"
    }),

    getAnnouncement: (0, _apiCall2.default)({
      method: "get",
      path: "/announcements/:announcementId"
    }),

    listAnnouncements: (0, _apiCall2.default)({
      method: "get",
      path: "/announcements",
      optionalParams: ["page"]
    }),

    updateAnnouncement: (0, _apiCall2.default)({
      method: "patch",
      path: "/announcements/:announcementId",
      optionalParams: ["title", "body"]
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

var _apiCall = __webpack_require__(0);

var _apiCall2 = _interopRequireDefault(_apiCall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (object) {
  return Object.assign(object, {
    createComment: (0, _apiCall2.default)({
      method: "post",
      path: "/events/:eventId/comments",
      expectedParams: ["body"],
      optionalParams: ["parentCommentId"]
    }),

    deleteComment: (0, _apiCall2.default)({
      method: "delete",
      path: "/events/:eventId/comments/:commentId"
    }),

    getComment: (0, _apiCall2.default)({
      method: "get",
      path: "/events/:eventId/comments/:commentId"
    }),

    listComments: (0, _apiCall2.default)({
      method: "get",
      path: "/events/:eventId/comments",
      optionalParams: ["page"]
    }),

    updateComment: (0, _apiCall2.default)({
      method: "patch",
      path: "/events/:eventId/comments/:commentId",
      expectedParams: ["body"]
    })
  });
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apiCall = __webpack_require__(0);

var _apiCall2 = _interopRequireDefault(_apiCall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (object) {
  return Object.assign(object, {
    createDepartment: (0, _apiCall2.default)({
      method: "post",
      path: "/departments",
      expectedParams: ["name"]
    }),

    deleteDepartment: (0, _apiCall2.default)({
      method: "delete",
      path: "/departments/:departmentId"
    }),

    getDepartment: (0, _apiCall2.default)({
      method: "get",
      path: "/departments/:departmentId"
    }),

    listDepartments: (0, _apiCall2.default)({
      method: "get",
      path: "/departments",
      optionalParams: ["page"]
    }),

    updateDepartment: (0, _apiCall2.default)({
      method: "patch",
      path: "/departments/:departmentId",
      optionalParams: ["name"]
    })
  });
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apiCall = __webpack_require__(0);

var _apiCall2 = _interopRequireDefault(_apiCall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (object) {
  return Object.assign(object, {
    createEvent: (0, _apiCall2.default)({
      method: "post",
      path: "/events",
      expectedParams: ["name", "details", "startsAt", "endsAt", "eventType"],
      optionalParams: ["sponsored"]
    }),

    createRSVP: (0, _apiCall2.default)({
      method: "post",
      path: "/events/:eventId/rsvps",
      expectedParams: ["responseType"],
      optionalParams: ["extra"]
    }),

    getEvent: (0, _apiCall2.default)({
      method: "get",
      path: "/events/:eventId"
    }),

    listEvents: (0, _apiCall2.default)({
      method: "get",
      path: "/events",
      optionalParams: ["page"]
    }),

    listUserEvents: (0, _apiCall2.default)({
      method: "get",
      path: "/users/:userId/events",
      optionalParams: ["page"]
    })
  });
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apiCall = __webpack_require__(0);

var _apiCall2 = _interopRequireDefault(_apiCall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (object) {
  return Object.assign(object, {
    createExpense: (0, _apiCall2.default)({
      method: "post",
      path: "/events/:eventId/expense",
      expectedParams: ["description", "amount"]
    }),

    deleteExpense: (0, _apiCall2.default)({
      method: "delete",
      path: "/events/:eventId/expense"
    }),

    getExpense: (0, _apiCall2.default)({
      method: "get",
      path: "/events/:eventId/expenses/:expenseId"
    }),

    listExpenses: (0, _apiCall2.default)({
      method: "get",
      path: "/events/:eventId/expenses",
      optionalParams: ["page"]
    }),

    updateExpense: (0, _apiCall2.default)({
      method: "patch",
      path: "/events/:eventId/expenses/:expenseId",
      optionalParams: ["description", "amount"]
    })
  });
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apiCall = __webpack_require__(0);

var _apiCall2 = _interopRequireDefault(_apiCall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (object) {
  return Object.assign(object, {
    createFeedback: (0, _apiCall2.default)({
      method: "post",
      path: "/feedbacks",
      expectedParams: ["body"],
      optionalParams: ["anonymous"]
    }),

    getFeedback: (0, _apiCall2.default)({
      method: "get",
      path: "/feedbacks/:feedbackId"
    }),

    listFeedbacks: (0, _apiCall2.default)({
      method: "get",
      path: "/feedbacks",
      optionalParams: ["page"]
    }),

    reviewFeedback: (0, _apiCall2.default)({
      method: "patch",
      path: "/feedbacks/:feedbackId"
    })
  });
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apiCall = __webpack_require__(0);

var _apiCall2 = _interopRequireDefault(_apiCall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (object) {
  return Object.assign(object, {
    deleteInterest: (0, _apiCall2.default)({
      method: "delete",
      path: "/interests/:interestId"
    }),

    getInterest: (0, _apiCall2.default)({
      method: "get",
      path: "/interests/:interestId"
    }),

    listInterests: (0, _apiCall2.default)({
      method: "get",
      path: "/interests",
      optionalParams: ["page"]
    })
  });
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apiCall = __webpack_require__(0);

var _apiCall2 = _interopRequireDefault(_apiCall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (object) {
  return Object.assign(object, {
    listInvites: (0, _apiCall2.default)({
      method: "get",
      path: "/invites",
      optionalParams: ["page"]
    })
  });
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apiCall = __webpack_require__(0);

var _apiCall2 = _interopRequireDefault(_apiCall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (object) {
  return Object.assign(object, {
    createOrganization: (0, _apiCall2.default)({
      method: "post",
      path: "/admin/organizations",
      expectedParams: ["name"],
      optionalParams: ["primaryColor", "secondaryColor", "gamificationEnabled"]
    }),

    deleteOrganization: (0, _apiCall2.default)({
      method: "delete",
      path: "/admin/organizations/:organizationId"
    }),

    getOrganization: (0, _apiCall2.default)({
      method: "get",
      path: "/admin/organizations/:organizationId"
    }),

    listOrganizations: (0, _apiCall2.default)({
      method: "get",
      path: "/admin/organizations",
      optionalParams: ["page"]
    }),

    updateOrganization: (0, _apiCall2.default)({
      method: "patch",
      path: "/admin/organizations/:organizationId",
      optionalParams: ["name", "primaryColor", "secondaryColor", "gamificationEnabled"]
    })
  });
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apiCall = __webpack_require__(0);

var _apiCall2 = _interopRequireDefault(_apiCall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (object) {
  return Object.assign(object, {
    changePassword: (0, _apiCall2.default)({
      method: "patch",
      path: "/password",
      expectedParams: ["password"]
    }),

    requestPasswordReset: (0, _apiCall2.default)({
      method: "post",
      path: "/password_resets",
      expectedParams: ["email"]
    }),

    resetPassword: (0, _apiCall2.default)({
      method: "patch",
      path: "/password_resets/:token",
      expectedParams: ["password"]
    })
  });
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apiCall = __webpack_require__(0);

var _apiCall2 = _interopRequireDefault(_apiCall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (object) {
  return Object.assign(object, {
    createRewardRedemption: (0, _apiCall2.default)({
      method: "post",
      path: "/rewards/:rewardId/redemptions"
    }),

    deleteRewardRedemption: (0, _apiCall2.default)({
      method: "delete",
      path: "/rewards/:rewardId/redemptions/:redemptionId"
    }),

    getRewardRedemption: (0, _apiCall2.default)({
      method: "get",
      path: "/rewards/:rewardId/redemptions/:redemptionId"
    }),

    listRedemptions: (0, _apiCall2.default)({
      method: "get",
      path: "/redemptions",
      optionalParams: ["page"]
    }),

    listRewardRedemptions: (0, _apiCall2.default)({
      method: "get",
      path: "/rewards/:rewardId/redemptions/:redemptionId",
      optionalParams: ["page"]
    }),

    updateRewardRedemption: (0, _apiCall2.default)({
      method: "patch",
      path: "/rewards/:rewardId/redemptions/:redemptionId"
    })
  });
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apiCall = __webpack_require__(0);

var _apiCall2 = _interopRequireDefault(_apiCall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (object) {
  return Object.assign(object, {
    createReward: (0, _apiCall2.default)({
      method: "post",
      path: "/rewards",
      expectedParams: ["name", "points"],
      optionalParams: ["description"]
    }),

    deleteReward: (0, _apiCall2.default)({
      method: "delete",
      path: "/rewards/:rewardId"
    }),

    getReward: (0, _apiCall2.default)({
      method: "get",
      path: "/rewards/:rewardId"
    }),

    listRewards: (0, _apiCall2.default)({
      method: "get",
      path: "/rewards",
      optionalParams: ["page"]
    }),

    updateReward: (0, _apiCall2.default)({
      method: "patch",
      path: "/rewards/:rewardId",
      optionalParams: ["name", "points", "description"]
    })
  });
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apiCall = __webpack_require__(0);

var _apiCall2 = _interopRequireDefault(_apiCall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (object) {
  return Object.assign(object, {
    deactivateUser: (0, _apiCall2.default)({
      method: "delete",
      path: "/users/:userId/deactivations"
    }),

    getProfile: (0, _apiCall2.default)({
      method: "get",
      path: "/profile"
    }),

    getUser: (0, _apiCall2.default)({
      method: "get",
      path: "/users/:userId"
    }),

    incrementUserPoints: (0, _apiCall2.default)({
      method: "post",
      path: "/users/:userId/points_increments",
      expectedParams: ["points"]
    }),

    listUsers: (0, _apiCall2.default)({
      method: "get",
      path: "/users",
      optionalParams: ["page"]
    }),

    reactivateUser: (0, _apiCall2.default)({
      method: "post",
      path: "/users/:userId/deactivations"
    }),

    registerUser: (0, _apiCall2.default)({
      method: "post",
      path: "/invites/:token/users",
      expectedParams: ["name", "password"]
    }),

    sendInvite: (0, _apiCall2.default)({
      method: "post",
      path: "/invites",
      expectedParams: ["email"]
    }),

    updateUser: (0, _apiCall2.default)({
      method: "patch",
      path: "/users/:userId",
      optionalParams: ["name", "email", "departmentIds", "interestList"]
    })
  });
};

/***/ })
/******/ ]);
});