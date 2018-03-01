(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("isomorphic-fetch"), require("actioncable"), require("store/dist/store.modern"), require("url-polyfill"));
	else if(typeof define === 'function' && define.amd)
		define(["isomorphic-fetch", "actioncable", "store/dist/store.modern", "url-polyfill"], factory);
	else if(typeof exports === 'object')
		exports["CultureHQ"] = factory(require("isomorphic-fetch"), require("actioncable"), require("store/dist/store.modern"), require("url-polyfill"));
	else
		root["CultureHQ"] = factory(root["isomorphic-fetch"], root["actioncable"], root["store/dist/store.modern"], root["url-polyfill"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_9__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _store = __webpack_require__(6);

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tokenKey = "token";
var simulationKey = "simulation";

var state = {
  endSimulation: function endSimulation() {
    state.signIn(_store2.default.get(simulationKey));
    _store2.default.remove(simulationKey);
  },

  getSimulationToken: function getSimulationToken() {
    return _store2.default.get(simulationKey);
  },

  getToken: function getToken() {
    return _store2.default.get(tokenKey);
  },

  isSignedIn: function isSignedIn() {
    return state.getToken() !== undefined;
  },

  isSimulating: function isSimulating() {
    return _store2.default.get(simulationKey) !== undefined;
  },

  signIn: function signIn(token) {
    _store2.default.set(tokenKey, token);
  },

  signOut: function signOut() {
    _store2.default.clearAll();
  },

  startSimulation: function startSimulation(token) {
    if (!state.isSignedIn()) {
      throw new Error("Cannot simulate unless you're already logged in.");
    }

    _store2.default.set(simulationKey, state.getToken());
    state.signIn(token);
  }
};

exports.default = state;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 2 */
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

var shouldRecurse = function shouldRecurse(value) {
  return value && (value.toString() === "[object Object]" || Array.isArray(value));
};

var modifyKeys = function modifyKeys(object, stringFunc) {
  // If the node is not an object or is null, return the original object since
  // we don't need to modify its keys.
  if ((typeof object === "undefined" ? "undefined" : _typeof(object)) !== "object" || object === null) {
    return object;
  }

  // For arrays, loop through each elemenet and modify as necessary.
  if (Array.isArray(object)) {
    return object.map(function (element) {
      return modifyKeys(element, stringFunc);
    });
  }

  // For other objects, ensure they have at least one key returned from
  // Object.keys. This (should) ensure that we're only processing objects that
  // were constructed from object literals, as opposed to Blob or File objects.
  if (!Object.keys(object).length) {
    return object;
  }

  var modified = {};
  var value = void 0;

  Object.keys(object).forEach(function (key) {
    value = object[key];
    if (shouldRecurse(value)) {
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startSwimming = exports.swim = undefined;

__webpack_require__(1);

var fishbowl = {
  queue: [],
  started: false,
  interval: null
};

var swim = function swim(message) {
  if (fishbowl.started) {
    fishbowl.queue.push(message);
  }
};

var startSwimming = function startSwimming(fishbowlHost) {
  var url = fishbowlHost + "/events";
  fishbowl.started = true;

  fishbowl.interval = setInterval(function () {
    var body = fishbowl.queue.shift();
    if (body) {
      fetch(url, { method: "POST", body: body, mode: "no-cors" }).catch(function () {
        fishbowl.started = false;
        clearInterval(fishbowl.interval);
      });
    }
  }, 200);
};

exports.swim = swim;
exports.startSwimming = startSwimming;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _actioncable = __webpack_require__(5);

var _actioncable2 = _interopRequireDefault(_actioncable);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _calls = __webpack_require__(7);

var _calls2 = _interopRequireDefault(_calls);

var _apiCall = __webpack_require__(8);

var _apiCall2 = _interopRequireDefault(_apiCall);

var _stringCase = __webpack_require__(2);

var _fishbowl = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

    this.rejectedRequests = 0;

    this.apiHost = options.apiHost;

    this.fishbowlHost = options.fishbowlHost;
    if (this.fishbowlHost) {
      (0, _fishbowl.startSwimming)(this.fishbowlHost);
    }

    Object.keys(_calls2.default).forEach(function (callName) {
      _this[callName] = (0, _apiCall2.default)(_this, _calls2.default[callName]);
    });
  }

  _createClass(CultureHQ, [{
    key: "recordResponse",
    value: function recordResponse(status) {
      var _this2 = this;

      if (status === 403) {
        this.rejectedRequests += 1;

        // After 3 403s in a row, automatically sign out.
        if (this.rejectedRequests === 3) {
          return this.signOut().then(function () {
            return _this2.rejectedRequests = 0;
          });
        }
      } else {
        this.rejectedRequests = 0;
      }

      return Promise.resolve();
    }
  }, {
    key: "endUserSimulation",
    value: function endUserSimulation() {
      _state2.default.endSimulation();
    }
  }, {
    key: "isSignedIn",
    value: function isSignedIn() {
      return _state2.default.isSignedIn();
    }
  }, {
    key: "isSimulating",
    value: function isSimulating() {
      return _state2.default.isSimulating();
    }
  }, {
    key: "onNotificationReceived",
    value: function onNotificationReceived(callback) {
      return this._subscribeToChannel("NotificationChannel", callback);
    }
  }, {
    key: "setToken",
    value: function setToken(token) {
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
      return this.deleteSession().then(function (response) {
        _state2.default.signOut();
        return response;
      });
    }
  }, {
    key: "startUserSimulation",
    value: function startUserSimulation(params) {
      return this.createSimulation(params).then(function (response) {
        _state2.default.startSimulation(response.apiKey.token);
        return response;
      });
    }
  }, {
    key: "_ensureConsumer",
    value: function _ensureConsumer() {
      if (this._consumer) {
        return this._consumer;
      }

      var _apiHost$split = this.apiHost.split("://"),
          _apiHost$split2 = _slicedToArray(_apiHost$split, 2),
          protocol = _apiHost$split2[0],
          host = _apiHost$split2[1];

      var wsProtocol = protocol === "https" ? "wss" : "ws";

      var endpoint = wsProtocol + "://" + host + "/cable/" + _state2.default.getToken();
      this._consumer = _actioncable2.default.createConsumer(endpoint);
      return this._consumer;
    }
  }, {
    key: "_subscribeToChannel",
    value: function _subscribeToChannel(channel, callback) {
      return this._ensureConsumer().subscriptions.create(channel, {
        received: function received(data) {
          return callback((0, _stringCase.camelize)(data));
        }
      });
    }
  }]);

  return CultureHQ;
}();

exports.default = CultureHQ;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("actioncable");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("store/dist/store.modern");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = {"activateSurvey":{"method":"POST","path":"/surveys/:surveyId/survey_activation"},"adminAutocompleteUsers":{"method":"GET","path":"/admin/autocomplete/users","expectedParams":["query"]},"adminListInvites":{"method":"GET","path":"/admin/organizations/:organizationId/invites","optionalParams":["page"]},"adminSendInvite":{"method":"POST","path":"/admin/organizations/:organizationId/invites","multipart":true,"expectedParams":["name","email"],"optionalParams":["locationName","departmentNames","interestNames","avatar","title"]},"autocompleteUsers":{"method":"GET","path":"/autocomplete/users","expectedParams":["query"]},"bulkCreateEventPhotos":{"method":"POST","path":"/events/:eventId/albums","multipart":true,"expectedParams":["images"]},"cancelEvent":{"method":"POST","path":"/events/:eventId/event_cancellations","optionalParams":["message"]},"changePassword":{"method":"PATCH","path":"/password","expectedParams":["oldPassword","newPassword"]},"checkInEventAttendee":{"method":"POST","path":"/events/:eventId/check_ins","expectedParams":["userId"]},"cheerEventComment":{"method":"POST","path":"/events/:eventId/comments/:commentId/cheers"},"cheerEventPhoto":{"method":"POST","path":"/events/:eventId/photos/:photoId/cheers"},"cheerEventPhotoComment":{"method":"POST","path":"/events/:eventId/photos/:photoId/comments/:commentId/cheers"},"cheerRecognition":{"method":"POST","path":"/recognitions/:recognitionId/cheers"},"cheerRecognitionComment":{"method":"POST","path":"/recognitions/:recognitionId/comments/:commentId/cheers"},"cheerUserActivity":{"method":"POST","path":"/user_activities/:userActivityId/cheers"},"cheerUserActivityComment":{"method":"POST","path":"/user_activities/:userActivityId/comments/:commentId/cheers"},"confirmEventAttendance":{"method":"POST","path":"/events/:eventId/confirmation"},"createAnnouncement":{"method":"POST","path":"/announcements","multipart":true,"expectedParams":["title","active"],"optionalParams":["body","image"]},"createApiKey":{"method":"POST","path":"/api_keys","expectedParams":["email","password"]},"createBulkUserImport":{"method":"POST","path":"/bulk_user_imports","multipart":true,"expectedParams":["csvFile"]},"createDepartment":{"method":"POST","path":"/departments","expectedParams":["name"]},"createEvent":{"method":"POST","path":"/events","multipart":true,"expectedParams":["name","startsAt","endsAt","eventType"],"optionalParams":["details","sponsored","surveyId","image","organizationValueIds","location","visibility","cap","locationIds","inviteOnly","openInvites","inviteeIds","timezone","interestNames"]},"createEventComment":{"method":"POST","path":"/events/:eventId/comments","expectedParams":["body"],"optionalParams":["parentCommentId"]},"createEventInvites":{"method":"POST","path":"/events/:eventId/event_invites","optionalParams":["userIds","locationIds","interestIds","departmentIds"]},"createEventPhoto":{"method":"POST","path":"/events/:eventId/photos","multipart":true,"expectedParams":["image"],"optionalParams":["caption"]},"createEventPhotoComment":{"method":"POST","path":"/events/:eventId/photos/:photoId/comments","expectedParams":["body"],"optionalParams":["parentCommentId"]},"createEventRsvp":{"method":"POST","path":"/events/:eventId/rsvps","expectedParams":["responseType"]},"createExpense":{"method":"POST","path":"/events/:eventId/expenses","expectedParams":["description","amount"],"optionalParams":["incurredAt"]},"createFeedback":{"method":"POST","path":"/feedbacks","expectedParams":["body"],"optionalParams":["anonymous"]},"createInterest":{"method":"POST","path":"/interests","expectedParams":["name"]},"createLocation":{"method":"POST","path":"/locations","expectedParams":["name"]},"createOrganization":{"method":"POST","path":"/admin/organizations","multipart":true,"expectedParams":["name"],"optionalParams":["gamificationEnabled","logo","active","mode"]},"createOrganizationValue":{"method":"POST","path":"/organization_values","expectedParams":["name"]},"createPhotoTag":{"method":"POST","path":"/photos/:photoId/photo_tags","expectedParams":["userId"]},"createProfileNotificationView":{"method":"POST","path":"/profile/notification_views"},"createRecognition":{"method":"POST","path":"/recognitions","expectedParams":["body","userIds"]},"createRecognitionComment":{"method":"POST","path":"/recognitions/:recognitionId/comments","expectedParams":["body"],"optionalParams":["parentCommentId"]},"createSamlAgreement":{"method":"POST","path":"/saml/agreement"},"createSession":{"method":"POST","path":"/sessions","expectedParams":["email"]},"createSimulation":{"method":"POST","path":"/admin/simulation","expectedParams":["userId"]},"createSlackIntegration":{"method":"POST","path":"/slack_integrations","expectedParams":["code"]},"createSurvey":{"method":"POST","path":"/surveys","expectedParams":["title"],"optionalParams":["points","eventId"]},"createSurveyItem":{"method":"POST","path":"/surveys/:surveyId/survey_items","expectedParams":["prompt","itemType"],"optionalParams":["minRange","maxRange"]},"createSurveyItemResponseOption":{"method":"POST","path":"/survey_items/:surveyItemId/survey_item_response_options","expectedParams":["body"]},"createSurveyUserItemResponse":{"method":"POST","path":"/survey_items/:surveyItemId/survey_user_item_response","optionalParams":["body","surveyItemResponseOptionIds"]},"createUserActivityComment":{"method":"POST","path":"/user_activities/:userActivityId/comments","expectedParams":["body"],"optionalParams":["parentCommentId"]},"createUserInvite":{"method":"POST","path":"/users/:userId/invites"},"deactivateSurvey":{"method":"DELETE","path":"/surveys/:surveyId/survey_activation"},"deactivateUser":{"method":"POST","path":"/users/:userId/deactivation"},"deleteAnnouncement":{"method":"DELETE","path":"/announcements/:announcementId"},"deleteDepartment":{"method":"DELETE","path":"/departments/:departmentId"},"deleteEvent":{"method":"DELETE","path":"/events/:eventId","optionalParams":["message"]},"deleteEventComment":{"method":"DELETE","path":"/events/:eventId/comments/:commentId"},"deleteEventPhoto":{"method":"DELETE","path":"/events/:eventId/photos/:photoId"},"deleteEventPhotoComment":{"method":"DELETE","path":"/events/:eventId/photos/:photoId/comments/:commentId"},"deleteExpense":{"method":"DELETE","path":"/events/:eventId/expenses/:expenseId"},"deleteInterest":{"method":"DELETE","path":"/interests/:interestId"},"deleteLocation":{"method":"DELETE","path":"/locations/:locationId"},"deleteOrganization":{"method":"DELETE","path":"/admin/organizations/:organizationId"},"deleteOrganizationValue":{"method":"DELETE","path":"/organization_values/:organizationValueId"},"deletePhotoTag":{"method":"DELETE","path":"/photos/:photoId/photo_tags/:photoTagId"},"deleteRecognition":{"method":"DELETE","path":"/recognitions/:recognitionId"},"deleteRecognitionComment":{"method":"DELETE","path":"/recognitions/:recognitionId/comments/:commentId"},"deleteSession":{"method":"DELETE","path":"/session"},"deleteSlackIntegration":{"method":"DELETE","path":"/slack_integrations/:slackIntegrationId"},"deleteSurvey":{"method":"DELETE","path":"/surveys/:surveyId"},"deleteSurveyItem":{"method":"DELETE","path":"/survey_items/:surveyItemId"},"deleteSurveyItemResponseOption":{"method":"DELETE","path":"/survey_item_response_options/:surveyItemResponseOptionId"},"deleteSurveyUserItemResponse":{"method":"DELETE","path":"/survey_items/:surveyItemId/survey_user_item_response"},"deleteUserActivityComment":{"method":"DELETE","path":"/user_activities/:userActivityId/comments/:commentId"},"denyEventAttendance":{"method":"DELETE","path":"/events/:eventId/confirmation"},"disableStaticWidget":{"method":"DELETE","path":"/widgets","expectedParams":["widget"]},"duplicateEvent":{"method":"POST","path":"/events/:eventId/event_duplicates","expectedParams":["startsAt"],"optionalParams":["endsAt"]},"enableStaticWidget":{"method":"POST","path":"/widgets","expectedParams":["widget"]},"eventAutocompleteInvites":{"method":"GET","path":"/events/:eventId/autocomplete/event_invites","expectedParams":["query"]},"eventAutocompleteRsvps":{"method":"GET","path":"/events/:eventId/autocomplete/rsvps","expectedParams":["query"]},"exportEvents":{"method":"POST","path":"/exports/event_export"},"flagAvatar":{"method":"POST","path":"/users/:userId/flags","optionalParams":["message"]},"flagComment":{"method":"POST","path":"/comments/:commentId/flags","optionalParams":["message"]},"flagDepartment":{"method":"POST","path":"/departments/:departmentId/flags","optionalParams":["message"]},"flagEvent":{"method":"POST","path":"/events/:eventId/flags","optionalParams":["message"]},"flagInterest":{"method":"POST","path":"/interests/:interestId/flags","optionalParams":["message"]},"flagLocation":{"method":"POST","path":"/locations/:locationId/flags","optionalParams":["message"]},"flagPhoto":{"method":"POST","path":"/photos/:photoId/flags","optionalParams":["message"]},"flagRecognition":{"method":"POST","path":"/recognitions/:recognitionId/flags","optionalParams":["message"]},"getAnnouncement":{"method":"GET","path":"/announcements/:announcementId"},"getBulkUserImport":{"method":"GET","path":"/bulk_user_imports/:bulkUserImportJobId"},"getDepartment":{"method":"GET","path":"/departments/:departmentId"},"getDepartmentEventParticipation":{"method":"GET","path":"/events/:eventId/department_event_participation"},"getEvent":{"method":"GET","path":"/events/:eventId"},"getEventAnalytics":{"method":"GET","path":"/analytics/events/:eventId"},"getEventComment":{"method":"GET","path":"/events/:eventId/comments/:commentId"},"getEventPhoto":{"method":"GET","path":"/events/:eventId/photos/:photoId"},"getEventPhotoComment":{"method":"GET","path":"/events/:eventId/photos/:photoId/comments/:commentId"},"getEventRsvp":{"method":"GET","path":"/events/:eventId/rsvps/:rsvpId"},"getExpense":{"method":"GET","path":"/events/:eventId/expenses/:expenseId"},"getFeedback":{"method":"GET","path":"/feedbacks/:feedbackId"},"getInterest":{"method":"GET","path":"/interests/:interestId"},"getInvite":{"method":"GET","path":"/invites/:token"},"getLocation":{"method":"GET","path":"/locations/:locationId"},"getOrganization":{"method":"GET","path":"/admin/organizations/:organizationId"},"getOrganizationValue":{"method":"GET","path":"/organization_values/:organizationValueId"},"getOrganizationValueLeaderboard":{"method":"GET","path":"/leaderboard/organization_values"},"getPhotoGallery":{"method":"GET","path":"/gallery","optionalParams":["page","range"]},"getPointLeaderboard":{"method":"GET","path":"/leaderboard/points"},"getProfile":{"method":"GET","path":"/profile"},"getProfileEmailSettings":{"method":"GET","path":"/profile/email_settings"},"getRecognition":{"method":"GET","path":"/recognitions/:recognitionId"},"getRecognitionComment":{"method":"GET","path":"/recognitions/:recognitionId/comments/:commentId"},"getSurvey":{"method":"GET","path":"/surveys/:surveyId"},"getSurveyItem":{"method":"GET","path":"/survey_items/:surveyItemId"},"getSurveyItemResponseOption":{"method":"GET","path":"/survey_item_response_options/:surveyItemResponseOptionId"},"getSurveyUserItemResponse":{"method":"GET","path":"/survey_items/:surveyItemId/survey_user_item_response"},"getUser":{"method":"GET","path":"/users/:userId"},"getUserActivityComment":{"method":"GET","path":"/user_activities/:userActivityId/comments/:commentId"},"getUserEventTypeBreakdown":{"method":"GET","path":"/users/:userId/event_type_breakdown"},"getUserPointBreakdown":{"method":"GET","path":"/users/:userId/point_breakdown"},"getUserRecognitionLeaderboard":{"method":"GET","path":"/leaderboard/user_recognitions"},"incrementUserPoints":{"method":"POST","path":"/users/:userId/point_increments","expectedParams":["points"]},"invalidateOtherApiKeys":{"method":"DELETE","path":"/api_keys"},"listActiveAnnouncements":{"method":"GET","path":"/active_announcements","optionalParams":["page"]},"listAnnouncements":{"method":"GET","path":"/announcements","optionalParams":["page","active"]},"listApiKeys":{"method":"GET","path":"/api_keys"},"listDepartmentAnalytics":{"method":"GET","path":"/analytics/departments","optionalParams":["page"]},"listDepartmentUsers":{"method":"GET","path":"/departments/:departmentId/users","optionalParams":["page","includeDeactivated"]},"listDepartments":{"method":"GET","path":"/departments","optionalParams":["page"]},"listEventAnalytics":{"method":"GET","path":"/analytics/events","optionalParams":["page"]},"listEventCommentCheers":{"method":"GET","path":"/events/:event_id/comments/:comment_id/cheers","optionalParams":["page"]},"listEventComments":{"method":"GET","path":"/events/:eventId/comments","optionalParams":["page"]},"listEventPhotoCheers":{"method":"GET","path":"/events/:eventId/photos/:photoId/cheers","optionalParams":["page"]},"listEventPhotoCommentCheers":{"method":"GET","path":"/events/:eventId/photos/:photoId/comments/:commentId/cheers","optionalParams":["page"]},"listEventPhotoComments":{"method":"GET","path":"/events/:eventId/photos/:photoId/comments","optionalParams":["page"]},"listEventPhotos":{"method":"GET","path":"/events/:eventId/photos","optionalParams":["page"]},"listEventRsvps":{"method":"GET","path":"/events/:eventId/rsvps","optionalParams":["page","responseType"]},"listEvents":{"method":"GET","path":"/events","optionalParams":["page","range","locationIds","sort","when","organizationValueIds","eventType","sponsored"]},"listEventsByOrganization":{"method":"GET","path":"/admin/events"},"listExpenses":{"method":"GET","path":"/events/:eventId/expenses","optionalParams":["page"]},"listFeedbacks":{"method":"GET","path":"/feedbacks","optionalParams":["page","reviewed"]},"listFlags":{"method":"GET","path":"/flags","optionalParams":["page","reviewed"]},"listInterestUsers":{"method":"GET","path":"/interests/:interestId/users","optionalParams":["page","includeDeactivated"]},"listInterests":{"method":"GET","path":"/interests","optionalParams":["page"]},"listInvites":{"method":"GET","path":"/invites","optionalParams":["page"]},"listLocations":{"method":"GET","path":"/locations","optionalParams":["page"]},"listOrganizationValueEvents":{"method":"GET","path":"/organization_values/:organizationValueId/events","optionalParams":["page"]},"listOrganizationValueRecognitions":{"method":"GET","path":"/organization_values/:organizationValueId/recognitions","optionalParams":["page"]},"listOrganizationValues":{"method":"GET","path":"/organization_values","optionalParams":["page"]},"listOrganizations":{"method":"GET","path":"/admin/organizations","optionalParams":["page"]},"listPhotoTags":{"method":"GET","path":"/photos/:photoId/photo_tags","optionalParams":["page"]},"listProfileEventSurveys":{"method":"GET","path":"/profile/event_surveys","optionalParams":["filter"]},"listProfileNotifications":{"method":"GET","path":"/profile/notifications","optionalParams":["seen","page"]},"listProfilePointIncrements":{"method":"GET","path":"/profile/point_increments","optionalParams":["page"]},"listRecognitionCheers":{"method":"GET","path":"/recognitions/:recognitionId/cheers","optionalParams":["page"]},"listRecognitionCommentCheers":{"method":"GET","path":"/recognitions/:recognitionId/comments/:commentId/cheers","optionalParams":["page"]},"listRecognitionComments":{"method":"GET","path":"/recognitions/:recognitionId/comments","optionalParams":["page"]},"listRecognitions":{"method":"GET","path":"/recognitions","optionalParams":["page"]},"listSlackIntegrations":{"method":"GET","path":"/slack_integrations"},"listSurveyItemResponseOptions":{"method":"GET","path":"/survey_items/:surveyItemId/survey_item_response_options","optionalParams":["page"]},"listSurveyItems":{"method":"GET","path":"/surveys/:surveyId/survey_items","optionalParams":["page"]},"listSurveyResults":{"method":"GET","path":"/surveys/:surveyId/survey_results"},"listSurveySubmittedResponses":{"method":"GET","path":"/surveys/:surveyId/submitted_responses"},"listSurveys":{"method":"GET","path":"/surveys","optionalParams":["page"]},"listUserActivities":{"method":"GET","path":"/user_activities","optionalParams":["page"]},"listUserActivityCheers":{"method":"GET","path":"/user_activities/:userActivityId/cheers","optionalParams":["page"]},"listUserActivityCommentCheers":{"method":"GET","path":"/user_activities/:userActivityId/comments/:commentId/cheers","optionalParams":["page"]},"listUserActivityComments":{"method":"GET","path":"/user_activities/:userActivityId/comments","optionalParams":["page"]},"listUserAnalytics":{"method":"GET","path":"/analytics/users","optionalParams":["page"]},"listUserHostedEvents":{"method":"GET","path":"/users/:userId/hosted_events","optionalParams":["page"]},"listUserRecognitions":{"method":"GET","path":"/users/:userId/recognitions","optionalParams":["page"]},"listUserRsvpdEvents":{"method":"GET","path":"/users/:userId/rsvpd_events","optionalParams":["when","sort"]},"listUsers":{"method":"GET","path":"/users","optionalParams":["page","includeDeactivated","departmentId","interestId","locationId"]},"listWidgetSurveys":{"method":"GET","path":"/widget_surveys","optionalParams":["active","completed","page"]},"markEventAsSponsored":{"method":"POST","path":"/events/:eventId/event_sponsorship"},"messageEventGuests":{"method":"POST","path":"/events/:eventId/event_notifications","expectedParams":["body"]},"reactivateUser":{"method":"DELETE","path":"/users/:userId/deactivation"},"registerUser":{"method":"POST","path":"/invites/:token/users","expectedParams":["password"]},"reorderSurveyItemResponseOptions":{"method":"PATCH","path":"/survey_items/:surveyItemId/survey_item_response_option_order","expectedParams":["order"]},"reorderSurveyItems":{"method":"PATCH","path":"/surveys/:surveyId/survey_item_order","expectedParams":["order"]},"reorderWidgets":{"method":"PATCH","path":"/widget_order","expectedParams":["order"]},"requestPasswordReset":{"method":"POST","path":"/password_resets","expectedParams":["email"]},"resetPassword":{"method":"PATCH","path":"/password_resets/:token","expectedParams":["password"]},"reviewFeedback":{"method":"PATCH","path":"/feedbacks/:feedbackId"},"sendInvite":{"method":"POST","path":"/invites","multipart":true,"expectedParams":["name","email"],"optionalParams":["locationName","departmentNames","interestNames","avatar","title"]},"subscribeToEventNotifications":{"method":"POST","path":"/events/:eventId/event_notification_subscription"},"uncheerEventComment":{"method":"DELETE","path":"/events/:eventId/comments/:commentId/cheers"},"uncheerEventPhoto":{"method":"DELETE","path":"/events/:eventId/photos/:photoId/cheers"},"uncheerEventPhotoComment":{"method":"DELETE","path":"/events/:eventId/photos/:photoId/comments/:commentId/cheers"},"uncheerRecognition":{"method":"DELETE","path":"/recognitions/:recognitionId/cheers"},"uncheerRecognitionComment":{"method":"DELETE","path":"/recognitions/:recognitionId/comments/:commentId/cheers"},"uncheerUserActivity":{"method":"DELETE","path":"/user_activities/:userActivityId/cheers"},"uncheerUserActivityComment":{"method":"DELETE","path":"/user_activities/:userActivityId/comments/:commentId/cheers"},"unsubscribeFromEventNotifications":{"method":"DELETE","path":"/events/:eventId/event_notification_subscription"},"updateAnnouncement":{"method":"PATCH","path":"/announcements/:announcementId","multipart":true,"optionalParams":["title","body","active","image"]},"updateDepartment":{"method":"PATCH","path":"/departments/:departmentId","optionalParams":["name"]},"updateEvent":{"method":"PATCH","path":"/events/:eventId","multipart":true,"optionalParams":["name","details","startsAt","endsAt","eventType","sponsored","surveyId","image","organizationValueIds","location","visibility","cap","locationIds","inviteOnly","openInvites","interestNames"]},"updateEventComment":{"method":"PATCH","path":"/events/:eventId/comments/:commentId","expectedParams":["body"]},"updateEventPhoto":{"method":"PATCH","path":"/events/:eventId/photos/:photoId","multipart":true,"optionalParams":["image","caption"]},"updateEventPhotoComment":{"method":"PATCH","path":"/events/:eventId/photos/:photoId/comments/:commentId","expectedParams":["body"]},"updateEventRsvp":{"method":"PATCH","path":"/events/:eventId/rsvps/:rsvpId","expectedParams":["responseType"]},"updateExpense":{"method":"PATCH","path":"/events/:eventId/expenses/:expenseId","optionalParams":["description","amount","incurredAt"]},"updateFlag":{"method":"PATCH","path":"/flags/:flagId","expectedParams":["reviewed"]},"updateInterest":{"method":"PATCH","path":"/interests/:interestId","expectedParams":["name"]},"updateLocation":{"method":"PATCH","path":"/locations/:locationId","expectedParams":["name"]},"updateOrganization":{"method":"PATCH","path":"/admin/organizations/:organizationId","multipart":true,"optionalParams":["name","gamificationEnabled","logo","active","mode"]},"updateOrganizationValue":{"method":"PATCH","path":"/organization_values/:organizationValueId","expectedParams":["name"]},"updateProfile":{"method":"PATCH","path":"/profile","multipart":true,"optionalParams":["name","email","departmentNames","interestNames","avatar","title","locationName"]},"updateProfileEmailSettings":{"method":"PATCH","path":"/profile/email_settings","optionalParams":["eventInvite","eventNotification","postEventSurvey","recognized","redemptionApproved","redemptionRequested","rsvpConfirmation"]},"updateRecognition":{"method":"PATCH","path":"/recognitions/:recognitionId","expectedParams":["body"],"optionalParams":["userIds"]},"updateRecognitionComment":{"method":"PATCH","path":"/recognitions/:recognitionId/comments/:commentId","expectedParams":["body"]},"updateSurvey":{"method":"PATCH","path":"/surveys/:surveyId","optionalParams":["title","points"]},"updateSurveyItem":{"method":"PATCH","path":"/survey_items/:surveyItemId","optionalParams":["prompt","itemType","minRange","maxRange"]},"updateSurveyItemResponseOption":{"method":"PATCH","path":"/survey_item_response_options/:surveyItemResponseOptionId","optionalParams":["body"]},"updateSurveyUserItemResponse":{"method":"PATCH","path":"/survey_items/:surveyItemId/survey_user_item_response","optionalParams":["body","surveyItemResponseOptionIds"]},"updateUser":{"method":"PATCH","path":"/users/:userId","multipart":true,"optionalParams":["name","email","departmentNames","interestNames","avatar","title","locationName","organizationAdmin"]},"updateUserActivityComment":{"method":"PATCH","path":"/user_activities/:userActivityId/comments/:commentId","expectedParams":["body"]}}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

__webpack_require__(9);

var _request = __webpack_require__(10);

var _request2 = _interopRequireDefault(_request);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ensureExpectedParams = function ensureExpectedParams(expectedParams, actualParams) {
  expectedParams.forEach(function (param) {
    if (!actualParams.hasOwnProperty(param)) {
      throw new Error("Expected parameter " + param + " not given");
    }
  });
};

var substitutePath = function substitutePath(path, params) {
  var substitutedPath = path;

  Object.keys(params).forEach(function (param) {
    var needle = ":" + param;
    if (substitutedPath.indexOf(needle) !== -1) {
      substitutedPath = substitutedPath.replace(needle, params[param]);
      delete params[param];
    }
  });

  return substitutedPath;
};

exports.default = function (client, options) {
  options.expectedParams = options.expectedParams || [];

  var apiCall = function apiCall(actualParams) {
    if ((typeof actualParams === "undefined" ? "undefined" : _typeof(actualParams)) !== "object") {
      actualParams = {};
    }

    ensureExpectedParams(options.expectedParams, actualParams);
    var callPath = substitutePath(options.path, actualParams);

    return (0, _request2.default)(options.method, new URL("" + client.apiHost + callPath), {
      client: client,
      token: _state2.default.getToken(),
      simulation: _state2.default.getSimulationToken(),
      params: actualParams,
      multipart: options.multipart || false
    });
  };

  return Object.assign(apiCall, options);
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("url-polyfill");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(1);

var _stringCase = __webpack_require__(2);

var _fishbowl = __webpack_require__(3);

var buildHeaders = function buildHeaders(_ref) {
  var multipart = _ref.multipart,
      token = _ref.token,
      simulation = _ref.simulation;

  var headers = { "X-Client-Version": "0.0.80" };

  if (!multipart) {
    headers["Content-Type"] = "application/json";
  }
  if (typeof token === "string" && token.length) {
    headers["Authorization"] = "token " + token;
  }
  if (typeof simulation === "string" && simulation.length) {
    headers["X-Client-Simulation"] = simulation;
  }

  return headers;
};

var formDataValueFor = function formDataValueFor(object) {
  if (typeof object === "undefined" || object === null) {
    return "";
  }
  return object;
};

var buildRequest = function buildRequest(method, url, options) {
  var reqOptions = { headers: buildHeaders(options), method: method };
  var params = (0, _stringCase.snakerize)(options.params);

  if (method === "GET") {
    Object.keys(params).forEach(function (key) {
      if (!Array.isArray(params[key])) {
        url.searchParams.append(key, params[key]);
      } else if (params[key].length) {
        params[key].forEach(function (nestedValue) {
          return url.searchParams.append(key + "[]", nestedValue);
        });
      }
    });
  } else if (options.multipart) {
    var formData = new FormData();

    Object.keys(params).forEach(function (key) {
      if (!Array.isArray(params[key])) {
        formData.append(key, formDataValueFor(params[key]));
      } else if (params[key].length) {
        params[key].forEach(function (nestedValue) {
          return formData.append(key + "[]", nestedValue);
        });
      } else {
        formData.append(key + "[]", "");
      }
    });

    reqOptions.body = formData;
  } else {
    reqOptions.body = JSON.stringify(params);
  }

  return { url: url.href, options: reqOptions };
};

var logToFishBowl = function logToFishBowl(method, url, options) {
  var modifiedOptions = Object.assign({}, options);
  if (modifiedOptions.params && modifiedOptions.params.password) {
    modifiedOptions.params.password = "******";
  }

  (0, _fishbowl.swim)("[\u2191] " + method + " " + url.toString() + " " + JSON.stringify(modifiedOptions));
};

exports.default = function (method, url, options) {
  var request = buildRequest(method, url, options);
  logToFishBowl(method, url, options);

  return new Promise(function (resolve, reject) {
    fetch(request.url, request.options).then(function (response) {
      (0, _fishbowl.swim)("[\u2193] " + method + " " + url.toString() + "\n          " + response.status + " " + response.headers.get("content-type"));

      var success = Math.round(response.status / 200) === 1;

      options.client.recordResponse(response.status).then(function () {
        if (response.status === 204) {
          resolve(null);
        } else if (response.headers.get("content-type") === "text/html") {
          if (success) {
            response.text().then(function (text) {
              return resolve({ response: response, text: text });
            }).catch(function (error) {
              return reject(error);
            });
          } else {
            reject({ response: response, error: response.statusText });
          }
        } else {
          response.json().then(function (json) {
            var fullResponse = Object.assign({ response: response }, (0, _stringCase.camelize)(json));
            success ? resolve(fullResponse) : reject(fullResponse);
          }).catch(function (error) {
            return reject(error);
          });
        }
      });
    }).catch(function (error) {
      return reject(error);
    });
  });
};

/***/ })
/******/ ]);
});