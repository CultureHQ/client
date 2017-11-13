(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("store/dist/store.modern"), require("isomorphic-fetch"));
	else if(typeof define === 'function' && define.amd)
		define(["store/dist/store.modern", "isomorphic-fetch"], factory);
	else if(typeof exports === 'object')
		exports["CultureHQ"] = factory(require("store/dist/store.modern"), require("isomorphic-fetch"));
	else
		root["CultureHQ"] = factory(root["store/dist/store.modern"], root["isomorphic-fetch"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_6__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _store = __webpack_require__(2);

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _calls = __webpack_require__(3);

var _calls2 = _interopRequireDefault(_calls);

var _apiCall = __webpack_require__(4);

var _apiCall2 = _interopRequireDefault(_apiCall);

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
    key: "signIn",
    value: function signIn(params) {
      return this.createApiKey(params).then(signInCallback);
    }
  }, {
    key: "signInWithOkta",
    value: function signInWithOkta(params) {
      return this.createOktaApiKey(params).then(signInCallback);
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
  }]);

  return CultureHQ;
}();

exports.default = CultureHQ;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("store/dist/store.modern");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {"activateSurvey":{"method":"POST","path":"/surveys/:surveyId/survey_activation"},"adminAutocompleteUsers":{"method":"GET","path":"/admin/autocomplete/users","expectedParams":["query"]},"approveEventVoteEntry":{"method":"POST","path":"/event_vote_entries/:eventVoteEntryId/event_vote_entry_approval"},"autocompleteUsers":{"method":"GET","path":"/autocomplete/users","expectedParams":["query"]},"bulkCreateEventPhotos":{"method":"POST","path":"/events/:eventId/albums","multipart":true,"expectedParams":["images"]},"changePassword":{"method":"PATCH","path":"/password","expectedParams":["oldPassword","newPassword"]},"checkInEventAttendee":{"method":"POST","path":"/events/:eventId/check_ins","expectedParams":["userId"],"optionalParams":["extra"]},"createAnnouncement":{"method":"POST","path":"/announcements","multipart":true,"expectedParams":["title","body","active","image"]},"createApiKey":{"method":"POST","path":"/api_keys","expectedParams":["email","password"]},"createBulkUserImport":{"method":"POST","path":"/bulk_user_imports","multipart":true,"expectedParams":["csvFile"]},"createComment":{"method":"POST","path":"/events/:eventId/comments","expectedParams":["body"],"optionalParams":["parentCommentId"]},"createDepartment":{"method":"POST","path":"/departments","expectedParams":["name"]},"createEvent":{"method":"POST","path":"/events","multipart":true,"expectedParams":["name","details","startsAt","endsAt","eventType"],"optionalParams":["sponsored","surveyId","image","organizationValueIds","location","visibility","cap","locationIds","inviteOnly","openInvites","inviteeIds","timezone"]},"createEventInvites":{"method":"POST","path":"/events/:eventId/event_invites","expectedParams":["userIds"]},"createEventLeaderboardAttribute":{"method":"POST","path":"/events/:eventId/event_leaderboard_attributes","expectedParams":["title"],"optionalParams":["quantitative","sortDescending"]},"createEventLeaderboardAttributeRsvp":{"method":"POST","path":"/event_leaderboard_attributes/:eventLeaderboardAttributeId/event_leaderboard_attribute_rsvps","expectedParams":["value"],"optionalParams":["rsvpId"]},"createEventPhoto":{"method":"POST","path":"/events/:eventId/photos","multipart":true,"expectedParams":["image"],"optionalParams":["caption"]},"createEventRsvp":{"method":"POST","path":"/events/:eventId/rsvps","expectedParams":["responseType"],"optionalParams":["extra"]},"createEventSurveyUserItemResponse":{"method":"POST","path":"/events/:eventId/survey_items/:surveyItemId/survey_user_item_response","expectedParams":["body","surveyItemResponseOptionIds"]},"createEventVote":{"method":"POST","path":"/events/:eventId/event_votes","expectedParams":["title"],"optionalParams":["maxVotes"]},"createEventVoteEntry":{"method":"POST","path":"/event_votes/:eventVoteId/event_vote_entries","multipart":true,"expectedParams":["title"],"optionalParams":["image"]},"createExpense":{"method":"POST","path":"/events/:eventId/expenses","expectedParams":["description","amount"]},"createFeedback":{"method":"POST","path":"/feedbacks","expectedParams":["body"],"optionalParams":["anonymous"]},"createInterest":{"method":"POST","path":"/interests","expectedParams":["name"]},"createLocation":{"method":"POST","path":"/locations","expectedParams":["name"]},"createOktaApiKey":{"method":"POST","path":"/oauth/okta/api_keys","expectedParams":["access_token","state"],"optionalParams":["scope","expires_in","token_type"]},"createOrganization":{"method":"POST","path":"/admin/organizations","expectedParams":["name"],"optionalParams":["primaryColor","secondaryColor","gamificationEnabled","logo","active"]},"createOrganizationBot":{"method":"POST","path":"/admin/organizations/:organizationId/bots"},"createOrganizationValue":{"method":"POST","path":"/organization_values","expectedParams":["name"]},"createPhotoTag":{"method":"POST","path":"/photos/:photoId/photo_tags","expectedParams":["userId"]},"createRecognition":{"method":"POST","path":"/recognitions","expectedParams":["body","userIds"]},"createReward":{"method":"POST","path":"/rewards","multipart":true,"expectedParams":["name","points"],"optionalParams":["description","image"]},"createRewardRedemption":{"method":"POST","path":"/rewards/:rewardId/redemptions"},"createSimulation":{"method":"POST","path":"/admin/simulation","expectedParams":["userId"]},"createSlackIntegration":{"method":"POST","path":"/slack_integrations","expectedParams":["code"]},"createSurvey":{"method":"POST","path":"/surveys","expectedParams":["title"],"optionalParams":["points","firstEventId"]},"createSurveyItem":{"method":"POST","path":"/surveys/:surveyId/survey_items","expectedParams":["prompt","itemType"],"optionalParams":["minRange","maxRange"]},"createSurveyItemResponseOption":{"method":"POST","path":"/survey_items/:surveyItemId/survey_item_response_options","expectedParams":["body"]},"createSurveyUserItemResponse":{"method":"POST","path":"/survey_items/:surveyItemId/survey_user_item_response","expectedParams":["body","surveyItemResponseOptionIds"]},"createUserInvite":{"method":"POST","path":"/users/:userId/invites"},"deactivateSurvey":{"method":"DELETE","path":"/surveys/:surveyId/survey_activation"},"deactivateUser":{"method":"POST","path":"/users/:userId/deactivation"},"deleteAnnouncement":{"method":"DELETE","path":"/announcements/:announcementId"},"deleteComment":{"method":"DELETE","path":"/events/:eventId/comments/:commentId"},"deleteDepartment":{"method":"DELETE","path":"/departments/:departmentId"},"deleteEventLeaderboardAttribute":{"method":"DELETE","path":"/event_leaderboard_attributes/:eventLeaderboardAttributeId"},"deleteEventLeaderboardAttributeRsvp":{"method":"DELETE","path":"/event_leaderboard_attribute_rsvps/:eventLeaderboardAttributeRsvpId"},"deleteEventPhoto":{"method":"DELETE","path":"/events/:eventId/photos/:photoId"},"deleteEventSurveyUserItemResponse":{"method":"DELETE","path":"/events/:eventId/survey_items/:surveyItemId/survey_user_item_response"},"deleteEventVote":{"method":"DELETE","path":"/event_votes/:eventVoteId"},"deleteEventVoteEntry":{"method":"DELETE","path":"/event_vote_entries/:eventVoteEntryId"},"deleteExpense":{"method":"DELETE","path":"/events/:eventId/expenses/:expenseId"},"deleteInterest":{"method":"DELETE","path":"/interests/:interestId"},"deleteLocation":{"method":"DELETE","path":"/locations/:locationId"},"deleteOrganization":{"method":"DELETE","path":"/admin/organizations/:organizationId"},"deleteOrganizationBot":{"method":"DELETE","path":"/admin/organizations/:organizationId/bots/:botId"},"deleteOrganizationValue":{"method":"DELETE","path":"/organization_values/:organizationValueId"},"deletePhotoTag":{"method":"DELETE","path":"/photos/:photoId/photo_tags/:photoTagId"},"deleteRecognition":{"method":"DELETE","path":"/recognitions/:recognitionId"},"deleteReward":{"method":"DELETE","path":"/rewards/:rewardId"},"deleteRewardRedemption":{"method":"DELETE","path":"/rewards/:rewardId/redemptions/:redemptionId"},"deleteSlackIntegration":{"method":"DELETE","path":"/slack_integrations/:slackIntegrationId"},"deleteSurvey":{"method":"DELETE","path":"/surveys/:surveyId"},"deleteSurveyItem":{"method":"DELETE","path":"/survey_items/:surveyItemId"},"deleteSurveyItemResponseOption":{"method":"DELETE","path":"/survey_item_response_options/:surveyItemResponseOptionId"},"deleteSurveyUserItemResponse":{"method":"DELETE","path":"/survey_items/:surveyItemId/survey_user_item_response"},"duplicateEvent":{"method":"POST","path":"/events/:eventId/event_duplicates","expectedParams":["startsAt"],"optionalParams":["endsAt"]},"getAnnouncement":{"method":"GET","path":"/announcements/:announcementId"},"getBulkUserImport":{"method":"GET","path":"/bulk_user_imports/:bulkUserImportJobId"},"getComment":{"method":"GET","path":"/events/:eventId/comments/:commentId"},"getDepartment":{"method":"GET","path":"/departments/:departmentId"},"getDepartmentEventParticipation":{"method":"GET","path":"/events/:eventId/department_event_participation"},"getEvent":{"method":"GET","path":"/events/:eventId"},"getEventAnalytics":{"method":"GET","path":"/analytics/events/:eventId"},"getEventLeaderboardAttribute":{"method":"GET","path":"/event_leaderboard_attributes/:eventLeaderboardAttributeId"},"getEventPhoto":{"method":"GET","path":"/events/:eventId/photos/:photoId"},"getEventRsvp":{"method":"GET","path":"/events/:eventId/rsvps/:rsvpId"},"getEventVote":{"method":"GET","path":"/event_votes/:eventVoteId"},"getExpense":{"method":"GET","path":"/events/:eventId/expenses/:expenseId"},"getFeedback":{"method":"GET","path":"/feedbacks/:feedbackId"},"getInterest":{"method":"GET","path":"/interests/:interestId"},"getInvite":{"method":"GET","path":"/invites/:token"},"getLocation":{"method":"GET","path":"/locations/:locationId"},"getOrganization":{"method":"GET","path":"/admin/organizations/:organizationId"},"getOrganizationValue":{"method":"GET","path":"/organization_values/:organizationValueId"},"getOrganizationValueLeaderboard":{"method":"GET","path":"/leaderboard/organization_values"},"getPhotoGallery":{"method":"GET","path":"/gallery","optionalParams":["page","range"]},"getPointConfig":{"method":"GET","path":"/point_config"},"getPointLeaderboard":{"method":"GET","path":"/leaderboard/points"},"getProfile":{"method":"GET","path":"/profile"},"getRecognition":{"method":"GET","path":"/recognitions/:recognitionId"},"getReward":{"method":"GET","path":"/rewards/:rewardId"},"getRewardRedemption":{"method":"GET","path":"/rewards/:rewardId/redemptions/:redemptionId"},"getSurvey":{"method":"GET","path":"/surveys/:surveyId"},"getSurveyItem":{"method":"GET","path":"/survey_items/:surveyItemId"},"getSurveyItemResponseOption":{"method":"GET","path":"/survey_item_response_options/:surveyItemResponseOptionId"},"getSurveyUserItemResponse":{"method":"GET","path":"/events/:eventId/survey_items/:surveyItemId/survey_user_item_response"},"getUser":{"method":"GET","path":"/users/:userId"},"getUserEventTypeBreakdown":{"method":"GET","path":"/users/:userId/event_type_breakdown"},"getUserPointBreakdown":{"method":"GET","path":"/users/:userId/point_breakdown"},"getUserRecognitionLeaderboard":{"method":"GET","path":"/leaderboard/user_recognitions"},"incrementUserPoints":{"method":"POST","path":"/users/:userId/point_increments","expectedParams":["points"]},"listActiveAnnouncements":{"method":"GET","path":"/active_announcements","optionalParams":["page"]},"listActiveSurveys":{"method":"GET","path":"/active_surveys","optionalParams":["page"]},"listAnnouncements":{"method":"GET","path":"/announcements","optionalParams":["page"]},"listComments":{"method":"GET","path":"/events/:eventId/comments","optionalParams":["page"]},"listDepartmentAnalytics":{"method":"GET","path":"/analytics/departments","optionalParams":["page"]},"listDepartmentUsers":{"method":"GET","path":"/departments/:departmentId/users","optionalParams":["page","includeDeactivated"]},"listDepartments":{"method":"GET","path":"/departments","optionalParams":["page"]},"listEventAnalytics":{"method":"GET","path":"/analytics/events","optionalParams":["page"]},"listEventLeaderboardAttributes":{"method":"GET","path":"/events/:eventId/event_leaderboard_attributes","optionalParams":["page"]},"listEventPhotos":{"method":"GET","path":"/events/:eventId/photos","optionalParams":["page"]},"listEventRsvps":{"method":"GET","path":"/events/:eventId/rsvps","optionalParams":["page","responseType"]},"listEventSurveyResults":{"method":"GET","path":"/events/:eventId/survey_results"},"listEventSurveySubmittedResponses":{"method":"GET","path":"/events/:eventId/submitted_responses"},"listEventVotes":{"method":"GET","path":"/events/:eventId/event_votes","optionalParams":["page"]},"listEvents":{"method":"GET","path":"/events","optionalParams":["page","range","locationIds","sort","when"]},"listEventsByOrganization":{"method":"GET","path":"/admin/events"},"listExpenses":{"method":"GET","path":"/events/:eventId/expenses","optionalParams":["page"]},"listFeedbacks":{"method":"GET","path":"/feedbacks","optionalParams":["page","reviewed"]},"listInterestUsers":{"method":"GET","path":"/interests/:interestId/users","optionalParams":["page","includeDeactivated"]},"listInterests":{"method":"GET","path":"/interests","optionalParams":["page"]},"listInvites":{"method":"GET","path":"/invites","optionalParams":["page"]},"listLocations":{"method":"GET","path":"/locations","optionalParams":["page"]},"listOrganizationBots":{"method":"GET","path":"/admin/organizations/:organizationId/bots"},"listOrganizationValueEvents":{"method":"GET","path":"/organization_values/:organizationValueId/events","optionalParams":["page"]},"listOrganizationValueRecognitions":{"method":"GET","path":"/organization_values/:organizationValueId/recognitions","optionalParams":["page"]},"listOrganizationValues":{"method":"GET","path":"/organization_values","optionalParams":["page"]},"listOrganizations":{"method":"GET","path":"/admin/organizations","optionalParams":["page"]},"listPhotoTags":{"method":"GET","path":"/photos/:photoId/photo_tags","optionalParams":["page"]},"listProfileEventSurveys":{"method":"GET","path":"/profile/event_surveys","optionalParams":["filter"]},"listRecognitions":{"method":"GET","path":"/recognitions","optionalParams":["page"]},"listRedemptions":{"method":"GET","path":"/redemptions","optionalParams":["page"]},"listRewardRedemptions":{"method":"GET","path":"/rewards/:rewardId/redemptions","optionalParams":["page"]},"listRewards":{"method":"GET","path":"/rewards","optionalParams":["page"]},"listSlackIntegrations":{"method":"GET","path":"/slack_integrations"},"listSurveyItemResponseOptions":{"method":"GET","path":"/survey_items/:surveyItemId/survey_item_response_options","optionalParams":["page"]},"listSurveyItems":{"method":"GET","path":"/surveys/:surveyId/survey_items","optionalParams":["page"]},"listSurveyResults":{"method":"GET","path":"/surveys/:surveyId/survey_results"},"listSurveySubmittedResponses":{"method":"GET","path":"/surveys/:surveyId/submitted_responses"},"listSurveys":{"method":"GET","path":"/surveys","optionalParams":["page"]},"listUserAnalytics":{"method":"GET","path":"/analytics/users","optionalParams":["page"]},"listUserAttendedEvents":{"method":"GET","path":"/users/:userId/attended_events"},"listUserHostedEvents":{"method":"GET","path":"/users/:userId/hosted_events","optionalParams":["page"]},"listUserRecognitions":{"method":"GET","path":"/users/:userId/recognitions","optionalParams":["page"]},"listUsers":{"method":"GET","path":"/users","optionalParams":["page","includeDeactivated"]},"markEventAsSponsored":{"method":"POST","path":"/events/:eventId/event_sponsorship"},"messageEventGuests":{"method":"POST","path":"/events/:eventId/event_notifications","expectedParams":["body"]},"reactivateUser":{"method":"DELETE","path":"/users/:userId/deactivation"},"registerUser":{"method":"POST","path":"/invites/:token/users","expectedParams":["password"]},"requestPasswordReset":{"method":"POST","path":"/password_resets","expectedParams":["email"]},"resetPassword":{"method":"PATCH","path":"/password_resets/:token","expectedParams":["password"]},"reviewFeedback":{"method":"PATCH","path":"/feedbacks/:feedbackId"},"sendInvite":{"method":"POST","path":"/invites","expectedParams":["name","email","locationId"],"optionalParams":["departmentIds","interestNames","avatar","title"]},"subscribeToEventNotifications":{"method":"POST","path":"/events/:eventId/event_notification_subscription"},"unapproveEventVoteEntry":{"method":"DELETE","path":"/event_vote_entries/:eventVoteEntryId/event_vote_entry_approval"},"unsubscribeFromEventNotifications":{"method":"DELETE","path":"/events/:eventId/event_notification_subscription"},"unvoteForEventVoteEntry":{"method":"DELETE","path":"/event_vote_entries/:eventVoteEntryId/event_vote_entry_rsvp"},"updateAnnouncement":{"method":"PATCH","path":"/announcements/:announcementId","multipart":true,"optionalParams":["title","body","active","image"]},"updateComment":{"method":"PATCH","path":"/events/:eventId/comments/:commentId","expectedParams":["body"]},"updateDepartment":{"method":"PATCH","path":"/departments/:departmentId","optionalParams":["name"]},"updateEvent":{"method":"PATCH","path":"/events/:eventId","optionalParams":["name","details","startsAt","endsAt","eventType","sponsored","surveyId","image","organizationValueIds","location","visibility","cap","locationIds","inviteOnly","openInvites"]},"updateEventLeaderboardAttribute":{"method":"PATCH","path":"/event_leaderboard_attributes/:eventLeaderboardAttributeId","optionalParams":["title","quantitative","sortDescending"]},"updateEventLeaderboardAttributeRsvp":{"method":"PATCH","path":"/event_leaderboard_attribute_rsvps/:eventLeaderboardAttributeRsvpId","expectedParams":["value"],"optionalParams":["rsvpId"]},"updateEventPhoto":{"method":"PATCH","path":"/events/:eventId/photos/:photoId","multipart":true,"optionalParams":["image","caption"]},"updateEventRsvp":{"method":"PATCH","path":"/events/:eventId/rsvps/:rsvpId","expectedParams":["responseType"],"optionalParams":["extra"]},"updateEventSurveyUserItemResponse":{"method":"PATCH","path":"/events/:eventId/survey_items/:surveyItemId/survey_user_item_response","optionalParams":["body","surveyItemResponseOptionIds"]},"updateEventVote":{"method":"PATCH","path":"/event_votes/:eventVoteId","optionalParams":["title","maxVotes"]},"updateEventVoteEntry":{"method":"PATCH","path":"/event_vote_entries/:eventVoteEntryId","optionalParams":["title","image"]},"updateExpense":{"method":"PATCH","path":"/events/:eventId/expenses/:expenseId","optionalParams":["description","amount"]},"updateInterest":{"method":"PATCH","path":"/interests/:interestId","expectedParams":["name"]},"updateLocation":{"method":"PATCH","path":"/locations/:locationId","expectedParams":["name"]},"updateOrganization":{"method":"PATCH","path":"/admin/organizations/:organizationId","optionalParams":["name","primaryColor","secondaryColor","gamificationEnabled","logo","active"]},"updateOrganizationValue":{"method":"PATCH","path":"/organization_values/:organizationValueId","expectedParams":["name"]},"updatePointConfig":{"method":"PATCH","path":"/point_config","optionalParams":["firstPublicEvent","eventWithTwoNew","avatar","interests","widgetSurvey","eventSurvey","recognition"]},"updateProfile":{"method":"PATCH","path":"/profile","multipart":true,"optionalParams":["name","email","departmentIds","interestNames","avatar","title","locationId"]},"updateRecognition":{"method":"PATCH","path":"/recognitions/:recognitionId","expectedParams":["body"],"optionalParams":["userIds"]},"updateReward":{"method":"PATCH","path":"/rewards/:rewardId","multipart":true,"optionalParams":["name","points","description","image"]},"updateRewardRedemption":{"method":"PATCH","path":"/rewards/:rewardId/redemptions/:redemptionId"},"updateSurvey":{"method":"PATCH","path":"/surveys/:surveyId","optionalParams":["title","points"]},"updateSurveyItem":{"method":"PATCH","path":"/survey_items/:surveyItemId","optionalParams":["prompt","itemType","minRange","maxRange"]},"updateSurveyItemResponseOption":{"method":"PATCH","path":"/survey_item_response_options/:surveyItemResponseOptionId","optionalParams":["body"]},"updateSurveyUserItemResponse":{"method":"PATCH","path":"/survey_items/:surveyItemId/survey_user_item_response","optionalParams":["body","surveyItemResponseOptionIds"]},"updateUser":{"method":"PATCH","path":"/users/:userId","multipart":true,"optionalParams":["name","email","departmentIds","interestNames","avatar","title","locationId","organizationAdmin"]},"voteForEventVoteEntry":{"method":"POST","path":"/event_vote_entries/:eventVoteEntryId/event_vote_entry_rsvp"}}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _request = __webpack_require__(5);

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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(6);

