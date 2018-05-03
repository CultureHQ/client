!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CultureHQ=t():e.CultureHQ=t()}(global,function(){return function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:a})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n.w={},n(n.s=11)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.startSwimming=t.swim=void 0,n(2);var a={queue:[],started:!1,interval:null};t.swim=function(e){a.started&&a.queue.push(e)},t.startSwimming=function(e){var t=e+"/events";a.started=!0,a.interval=setInterval(function(){var e=a.queue.shift();e&&fetch(t,{method:"POST",body:e,mode:"no-cors"}).catch(function(){a.started=!1,clearInterval(a.interval)})},200)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function(e){for(var t=/_([a-z])/,n=void 0;null!==(n=t.exec(e));)e=e.replace(n[0],n[1].toUpperCase());return e},s=function(e){for(var t=/([A-Z])/,n=void 0;null!==(n=t.exec(e));)e=e.replace(n[0],"_"+n[1].toLowerCase());return e},i=function e(t,n){if("object"!==(void 0===t?"undefined":a(t))||null===t)return t;if(Array.isArray(t))return t.map(function(t){return e(t,n)});if(!Object.keys(t).length)return t;var o={},s=void 0;return Object.keys(t).forEach(function(a){(function(e){return e&&("[object Object]"===e.toString()||Array.isArray(e))})(s=t[a])&&(s=e(s,n)),o[n(a)]=s}),o};t.camelize=function(e){return i(e,o)},t.snakerize=function(e){return i(e,s)}},function(e,t){e.exports=require("isomorphic-fetch")},function(e){e.exports={activateSurvey:{method:"POST",path:"/surveys/:surveyId/survey_activation"},adminAutocompleteUsers:{method:"GET",path:"/admin/autocomplete/users",expectedParams:["query"]},adminSendInvite:{method:"POST",path:"/admin/organizations/:organizationId/invites",multipart:!0,expectedParams:["name","email"],optionalParams:["locationName","departmentNames","interestNames","avatar","title"]},autocompleteUsers:{method:"GET",path:"/autocomplete/users",expectedParams:["query"],optionalParams:["includeDeactivated","inviteStatus"]},bulkCreateEventPhotos:{method:"POST",path:"/events/:eventId/albums",multipart:!0,expectedParams:["images"]},cancelEvent:{method:"POST",path:"/events/:eventId/event_cancellations",optionalParams:["message"]},changePassword:{method:"PATCH",path:"/password",expectedParams:["oldPassword","newPassword"]},checkInEventAttendee:{method:"POST",path:"/events/:eventId/check_ins",expectedParams:["userId"]},cheerEventComment:{method:"POST",path:"/events/:eventId/comments/:commentId/cheers"},cheerEventPhoto:{method:"POST",path:"/events/:eventId/photos/:photoId/cheers"},cheerEventPhotoComment:{method:"POST",path:"/events/:eventId/photos/:photoId/comments/:commentId/cheers"},cheerRecognition:{method:"POST",path:"/recognitions/:recognitionId/cheers"},cheerRecognitionComment:{method:"POST",path:"/recognitions/:recognitionId/comments/:commentId/cheers"},cheerUserActivity:{method:"POST",path:"/user_activities/:userActivityId/cheers"},cheerUserActivityComment:{method:"POST",path:"/user_activities/:userActivityId/comments/:commentId/cheers"},confirmEventAttendance:{method:"POST",path:"/events/:eventId/confirmation"},createAnnouncement:{method:"POST",path:"/announcements",multipart:!0,expectedParams:["title","active"],optionalParams:["body","image"]},createApiKey:{method:"POST",path:"/api_keys",expectedParams:["email","password"]},createDepartment:{method:"POST",path:"/departments",expectedParams:["name"]},createEvent:{method:"POST",path:"/events",multipart:!0,expectedParams:["name","startsAt","endsAt","eventType"],optionalParams:["details","sponsored","surveyId","image","organizationValueIds","location","visibility","cap","locationIds","inviteOnly","openInvites","inviteeIds","timezone","interestNames","allLocations"]},createEventComment:{method:"POST",path:"/events/:eventId/comments",expectedParams:["body"],optionalParams:["parentCommentId"]},createEventInvites:{method:"POST",path:"/events/:eventId/event_invites",optionalParams:["userIds","locationIds","interestIds","departmentIds"]},createEventPhoto:{method:"POST",path:"/events/:eventId/photos",multipart:!0,expectedParams:["image"],optionalParams:["caption"]},createEventPhotoComment:{method:"POST",path:"/events/:eventId/photos/:photoId/comments",expectedParams:["body"],optionalParams:["parentCommentId"]},createEventRsvp:{method:"POST",path:"/events/:eventId/rsvps",expectedParams:["responseType"]},createExpense:{method:"POST",path:"/events/:eventId/expenses",expectedParams:["description","amount"],optionalParams:["incurredAt"]},createFeedback:{method:"POST",path:"/feedbacks",expectedParams:["body"],optionalParams:["anonymous"]},createInterest:{method:"POST",path:"/interests",expectedParams:["name"]},createLocation:{method:"POST",path:"/locations",expectedParams:["name"]},createMeeting:{method:"POST",path:"/meetings",optionalParams:["departmentIds","interestIds","locationIds"]},createOrganization:{method:"POST",path:"/admin/organizations",multipart:!0,expectedParams:["name"],optionalParams:["gamificationEnabled","logo","active","mode","googleSigninEnabled","userCreatedSlackIntegrationsEnabled","userCreatedSurveysEnabled","feedbackEnabled","userCreatedInvitesEnabled","accountInfoEnabled"]},createOrganizationValue:{method:"POST",path:"/organization_values",expectedParams:["name"]},createPhotoTag:{method:"POST",path:"/photos/:photoId/photo_tags",expectedParams:["userId"]},createProfileNotificationView:{method:"POST",path:"/profile/notification_views"},createProfilePointNotificationView:{method:"POST",path:"/profile/point_notification_views"},createRecognition:{method:"POST",path:"/recognitions",expectedParams:["body","userIds"]},createRecognitionComment:{method:"POST",path:"/recognitions/:recognitionId/comments",expectedParams:["body"],optionalParams:["parentCommentId"]},createSSOAgreement:{method:"POST",path:"/sso/agreement"},createSession:{method:"POST",path:"/sessions",expectedParams:["email"]},createSimulation:{method:"POST",path:"/admin/simulation",expectedParams:["userId"]},createSlackIntegration:{method:"POST",path:"/slack_integrations",expectedParams:["code"]},createSurvey:{method:"POST",path:"/surveys",expectedParams:["title"],optionalParams:["points","eventId","viewableResults"]},createSurveyItem:{method:"POST",path:"/surveys/:surveyId/survey_items",expectedParams:["prompt","itemType"],optionalParams:["minRange","maxRange"]},createSurveyItemResponseOption:{method:"POST",path:"/survey_items/:surveyItemId/survey_item_response_options",expectedParams:["body"]},createSurveyUserItemResponse:{method:"POST",path:"/survey_items/:surveyItemId/survey_user_item_response",optionalParams:["body","surveyItemResponseOptionIds"]},createUserActivityComment:{method:"POST",path:"/user_activities/:userActivityId/comments",expectedParams:["body"],optionalParams:["parentCommentId"]},createUserInvite:{method:"POST",path:"/users/:userId/invites"},deactivateSurvey:{method:"DELETE",path:"/surveys/:surveyId/survey_activation"},deactivateUser:{method:"POST",path:"/users/:userId/deactivation"},deleteAnnouncement:{method:"DELETE",path:"/announcements/:announcementId"},deleteDepartment:{method:"DELETE",path:"/departments/:departmentId"},deleteEvent:{method:"DELETE",path:"/events/:eventId",optionalParams:["message"]},deleteEventComment:{method:"DELETE",path:"/events/:eventId/comments/:commentId"},deleteEventPhoto:{method:"DELETE",path:"/events/:eventId/photos/:photoId"},deleteEventPhotoComment:{method:"DELETE",path:"/events/:eventId/photos/:photoId/comments/:commentId"},deleteExpense:{method:"DELETE",path:"/events/:eventId/expenses/:expenseId"},deleteInterest:{method:"DELETE",path:"/interests/:interestId"},deleteLocation:{method:"DELETE",path:"/locations/:locationId"},deleteOrganization:{method:"DELETE",path:"/admin/organizations/:organizationId"},deleteOrganizationValue:{method:"DELETE",path:"/organization_values/:organizationValueId"},deletePhotoTag:{method:"DELETE",path:"/photos/:photoId/photo_tags/:photoTagId"},deleteRecognition:{method:"DELETE",path:"/recognitions/:recognitionId"},deleteRecognitionComment:{method:"DELETE",path:"/recognitions/:recognitionId/comments/:commentId"},deleteSession:{method:"DELETE",path:"/session"},deleteSlackIntegration:{method:"DELETE",path:"/slack_integrations/:slackIntegrationId"},deleteSurvey:{method:"DELETE",path:"/surveys/:surveyId"},deleteSurveyItem:{method:"DELETE",path:"/survey_items/:surveyItemId"},deleteSurveyItemResponseOption:{method:"DELETE",path:"/survey_item_response_options/:surveyItemResponseOptionId"},deleteUserActivityComment:{method:"DELETE",path:"/user_activities/:userActivityId/comments/:commentId"},denyEventAttendance:{method:"DELETE",path:"/events/:eventId/confirmation"},disableStaticWidget:{method:"DELETE",path:"/widgets",expectedParams:["widget"]},duplicateEvent:{method:"POST",path:"/events/:eventId/event_duplicates",expectedParams:["startsAt"],optionalParams:["endsAt"]},enableStaticWidget:{method:"POST",path:"/widgets",expectedParams:["widget"]},eventAutocompleteInvites:{method:"GET",path:"/events/:eventId/autocomplete/event_invites",expectedParams:["query"]},eventAutocompleteRsvps:{method:"GET",path:"/events/:eventId/autocomplete/rsvps",expectedParams:["query"]},exportEvents:{method:"POST",path:"/exports/event_export"},flagAvatar:{method:"POST",path:"/users/:userId/flags",optionalParams:["message"]},flagComment:{method:"POST",path:"/comments/:commentId/flags",optionalParams:["message"]},flagDepartment:{method:"POST",path:"/departments/:departmentId/flags",optionalParams:["message"]},flagEvent:{method:"POST",path:"/events/:eventId/flags",optionalParams:["message"]},flagInterest:{method:"POST",path:"/interests/:interestId/flags",optionalParams:["message"]},flagLocation:{method:"POST",path:"/locations/:locationId/flags",optionalParams:["message"]},flagPhoto:{method:"POST",path:"/photos/:photoId/flags",optionalParams:["message"]},flagRecognition:{method:"POST",path:"/recognitions/:recognitionId/flags",optionalParams:["message"]},getAnnouncement:{method:"GET",path:"/announcements/:announcementId"},getDepartment:{method:"GET",path:"/departments/:departmentId"},getDepartmentEventParticipation:{method:"GET",path:"/events/:eventId/department_event_participation"},getEvent:{method:"GET",path:"/events/:eventId"},getEventAnalytics:{method:"GET",path:"/analytics/events/:eventId"},getEventPhoto:{method:"GET",path:"/events/:eventId/photos/:photoId"},getEventRsvp:{method:"GET",path:"/events/:eventId/rsvps/:rsvpId"},getExpense:{method:"GET",path:"/events/:eventId/expenses/:expenseId"},getFeedback:{method:"GET",path:"/feedbacks/:feedbackId"},getInterest:{method:"GET",path:"/interests/:interestId"},getInvite:{method:"GET",path:"/invites/:token"},getLocation:{method:"GET",path:"/locations/:locationId"},getOrganization:{method:"GET",path:"/admin/organizations/:organizationId"},getOrganizationValue:{method:"GET",path:"/organization_values/:organizationValueId"},getOrganizationValueLeaderboard:{method:"GET",path:"/leaderboard/organization_values"},getPhotoGallery:{method:"GET",path:"/gallery",optionalParams:["page","range"]},getPointLeaderboard:{method:"GET",path:"/leaderboard/points"},getProfile:{method:"GET",path:"/profile"},getProfileEmailSettings:{method:"GET",path:"/profile/email_settings"},getProfilePointStanding:{method:"GET",path:"/profile/point_standing"},getRecognition:{method:"GET",path:"/recognitions/:recognitionId"},getSurvey:{method:"GET",path:"/surveys/:surveyId"},getSurveyItem:{method:"GET",path:"/survey_items/:surveyItemId"},getSurveyItemResponseOption:{method:"GET",path:"/survey_item_response_options/:surveyItemResponseOptionId"},getSurveyUserItemResponse:{method:"GET",path:"/survey_items/:surveyItemId/survey_user_item_response"},getUser:{method:"GET",path:"/users/:userId"},getUserEventTypeBreakdown:{method:"GET",path:"/users/:userId/event_type_breakdown"},getUserPointBreakdown:{method:"GET",path:"/users/:userId/point_breakdown"},getUserPointIncrements:{method:"GET",path:"/users/:userId/point_increments",optionalParams:["page"]},getUserRecognitionLeaderboard:{method:"GET",path:"/leaderboard/user_recognitions"},incrementUserPoints:{method:"POST",path:"/users/:userId/point_increments",expectedParams:["points"]},invalidateOtherApiKeys:{method:"DELETE",path:"/api_keys"},listActiveAnnouncements:{method:"GET",path:"/active_announcements",optionalParams:["page"]},listAnnouncements:{method:"GET",path:"/announcements",optionalParams:["page","active"]},listApiKeys:{method:"GET",path:"/api_keys"},listDepartmentAnalytics:{method:"GET",path:"/analytics/departments",optionalParams:["page"]},listDepartments:{method:"GET",path:"/departments",optionalParams:["page"]},listEventAnalytics:{method:"GET",path:"/analytics/events",optionalParams:["page"]},listEventCommentCheers:{method:"GET",path:"/events/:eventId/comments/:commentId/cheers",optionalParams:["page"]},listEventComments:{method:"GET",path:"/events/:eventId/comments",optionalParams:["page"]},listEventInterests:{method:"GET",path:"/events/interests",optionalParams:["page"]},listEventPhotoCheers:{method:"GET",path:"/events/:eventId/photos/:photoId/cheers",optionalParams:["page"]},listEventPhotoCommentCheers:{method:"GET",path:"/events/:eventId/photos/:photoId/comments/:commentId/cheers",optionalParams:["page"]},listEventPhotoComments:{method:"GET",path:"/events/:eventId/photos/:photoId/comments",optionalParams:["page"]},listEventPhotos:{method:"GET",path:"/events/:eventId/photos",optionalParams:["page"]},listEventRsvps:{method:"GET",path:"/events/:eventId/rsvps",optionalParams:["page","responseType"]},listEvents:{method:"GET",path:"/events",optionalParams:["page","range","locationIds","sort","when","organizationValueIds","eventTypes","sponsored","interestIds","allLocations","userRelation"]},listEventsByOrganization:{method:"GET",path:"/admin/events"},listExpenses:{method:"GET",path:"/events/:eventId/expenses",optionalParams:["page"]},listFeedbacks:{method:"GET",path:"/feedbacks",optionalParams:["page","reviewed"]},listFlags:{method:"GET",path:"/flags",optionalParams:["page","reviewed"]},listInterests:{method:"GET",path:"/interests",optionalParams:["page"]},listLocations:{method:"GET",path:"/locations",optionalParams:["page"]},listOrganizationValueEvents:{method:"GET",path:"/organization_values/:organizationValueId/events",optionalParams:["page"]},listOrganizationValueRecognitions:{method:"GET",path:"/organization_values/:organizationValueId/recognitions",optionalParams:["page"]},listOrganizationValues:{method:"GET",path:"/organization_values",optionalParams:["page"]},listOrganizations:{method:"GET",path:"/admin/organizations",optionalParams:["page"]},listPhotoTags:{method:"GET",path:"/photos/:photoId/photo_tags",optionalParams:["page"]},listProfileAvailableWidgetSurveys:{method:"GET",path:"/profile/widget_surveys/available_surveys",optionalParams:["page"]},listProfileCompletedWidgetSurveys:{method:"GET",path:"/profile/widget_surveys/completed_surveys",optionalParams:["page"]},listProfileEventSurveys:{method:"GET",path:"/profile/event_surveys"},listProfileManageableWidgetSurveys:{method:"GET",path:"/profile/widget_surveys/manageable_surveys",optionalParams:["page"]},listProfileNotifications:{method:"GET",path:"/profile/notifications",optionalParams:["seen","page"]},listProfilePointNotifications:{method:"GET",path:"/profile/point_notifications",optionalParams:["seen","page"]},listRecognitionCheers:{method:"GET",path:"/recognitions/:recognitionId/cheers",optionalParams:["page"]},listRecognitionCommentCheers:{method:"GET",path:"/recognitions/:recognitionId/comments/:commentId/cheers",optionalParams:["page"]},listRecognitionComments:{method:"GET",path:"/recognitions/:recognitionId/comments",optionalParams:["page"]},listRecognitions:{method:"GET",path:"/recognitions",optionalParams:["page","locationIds","departmentIds","organizationValueIds","type"]},listRecognitionsOrganizationValues:{method:"GET",path:"/recognitions/organization_values"},listRecognitionsRecognizedUsers:{method:"GET",path:"/recognitions/recognized_users"},listRecognitionsRecognizingUsers:{method:"GET",path:"/recognitions/recognizing_users"},listSlackIntegrations:{method:"GET",path:"/slack_integrations"},listSurveyItemResponseOptions:{method:"GET",path:"/survey_items/:surveyItemId/survey_item_response_options",optionalParams:["page"]},listSurveyItems:{method:"GET",path:"/surveys/:surveyId/survey_items",optionalParams:["page"]},listSurveyResults:{method:"GET",path:"/surveys/:surveyId/survey_results"},listSurveySubmittedResponses:{method:"GET",path:"/surveys/:surveyId/submitted_responses"},listTrendingEvents:{method:"GET",path:"/trending_events"},listUserActivities:{method:"GET",path:"/user_activities",optionalParams:["page"]},listUserActivityCheers:{method:"GET",path:"/user_activities/:userActivityId/cheers",optionalParams:["page"]},listUserActivityCommentCheers:{method:"GET",path:"/user_activities/:userActivityId/comments/:commentId/cheers",optionalParams:["page"]},listUserActivityComments:{method:"GET",path:"/user_activities/:userActivityId/comments",optionalParams:["page"]},listUserAnalytics:{method:"GET",path:"/analytics/users",optionalParams:["page"]},listUserHostedEvents:{method:"GET",path:"/users/:userId/hosted_events",optionalParams:["page"]},listUserRecognitions:{method:"GET",path:"/users/:userId/recognitions",optionalParams:["page"]},listUserRsvpdEvents:{method:"GET",path:"/users/:userId/rsvpd_events",optionalParams:["when","sort"]},listUsers:{method:"GET",path:"/users",optionalParams:["page","includeDeactivated","departmentId","interestId","locationId","active","inviteStatus"]},listWidgetSurveys:{method:"GET",path:"/widget_surveys",optionalParams:["active","completed","page"]},messageEventGuests:{method:"POST",path:"/events/:eventId/event_notifications",expectedParams:["body"]},reactivateUser:{method:"DELETE",path:"/users/:userId/deactivation"},registerUser:{method:"POST",path:"/invites/:token/users",expectedParams:["password"]},reorderSurveyItemResponseOptions:{method:"PATCH",path:"/survey_items/:surveyItemId/survey_item_response_option_order",expectedParams:["order"]},reorderSurveyItems:{method:"PATCH",path:"/surveys/:surveyId/survey_item_order",expectedParams:["order"]},reorderWidgets:{method:"PATCH",path:"/widget_order",expectedParams:["order"]},requestPasswordReset:{method:"POST",path:"/password_resets",expectedParams:["email"]},resetPassword:{method:"PATCH",path:"/password_resets/:token",optionalParams:["password"]},reviewFeedback:{method:"PATCH",path:"/feedbacks/:feedbackId"},sendInvite:{method:"POST",path:"/invites",multipart:!0,expectedParams:["name","email"],optionalParams:["locationName","departmentNames","interestNames","avatar","title"]},subscribeToEventNotifications:{method:"POST",path:"/events/:eventId/event_notification_subscription"},uncheerEventComment:{method:"DELETE",path:"/events/:eventId/comments/:commentId/cheers"},uncheerEventPhoto:{method:"DELETE",path:"/events/:eventId/photos/:photoId/cheers"},uncheerEventPhotoComment:{method:"DELETE",path:"/events/:eventId/photos/:photoId/comments/:commentId/cheers"},uncheerRecognition:{method:"DELETE",path:"/recognitions/:recognitionId/cheers"},uncheerRecognitionComment:{method:"DELETE",path:"/recognitions/:recognitionId/comments/:commentId/cheers"},uncheerUserActivity:{method:"DELETE",path:"/user_activities/:userActivityId/cheers"},uncheerUserActivityComment:{method:"DELETE",path:"/user_activities/:userActivityId/comments/:commentId/cheers"},unsubscribeFromEventNotifications:{method:"DELETE",path:"/events/:eventId/event_notification_subscription"},updateAnnouncement:{method:"PATCH",path:"/announcements/:announcementId",multipart:!0,optionalParams:["title","body","active","image"]},updateDepartment:{method:"PATCH",path:"/departments/:departmentId",optionalParams:["name"]},updateEvent:{method:"PATCH",path:"/events/:eventId",multipart:!0,optionalParams:["name","details","startsAt","endsAt","eventType","sponsored","surveyId","image","organizationValueIds","location","visibility","cap","locationIds","inviteOnly","openInvites","interestNames","allLocations"]},updateEventComment:{method:"PATCH",path:"/events/:eventId/comments/:commentId",expectedParams:["body"]},updateEventPhoto:{method:"PATCH",path:"/events/:eventId/photos/:photoId",multipart:!0,optionalParams:["image","caption"]},updateEventPhotoComment:{method:"PATCH",path:"/events/:eventId/photos/:photoId/comments/:commentId",expectedParams:["body"]},updateEventRsvp:{method:"PATCH",path:"/events/:eventId/rsvps/:rsvpId",expectedParams:["responseType"]},updateExpense:{method:"PATCH",path:"/events/:eventId/expenses/:expenseId",optionalParams:["description","amount","incurredAt"]},updateFlag:{method:"PATCH",path:"/flags/:flagId",expectedParams:["reviewed"]},updateInterest:{method:"PATCH",path:"/interests/:interestId",expectedParams:["name"]},updateLocation:{method:"PATCH",path:"/locations/:locationId",expectedParams:["name"]},updateOrganization:{method:"PATCH",path:"/admin/organizations/:organizationId",multipart:!0,optionalParams:["name","gamificationEnabled","logo","active","mode","googleSigninEnabled","userCreatedSlackIntegrationsEnabled","userCreatedSurveysEnabled","feedbackEnabled","userCreatedInvitesEnabled","accountInfoEnabled"]},updateOrganizationValue:{method:"PATCH",path:"/organization_values/:organizationValueId",expectedParams:["name"]},updateProfile:{method:"PATCH",path:"/profile",multipart:!0,optionalParams:["name","email","departmentNames","interestNames","avatar","title","locationName"]},updateProfileEmailSettings:{method:"PATCH",path:"/profile/email_settings",optionalParams:["eventInvite","eventNotification","postEventSurvey","recognized","redemptionApproved","redemptionRequested","rsvpConfirmation"]},updateRecognition:{method:"PATCH",path:"/recognitions/:recognitionId",expectedParams:["body"],optionalParams:["userIds"]},updateRecognitionComment:{method:"PATCH",path:"/recognitions/:recognitionId/comments/:commentId",expectedParams:["body"]},updateSurvey:{method:"PATCH",path:"/surveys/:surveyId",optionalParams:["title","points","viewableResults"]},updateSurveyItem:{method:"PATCH",path:"/survey_items/:surveyItemId",optionalParams:["prompt","itemType","minRange","maxRange"]},updateSurveyItemResponseOption:{method:"PATCH",path:"/survey_item_response_options/:surveyItemResponseOptionId",optionalParams:["body"]},updateSurveyUserItemResponse:{method:"PATCH",path:"/survey_items/:surveyItemId/survey_user_item_response",optionalParams:["body","surveyItemResponseOptionIds"]},updateUser:{method:"PATCH",path:"/users/:userId",multipart:!0,optionalParams:["name","email","departmentNames","interestNames","avatar","title","locationName","organizationAdmin"]},updateUserActivityComment:{method:"PATCH",path:"/user_activities/:userActivityId/comments/:commentId",expectedParams:["body"]}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,o=n(9),s=(a=o)&&a.__esModule?a:{default:a};var i={endSimulation:function(){i.signIn(s.default.get("simulation")),s.default.remove("simulation")},getSimulationToken:function(){return s.default.get("simulation")},getToken:function(){return s.default.get("token")},isSignedIn:function(){return void 0!==i.getToken()},isSimulating:function(){return void 0!==s.default.get("simulation")},signIn:function(e){s.default.set("token",e)},signOut:function(){s.default.clearAll()},startSimulation:function(e){if(!i.isSignedIn())throw new Error("Cannot simulate unless you're already logged in.");s.default.set("simulation",i.getToken()),i.signIn(e)}};t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=n(3),r=(a=i)&&a.__esModule?a:{default:a};function d(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var m=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.client=t,this.dataType=n}return s(e,[{key:"aggregate",value:function(e,t){var n=this;return this.client[e](o({},t,{page:1})).then(function(a){var s=a.pagination.totalPages;if(s<=1)return a;var i=void 0,r=[];for(i=2;i<=s;i+=1)r.push(n.client[e](o({},t,{page:i})));return Promise.all(r).then(function(e){var t=[].concat(d(a[n.dataType]));for(i=0;i<=s-2;i+=1)t=[].concat(d(t),d(e[i][n.dataType]));var r=o({},a);return r[n.dataType]=t,r})})}}]),e}();Object.keys(r.default).forEach(function(e){m.prototype[e]=function(t){return this.aggregate(e,t)}}),t.default=m},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(2);var a=n(1),o=n(0);t.default=function(e,t,n){var s=function(e,t,n){var o,s,i,r,d,m={headers:(o=n,s=o.multipart,i=o.token,r=o.simulation,d={"X-Client-Version":"0.0.100"},s||(d["Content-Type"]="application/json"),"string"==typeof i&&i.length&&(d.Authorization="token "+i),"string"==typeof r&&r.length&&(d["X-Client-Simulation"]=r),d),method:e},p=(0,a.snakerize)(n.params);if("GET"===e)Object.keys(p).forEach(function(e){void 0!==p[e]&&null!==p[e]&&(Array.isArray(p[e])?p[e].length&&p[e].forEach(function(n){return t.searchParams.append(e+"[]",n)}):t.searchParams.append(e,p[e]))});else if(n.multipart){var c=new FormData;Object.keys(p).forEach(function(e){var t;Array.isArray(p[e])?p[e].length?p[e].forEach(function(t){return c.append(e+"[]",t)}):c.append(e+"[]",""):c.append(e,void 0===(t=p[e])||null===t?"":t)}),m.body=c}else m.body=JSON.stringify(p);return{url:t.href,options:m}}(e,t,n);return function(e,t,n){var a=Object.assign({},n);delete a.client,a.params&&a.params.password&&(a.params.password="******"),(0,o.swim)("[↑] "+e+" "+t.toString()+" "+JSON.stringify(a))}(e,t,n),new Promise(function(i,r){fetch(s.url,s.options).then(function(s){(0,o.swim)("[↓] "+e+" "+t.toString()+"\n          "+s.status+" "+s.headers.get("content-type"));var d=1===Math.round(s.status/200);n.client.recordResponse(s.status).then(function(){204===s.status?i(null):"text/html"===s.headers.get("content-type")?d?s.text().then(function(e){return i({response:s,text:e})}).catch(function(e){return r(e)}):r({response:s,error:s.statusText}):s.json().then(function(e){var t=Object.assign({response:s},(0,a.camelize)(e));d?i(t):r(t)}).catch(function(e){return r(e)})})}).catch(function(e){return r(e)})})}},function(e,t){e.exports=require("url-polyfill")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};n(7);var o=i(n(6)),s=i(n(4));function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t){t.expectedParams=t.expectedParams||[];return Object.assign(function(n){"object"!==(void 0===n?"undefined":a(n))&&(n={}),function(e,t){e.forEach(function(e){if(!t.hasOwnProperty(e))throw new Error("Expected parameter "+e+" not given")})}(t.expectedParams,n);var i,r,d,m=(i=t.path,r=n,d=i,Object.keys(r).forEach(function(e){var t=":"+e;-1!==d.indexOf(t)&&(d=d.replace(t,r[e]),delete r[e])}),d);return(0,o.default)(t.method,new URL(""+e.apiHost+m),{client:e,token:s.default.getToken(),simulation:s.default.getSimulationToken(),params:n,multipart:t.multipart||!1})},t)}},function(e,t){e.exports=require("store/dist/store.modern")},function(e,t){e.exports=require("actioncable")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],a=!0,o=!1,s=void 0;try{for(var i,r=e[Symbol.iterator]();!(a=(i=r.next()).done)&&(n.push(i.value),!t||n.length!==t);a=!0);}catch(e){o=!0,s=e}finally{try{!a&&r.return&&r.return()}finally{if(o)throw s}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),o=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),s=u(n(10)),i=u(n(4)),r=u(n(3)),d=u(n(8)),m=n(1),p=n(0),c=u(n(5));function u(e){return e&&e.__esModule?e:{default:e}}var h=function(){function e(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.rejectedRequests=0,this.apiHost=n.apiHost,this.fishbowlHost=n.fishbowlHost,this.fishbowlHost&&(0,p.startSwimming)(this.fishbowlHost),Object.keys(r.default).forEach(function(e){t[e]=(0,d.default)(t,r.default[e])})}return o(e,[{key:"recordResponse",value:function(e){var t=this;if(403===e){if(this.rejectedRequests+=1,3===this.rejectedRequests)return this.signOut().then(function(){return t.rejectedRequests=0})}else this.rejectedRequests=0;return Promise.resolve()}},{key:"endUserSimulation",value:function(){i.default.endSimulation(),this._disconnectConsumer()}},{key:"isSignedIn",value:function(){return i.default.isSignedIn()}},{key:"isSimulating",value:function(){return i.default.isSimulating()}},{key:"onLeaderboardUpdated",value:function(e){return this._subscribeToChannel("LeaderboardChannel",e)}},{key:"onNotificationReceived",value:function(e){return this._subscribeToChannel("NotificationChannel",e)}},{key:"onRecognitionCreated",value:function(e){return this._subscribeToChannel("RecognitionChannel",e)}},{key:"onUserActivityCreated",value:function(e){return this._subscribeToChannel("UserActivityChannel",e)}},{key:"setToken",value:function(e){i.default.signIn(e)}},{key:"signIn",value:function(e){return this.createApiKey(e).then(function(e){return i.default.signIn(e.apiKey.token),e})}},{key:"signOut",value:function(){var e=this;return this.deleteSession().then(function(t){return i.default.signOut(),e._disconnectConsumer(),t})}},{key:"startUserSimulation",value:function(e){var t=this;return this.createSimulation(e).then(function(e){return i.default.startSimulation(e.apiKey.token),t._disconnectConsumer(),e})}},{key:"autoPaginate",value:function(e){return new c.default(this,e)}},{key:"_disconnectConsumer",value:function(){this._consumer&&(this._consumer.disconnect(),this._consumer=null)}},{key:"_ensureConsumer",value:function(){if(this._consumer)return this._consumer;var e=this.apiHost.split("://"),t=a(e,2),n=t[0],o=t[1],r=("https"===n?"wss":"ws")+"://"+o+"/cable/"+i.default.getToken();return this._consumer=s.default.createConsumer(r),this._consumer}},{key:"_subscribeToChannel",value:function(e,t){return this._ensureConsumer().subscriptions.create(e,{received:function(e){return t((0,m.camelize)(e))}})}}]),e}();t.default=h}])});