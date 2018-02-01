(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("actioncable"), require("store/dist/store.modern"), require("url-polyfill"), require("isomorphic-fetch"));
	else if(typeof define === 'function' && define.amd)
		define(["actioncable", "store/dist/store.modern", "url-polyfill", "isomorphic-fetch"], factory);
	else if(typeof exports === 'object')
		exports["CultureHQ"] = factory(require("actioncable"), require("store/dist/store.modern"), require("url-polyfill"), require("isomorphic-fetch"));
	else
		root["CultureHQ"] = factory(root["actioncable"], root["store/dist/store.modern"], root["url-polyfill"], root["isomorphic-fetch"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_9__) {
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

var _store = __webpack_require__(4);

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tokenKey = "token";
var simulationKey = "simulation";

var state = {
  endSimulation: function endSimulation() {
    state.signIn(_store2.default.get(simulationKey));
    _store2.default.remove(simulationKey);
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _actioncable = __webpack_require__(3);

var _actioncable2 = _interopRequireDefault(_actioncable);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _calls = __webpack_require__(5);

var _calls2 = _interopRequireDefault(_calls);

var _apiCall = __webpack_require__(6);

var _apiCall2 = _interopRequireDefault(_apiCall);

var _stringCase = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var signInCallback = function signInCallback(response) {
  _state2.default.signIn(response.apiKey.token);
  return response;
};

var CultureHQ = function () {
  function CultureHQ() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, CultureHQ);

    this.apiHost = options.apiHost;

    Object.keys(_calls2.default).forEach(function (callName) {
      _this[callName] = (0, _apiCall2.default)(_this, _calls2.default[callName]);
    });
  }

  _createClass(CultureHQ, [{
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
    key: "onProfileUpdated",
    value: function onProfileUpdated(callback) {
      this._ensureConsumer().subscriptions.create("ProfileChannel", {
        received: function received(profile) {
          return callback((0, _stringCase.camelize)(profile));
        }
      });
    }
  }, {
    key: "setToken",
    value: function setToken(token) {
      _state2.default.signIn(token);
    }
  }, {
    key: "signIn",
    value: function signIn(params) {
      return this.createApiKey(params).then(signInCallback);
    }
  }, {
    key: "signOut",
    value: function signOut() {
      _state2.default.signOut();
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
      if (!this.isSignedIn()) {
        return;
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
  }]);

  return CultureHQ;
}();

exports.default = CultureHQ;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("actioncable");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("store/dist/store.modern");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = {"activateSurvey":{"method":"POST","path":"/surveys/:surveyId/survey_activation"},"adminAutocompleteUsers":{"method":"GET","path":"/admin/autocomplete/users","expectedParams":["query"]},"adminListInvites":{"method":"GET","path":"/admin/organizations/:organizationId/invites","optionalParams":["page"]},"adminSendInvite":{"method":"POST","path":"/admin/organizations/:organizationId/invites","multipart":true,"expectedParams":["name","email"],"optionalParams":["locationId","departmentIds","interestNames","avatar","title"]},"approveEventVoteEntry":{"method":"POST","path":"/event_vote_entries/:eventVoteEntryId/event_vote_entry_approval"},"autocompleteUsers":{"method":"GET","path":"/autocomplete/users","expectedParams":["query"]},"bulkCreateEventPhotos":{"method":"POST","path":"/events/:eventId/albums","multipart":true,"expectedParams":["images"]},"cancelEvent":{"method":"POST","path":"/events/:eventId/event_cancellations","optionalParams":["message"]},"changePassword":{"method":"PATCH","path":"/password","expectedParams":["oldPassword","newPassword"]},"checkInEventAttendee":{"method":"POST","path":"/events/:eventId/check_ins","expectedParams":["userId"],"optionalParams":["extra"]},"cheerEventComment":{"method":"POST","path":"/events/:eventId/comments/:commentId/cheers"},"cheerRecognition":{"method":"POST","path":"/recognitions/:recognitionId/cheers"},"cheerRecognitionComment":{"method":"POST","path":"/recognitions/:recognitionId/comments/:commentId/cheers"},"clearContentModerationEvent":{"method":"DELETE","path":"/content_moderation_events/:contentModerationEventId"},"confirmEventAttendance":{"method":"POST","path":"/events/:eventId/confirmation"},"createAnnouncement":{"method":"POST","path":"/announcements","multipart":true,"expectedParams":["title","body","active"],"optionalParams":["image"]},"createApiKey":{"method":"POST","path":"/api_keys","expectedParams":["email","password"]},"createBulkUserImport":{"method":"POST","path":"/bulk_user_imports","multipart":true,"expectedParams":["csvFile"]},"createDepartment":{"method":"POST","path":"/departments","expectedParams":["name"]},"createEvent":{"method":"POST","path":"/events","multipart":true,"expectedParams":["name","startsAt","endsAt","eventType"],"optionalParams":["details","sponsored","surveyId","image","organizationValueIds","location","visibility","cap","locationIds","inviteOnly","openInvites","inviteeIds","timezone","eventTagNames"]},"createEventComment":{"method":"POST","path":"/events/:eventId/comments","expectedParams":["body"],"optionalParams":["parentCommentId"]},"createEventInvites":{"method":"POST","path":"/events/:eventId/event_invites","optionalParams":["userIds","locationIds","interestIds","departmentIds"]},"createEventLeaderboardAttribute":{"method":"POST","path":"/events/:eventId/event_leaderboard_attributes","expectedParams":["title"],"optionalParams":["quantitative","sortDescending"]},"createEventLeaderboardAttributeRsvp":{"method":"POST","path":"/event_leaderboard_attributes/:eventLeaderboardAttributeId/event_leaderboard_attribute_rsvps","expectedParams":["value"],"optionalParams":["rsvpId"]},"createEventPhoto":{"method":"POST","path":"/events/:eventId/photos","multipart":true,"expectedParams":["image"],"optionalParams":["caption"]},"createEventRsvp":{"method":"POST","path":"/events/:eventId/rsvps","expectedParams":["responseType"],"optionalParams":["extra"]},"createEventVote":{"method":"POST","path":"/events/:eventId/event_votes","expectedParams":["title"],"optionalParams":["maxVotes"]},"createEventVoteEntry":{"method":"POST","path":"/event_votes/:eventVoteId/event_vote_entries","multipart":true,"expectedParams":["title"],"optionalParams":["image"]},"createExpense":{"method":"POST","path":"/events/:eventId/expenses","expectedParams":["description","amount"]},"createFeedback":{"method":"POST","path":"/feedbacks","expectedParams":["body"],"optionalParams":["anonymous"]},"createInterest":{"method":"POST","path":"/interests","expectedParams":["name"]},"createLocation":{"method":"POST","path":"/locations","expectedParams":["name"]},"createOrganization":{"method":"POST","path":"/admin/organizations","multipart":true,"expectedParams":["name"],"optionalParams":["primaryColor","secondaryColor","gamificationEnabled","logo","active","mode"]},"createOrganizationBot":{"method":"POST","path":"/admin/organizations/:organizationId/bots"},"createOrganizationValue":{"method":"POST","path":"/organization_values","expectedParams":["name"]},"createPhotoTag":{"method":"POST","path":"/photos/:photoId/photo_tags","expectedParams":["userId"]},"createRecognition":{"method":"POST","path":"/recognitions","expectedParams":["body","userIds"]},"createRecognitionComment":{"method":"POST","path":"/recognitions/:recognitionId/comments","expectedParams":["body"],"optionalParams":["parentCommentId"]},"createReward":{"method":"POST","path":"/rewards","multipart":true,"expectedParams":["name","points"],"optionalParams":["description","image"]},"createRewardRedemption":{"method":"POST","path":"/rewards/:rewardId/redemptions"},"createSession":{"method":"POST","path":"/sessions","expectedParams":["email"]},"createSimulation":{"method":"POST","path":"/admin/simulation","expectedParams":["userId"]},"createSlackIntegration":{"method":"POST","path":"/slack_integrations","expectedParams":["code"]},"createSurvey":{"method":"POST","path":"/surveys","expectedParams":["title"],"optionalParams":["points","eventId"]},"createSurveyItem":{"method":"POST","path":"/surveys/:surveyId/survey_items","expectedParams":["prompt","itemType"],"optionalParams":["minRange","maxRange"]},"createSurveyItemResponseOption":{"method":"POST","path":"/survey_items/:surveyItemId/survey_item_response_options","expectedParams":["body"]},"createSurveyUserItemResponse":{"method":"POST","path":"/survey_items/:surveyItemId/survey_user_item_response","optionalParams":["body","surveyItemResponseOptionIds"]},"createUserInvite":{"method":"POST","path":"/users/:userId/invites"},"deactivateSurvey":{"method":"DELETE","path":"/surveys/:surveyId/survey_activation"},"deactivateUser":{"method":"POST","path":"/users/:userId/deactivation"},"deleteAnnouncement":{"method":"DELETE","path":"/announcements/:announcementId"},"deleteDepartment":{"method":"DELETE","path":"/departments/:departmentId"},"deleteEvent":{"method":"DELETE","path":"/events/:eventId","optionalParams":["message"]},"deleteEventComment":{"method":"DELETE","path":"/events/:eventId/comments/:commentId"},"deleteEventLeaderboardAttribute":{"method":"DELETE","path":"/event_leaderboard_attributes/:eventLeaderboardAttributeId"},"deleteEventLeaderboardAttributeRsvp":{"method":"DELETE","path":"/event_leaderboard_attribute_rsvps/:eventLeaderboardAttributeRsvpId"},"deleteEventPhoto":{"method":"DELETE","path":"/events/:eventId/photos/:photoId"},"deleteEventVote":{"method":"DELETE","path":"/event_votes/:eventVoteId"},"deleteEventVoteEntry":{"method":"DELETE","path":"/event_vote_entries/:eventVoteEntryId"},"deleteExpense":{"method":"DELETE","path":"/events/:eventId/expenses/:expenseId"},"deleteInterest":{"method":"DELETE","path":"/interests/:interestId"},"deleteLocation":{"method":"DELETE","path":"/locations/:locationId"},"deleteOrganization":{"method":"DELETE","path":"/admin/organizations/:organizationId"},"deleteOrganizationBot":{"method":"DELETE","path":"/admin/organizations/:organizationId/bots/:botId"},"deleteOrganizationValue":{"method":"DELETE","path":"/organization_values/:organizationValueId"},"deletePhotoTag":{"method":"DELETE","path":"/photos/:photoId/photo_tags/:photoTagId"},"deleteRecognition":{"method":"DELETE","path":"/recognitions/:recognitionId"},"deleteRecognitionComment":{"method":"DELETE","path":"/recognitions/:recognitionId/comments/:commentId"},"deleteReward":{"method":"DELETE","path":"/rewards/:rewardId"},"deleteRewardRedemption":{"method":"DELETE","path":"/rewards/:rewardId/redemptions/:redemptionId"},"deleteSlackIntegration":{"method":"DELETE","path":"/slack_integrations/:slackIntegrationId"},"deleteSurvey":{"method":"DELETE","path":"/surveys/:surveyId"},"deleteSurveyItem":{"method":"DELETE","path":"/survey_items/:surveyItemId"},"deleteSurveyItemResponseOption":{"method":"DELETE","path":"/survey_item_response_options/:surveyItemResponseOptionId"},"deleteSurveyUserItemResponse":{"method":"DELETE","path":"/survey_items/:surveyItemId/survey_user_item_response"},"denyEventAttendance":{"method":"DELETE","path":"/events/:eventId/confirmation"},"disableStaticWidget":{"method":"DELETE","path":"/widgets","expectedParams":["widget"]},"duplicateEvent":{"method":"POST","path":"/events/:eventId/event_duplicates","expectedParams":["startsAt"],"optionalParams":["endsAt"]},"enableStaticWidget":{"method":"POST","path":"/widgets","expectedParams":["widget"]},"eventAutocompleteInvites":{"method":"GET","path":"/events/:eventId/autocomplete/event_invites","expectedParams":["query"]},"eventAutocompleteRsvps":{"method":"GET","path":"/events/:eventId/autocomplete/rsvps","expectedParams":["query"]},"exportEvents":{"method":"POST","path":"/exports/event_export"},"getAnnouncement":{"method":"GET","path":"/announcements/:announcementId"},"getBulkUserImport":{"method":"GET","path":"/bulk_user_imports/:bulkUserImportJobId"},"getDepartment":{"method":"GET","path":"/departments/:departmentId"},"getDepartmentEventParticipation":{"method":"GET","path":"/events/:eventId/department_event_participation"},"getEvent":{"method":"GET","path":"/events/:eventId"},"getEventAnalytics":{"method":"GET","path":"/analytics/events/:eventId"},"getEventComment":{"method":"GET","path":"/events/:eventId/comments/:commentId"},"getEventLeaderboardAttribute":{"method":"GET","path":"/event_leaderboard_attributes/:eventLeaderboardAttributeId"},"getEventPhoto":{"method":"GET","path":"/events/:eventId/photos/:photoId"},"getEventRsvp":{"method":"GET","path":"/events/:eventId/rsvps/:rsvpId"},"getEventVote":{"method":"GET","path":"/event_votes/:eventVoteId"},"getExpense":{"method":"GET","path":"/events/:eventId/expenses/:expenseId"},"getFeedback":{"method":"GET","path":"/feedbacks/:feedbackId"},"getInterest":{"method":"GET","path":"/interests/:interestId"},"getInvite":{"method":"GET","path":"/invites/:token"},"getLocation":{"method":"GET","path":"/locations/:locationId"},"getOrganization":{"method":"GET","path":"/admin/organizations/:organizationId"},"getOrganizationValue":{"method":"GET","path":"/organization_values/:organizationValueId"},"getOrganizationValueLeaderboard":{"method":"GET","path":"/leaderboard/organization_values"},"getPhotoGallery":{"method":"GET","path":"/gallery","optionalParams":["page","range"]},"getPointConfig":{"method":"GET","path":"/point_config"},"getPointLeaderboard":{"method":"GET","path":"/leaderboard/points"},"getProfile":{"method":"GET","path":"/profile"},"getProfileEmailSettings":{"method":"GET","path":"/profile/email_settings"},"getRecognition":{"method":"GET","path":"/recognitions/:recognitionId"},"getRecognitionComment":{"method":"GET","path":"/recognitions/:recognitionId/comments/:commentId"},"getReward":{"method":"GET","path":"/rewards/:rewardId"},"getRewardRedemption":{"method":"GET","path":"/rewards/:rewardId/redemptions/:redemptionId"},"getSurvey":{"method":"GET","path":"/surveys/:surveyId"},"getSurveyItem":{"method":"GET","path":"/survey_items/:surveyItemId"},"getSurveyItemResponseOption":{"method":"GET","path":"/survey_item_response_options/:surveyItemResponseOptionId"},"getUser":{"method":"GET","path":"/users/:userId"},"getUserEventTypeBreakdown":{"method":"GET","path":"/users/:userId/event_type_breakdown"},"getUserPointBreakdown":{"method":"GET","path":"/users/:userId/point_breakdown"},"getUserRecognitionLeaderboard":{"method":"GET","path":"/leaderboard/user_recognitions"},"incrementUserPoints":{"method":"POST","path":"/users/:userId/point_increments","expectedParams":["points"]},"listActiveAnnouncements":{"method":"GET","path":"/active_announcements","optionalParams":["page"]},"listAnnouncements":{"method":"GET","path":"/announcements","optionalParams":["page","active"]},"listContentModerationEvents":{"method":"GET","path":"/content_moderation_events","optionalParams":["page"]},"listDepartmentAnalytics":{"method":"GET","path":"/analytics/departments","optionalParams":["page"]},"listDepartmentUsers":{"method":"GET","path":"/departments/:departmentId/users","optionalParams":["page","includeDeactivated"]},"listDepartments":{"method":"GET","path":"/departments","optionalParams":["page"]},"listEventAnalytics":{"method":"GET","path":"/analytics/events","optionalParams":["page"]},"listEventCommentCheers":{"method":"GET","path":"/events/:event_id/comments/:comment_id/cheers","optionalParams":["page"]},"listEventComments":{"method":"GET","path":"/events/:eventId/comments","optionalParams":["page"]},"listEventLeaderboardAttributes":{"method":"GET","path":"/events/:eventId/event_leaderboard_attributes","optionalParams":["page"]},"listEventPhotos":{"method":"GET","path":"/events/:eventId/photos","optionalParams":["page"]},"listEventRsvps":{"method":"GET","path":"/events/:eventId/rsvps","optionalParams":["page","responseType"]},"listEventTags":{"method":"GET","path":"/event_tags","optionalParams":["page"]},"listEventVotes":{"method":"GET","path":"/events/:eventId/event_votes","optionalParams":["page"]},"listEvents":{"method":"GET","path":"/events","optionalParams":["page","range","locationIds","sort","when","organizationValueIds","eventType","sponsored"]},"listEventsByOrganization":{"method":"GET","path":"/admin/events"},"listExpenses":{"method":"GET","path":"/events/:eventId/expenses","optionalParams":["page"]},"listFeedbacks":{"method":"GET","path":"/feedbacks","optionalParams":["page","reviewed"]},"listInterestUsers":{"method":"GET","path":"/interests/:interestId/users","optionalParams":["page","includeDeactivated"]},"listInterests":{"method":"GET","path":"/interests","optionalParams":["page"]},"listInvites":{"method":"GET","path":"/invites","optionalParams":["page"]},"listLocations":{"method":"GET","path":"/locations","optionalParams":["page"]},"listOrganizationBots":{"method":"GET","path":"/admin/organizations/:organizationId/bots"},"listOrganizationValueEvents":{"method":"GET","path":"/organization_values/:organizationValueId/events","optionalParams":["page"]},"listOrganizationValueRecognitions":{"method":"GET","path":"/organization_values/:organizationValueId/recognitions","optionalParams":["page"]},"listOrganizationValues":{"method":"GET","path":"/organization_values","optionalParams":["page"]},"listOrganizations":{"method":"GET","path":"/admin/organizations","optionalParams":["page"]},"listPhotoTags":{"method":"GET","path":"/photos/:photoId/photo_tags","optionalParams":["page"]},"listProfileEventSurveys":{"method":"GET","path":"/profile/event_surveys","optionalParams":["filter"]},"listProfilePointIncrements":{"method":"GET","path":"/profile/point_increments","optionalParams":["page"]},"listProfilePointModifications":{"method":"GET","path":"/profile/point_modifications","optionalParams":["page"]},"listProfileRedemptions":{"method":"GET","path":"/profile/redemptions","optionalParams":["page"]},"listRecognitionCheers":{"method":"GET","path":"/recognitions/:recognitionId/cheers","optionalParams":["page"]},"listRecognitionCommentCheers":{"method":"GET","path":"/recognitions/:recognitionId/comments/:commentId/cheers","optionalParams":["page"]},"listRecognitionComments":{"method":"GET","path":"/recognitions/:recognitionId/comments","optionalParams":["page"]},"listRecognitions":{"method":"GET","path":"/recognitions","optionalParams":["page"]},"listRedemptions":{"method":"GET","path":"/redemptions","optionalParams":["page"]},"listRewardRedemptions":{"method":"GET","path":"/rewards/:rewardId/redemptions","optionalParams":["page"]},"listRewards":{"method":"GET","path":"/rewards","optionalParams":["page"]},"listSlackIntegrations":{"method":"GET","path":"/slack_integrations"},"listSurveyItemResponseOptions":{"method":"GET","path":"/survey_items/:surveyItemId/survey_item_response_options","optionalParams":["page"]},"listSurveyItems":{"method":"GET","path":"/surveys/:surveyId/survey_items","optionalParams":["page"]},"listSurveyResults":{"method":"GET","path":"/surveys/:surveyId/survey_results"},"listSurveySubmittedResponses":{"method":"GET","path":"/surveys/:surveyId/submitted_responses"},"listSurveys":{"method":"GET","path":"/surveys","optionalParams":["page"]},"listUserAnalytics":{"method":"GET","path":"/analytics/users","optionalParams":["page"]},"listUserHostedEvents":{"method":"GET","path":"/users/:userId/hosted_events","optionalParams":["page"]},"listUserRecognitions":{"method":"GET","path":"/users/:userId/recognitions","optionalParams":["page"]},"listUserRsvpdEvents":{"method":"GET","path":"/users/:userId/rsvpd_events","optionalParams":["when","sort"]},"listUsers":{"method":"GET","path":"/users","optionalParams":["page","includeDeactivated","departmentId","interestId","locationId"]},"listWidgetSurveys":{"method":"GET","path":"/widget_surveys","optionalParams":["active","completed","page"]},"markEventAsSponsored":{"method":"POST","path":"/events/:eventId/event_sponsorship"},"messageEventGuests":{"method":"POST","path":"/events/:eventId/event_notifications","expectedParams":["body"]},"reactivateUser":{"method":"DELETE","path":"/users/:userId/deactivation"},"registerUser":{"method":"POST","path":"/invites/:token/users","expectedParams":["password"]},"reorderSurveyItemResponseOptions":{"method":"PATCH","path":"/survey_items/:surveyItemId/survey_item_response_option_order","expectedParams":["order"]},"reorderSurveyItems":{"method":"PATCH","path":"/surveys/:surveyId/survey_item_order","expectedParams":["order"]},"reorderWidgets":{"method":"PATCH","path":"/widget_order","expectedParams":["order"]},"requestPasswordReset":{"method":"POST","path":"/password_resets","expectedParams":["email"]},"resetPassword":{"method":"PATCH","path":"/password_resets/:token","expectedParams":["password"]},"reviewFeedback":{"method":"PATCH","path":"/feedbacks/:feedbackId"},"sendInvite":{"method":"POST","path":"/invites","multipart":true,"expectedParams":["name","email"],"optionalParams":["locationId","departmentIds","interestNames","avatar","title"]},"subscribeToEventNotifications":{"method":"POST","path":"/events/:eventId/event_notification_subscription"},"unapproveEventVoteEntry":{"method":"DELETE","path":"/event_vote_entries/:eventVoteEntryId/event_vote_entry_approval"},"uncheerEventComment":{"method":"DELETE","path":"/events/:eventId/comments/:commentId/cheers"},"uncheerRecognition":{"method":"DELETE","path":"/recognitions/:recognitionId/cheers"},"uncheerRecognitionComment":{"method":"DELETE","path":"/recognitions/:recognitionId/comments/:commentId/cheers"},"unsubscribeFromEventNotifications":{"method":"DELETE","path":"/events/:eventId/event_notification_subscription"},"unvoteForEventVoteEntry":{"method":"DELETE","path":"/event_vote_entries/:eventVoteEntryId/event_vote_entry_rsvp"},"updateAnnouncement":{"method":"PATCH","path":"/announcements/:announcementId","multipart":true,"optionalParams":["title","body","active","image"]},"updateDepartment":{"method":"PATCH","path":"/departments/:departmentId","optionalParams":["name"]},"updateEvent":{"method":"PATCH","path":"/events/:eventId","multipart":true,"optionalParams":["name","details","startsAt","endsAt","eventType","sponsored","surveyId","image","organizationValueIds","location","visibility","cap","locationIds","inviteOnly","openInvites","eventTagNames"]},"updateEventComment":{"method":"PATCH","path":"/events/:eventId/comments/:commentId","expectedParams":["body"]},"updateEventLeaderboardAttribute":{"method":"PATCH","path":"/event_leaderboard_attributes/:eventLeaderboardAttributeId","optionalParams":["title","quantitative","sortDescending"]},"updateEventLeaderboardAttributeRsvp":{"method":"PATCH","path":"/event_leaderboard_attribute_rsvps/:eventLeaderboardAttributeRsvpId","expectedParams":["value"],"optionalParams":["rsvpId"]},"updateEventPhoto":{"method":"PATCH","path":"/events/:eventId/photos/:photoId","multipart":true,"optionalParams":["image","caption"]},"updateEventRsvp":{"method":"PATCH","path":"/events/:eventId/rsvps/:rsvpId","expectedParams":["responseType"],"optionalParams":["extra"]},"updateEventVote":{"method":"PATCH","path":"/event_votes/:eventVoteId","optionalParams":["title","maxVotes"]},"updateEventVoteEntry":{"method":"PATCH","path":"/event_vote_entries/:eventVoteEntryId","multipart":true,"optionalParams":["title","image"]},"updateExpense":{"method":"PATCH","path":"/events/:eventId/expenses/:expenseId","optionalParams":["description","amount"]},"updateInterest":{"method":"PATCH","path":"/interests/:interestId","expectedParams":["name"]},"updateLocation":{"method":"PATCH","path":"/locations/:locationId","expectedParams":["name"]},"updateOrganization":{"method":"PATCH","path":"/admin/organizations/:organizationId","multipart":true,"optionalParams":["name","primaryColor","secondaryColor","gamificationEnabled","logo","active","mode"]},"updateOrganizationValue":{"method":"PATCH","path":"/organization_values/:organizationValueId","expectedParams":["name"]},"updatePointConfig":{"method":"PATCH","path":"/point_config","optionalParams":["firstPublicEvent","eventWithTwoNew","avatar","interests","widgetSurvey","eventSurvey","recognition"]},"updateProfile":{"method":"PATCH","path":"/profile","multipart":true,"optionalParams":["name","email","departmentIds","interestNames","avatar","title","locationId"]},"updateProfileEmailSettings":{"method":"PATCH","path":"/profile/email_settings","optionalParams":["eventInvite","eventNotification","postEventSurvey","recognized","redemptionApproved","redemptionRequested","rsvpConfirmation"]},"updateRecognition":{"method":"PATCH","path":"/recognitions/:recognitionId","expectedParams":["body"],"optionalParams":["userIds"]},"updateRecognitionComment":{"method":"PATCH","path":"/recognitions/:recognitionId/comments/:commentId","expectedParams":["body"]},"updateReward":{"method":"PATCH","path":"/rewards/:rewardId","multipart":true,"optionalParams":["name","points","description","image"]},"updateRewardRedemption":{"method":"PATCH","path":"/rewards/:rewardId/redemptions/:redemptionId"},"updateSurvey":{"method":"PATCH","path":"/surveys/:surveyId","optionalParams":["title","points"]},"updateSurveyItem":{"method":"PATCH","path":"/survey_items/:surveyItemId","optionalParams":["prompt","itemType","minRange","maxRange"]},"updateSurveyItemResponseOption":{"method":"PATCH","path":"/survey_item_response_options/:surveyItemResponseOptionId","optionalParams":["body"]},"updateSurveyUserItemResponse":{"method":"PATCH","path":"/survey_items/:surveyItemId/survey_user_item_response","optionalParams":["body","surveyItemResponseOptionIds"]},"updateUser":{"method":"PATCH","path":"/users/:userId","multipart":true,"optionalParams":["name","email","departmentIds","interestNames","avatar","title","locationId","organizationAdmin"]},"voteForEventVoteEntry":{"method":"POST","path":"/event_vote_entries/:eventVoteEntryId/event_vote_entry_rsvp"}}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

__webpack_require__(7);

var _request = __webpack_require__(8);

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
      token: _state2.default.getToken(),
      params: actualParams,
      multipart: options.multipart || false
    });
  };

  Object.assign(apiCall, options);
  return apiCall;
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("url-polyfill");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(9);

var _stringCase = __webpack_require__(1);

var buildHeaders = function buildHeaders(options) {
  var headers = { "X-Client-Version": "0.0.59" };

  if (!options.multipart) {
    headers["Content-Type"] = "application/json";
  }
  if (typeof options.token === "string" && options.token.length) {
    headers["Authorization"] = "token " + options.token;
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

exports.default = function (method, url, options) {
  var request = buildRequest(method, url, options);

  return new Promise(function (resolve, reject) {
    fetch(request.url, request.options).then(function (response) {
      var success = Math.round(response.status / 200) === 1;

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
    }).catch(function (error) {
      return reject(error);
    });
  });
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ })
/******/ ]);
});