var _stringCase = __webpack_require__(7);

var buildHeaders = function buildHeaders(options) {
  var headers = { "X-Client-Version": "0.0.33" };

  if (!options.multipart) {
    headers["Content-Type"] = "application/json";
  }
  if (typeof options.token === "string" && options.token.length) {
    headers["Authorization"] = "token " + options.token;
  }

  return headers;
};

var buildRequest = function buildRequest(method, url, options) {
  var reqOptions = { headers: buildHeaders(options), method: method };
  var params = (0, _stringCase.snakerize)(options.params);

  if (method === "GET") {
    Object.keys(params).forEach(function (key) {
      return url.searchParams.append(key, params[key]);
    });
  } else if (options.multipart) {
    var formData = new FormData();

    Object.keys(params).forEach(function (key) {
      if (Array.isArray(params[key])) {
        params[key].forEach(function (nestedValue) {
          return formData.append(key + "[]", nestedValue);
        });
      } else {
        formData.append(key, params[key]);
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
/* 6 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 7 */
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
  if ((typeof object === "undefined" ? "undefined" : _typeof(object)) !== "object" || object === null) {
    return object;
  }

  if (Array.isArray(object)) {
    return object.map(function (element) {
      return modifyKeys(element, stringFunc);
    });
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

/***/ })
/******/ ]);
});