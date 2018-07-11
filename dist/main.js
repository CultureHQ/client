!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CultureHQ=t():e.CultureHQ=t()}(global,function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=12)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=function(e){for(var t=/_([a-z])/,n=e,o=t.exec(n);null!==o;)n=n.replace(o[0],o[1].toUpperCase()),o=t.exec(n);return n},s=function(e){for(var t=/([A-Z])/,n=e,o=t.exec(n);null!==o;)n=e.replace(o[0],"_"+o[1].toLowerCase()),o=t.exec(n);return n},r=function e(t,n){if("object"!==(void 0===t?"undefined":o(t))||null===t)return t;if(Array.isArray(t))return t.map(function(t){return e(t,n)});if(!Object.keys(t).length)return t;var i={},s=void 0;return Object.keys(t).forEach(function(o){(function(e){return e&&("[object Object]"===e.toString()||Array.isArray(e))})(s=t[o])&&(s=e(s,n)),i[n(o)]=s}),i};t.camelize=function(e){return r(e,i)},t.snakerize=function(e){return r(e,s)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){var t=new FormData;return Object.keys(e).forEach(function(n){var o;Array.isArray(e[n])?e[n].length?e[n].forEach(function(e){return t.append(n+"[]",e)}):t.append(n+"[]",""):t.append(n,void 0===(o=e[n])||null===o?"":o)}),t}},function(e){e.exports={activateSurvey:["POST","/surveys/:surveyId/survey_activation"],adminAutocompleteUsers:["GET","/admin/autocomplete/users",["query"]],approveRecognition:["POST","/recognitions/:recognitionId/recognition_approval"],autocompleteUsers:["GET","/autocomplete/users",["query"],["includeDeactivated","inviteStatus","active"]],bulkCreateEventPhotos:["POST","/events/:eventId/albums",["images"],[],!0],cancelEvent:["POST","/events/:eventId/event_cancellations",[],["message"]],changePassword:["PATCH","/password",["oldPassword","newPassword"]],checkInEventAttendee:["POST","/events/:eventId/check_ins",["userId"]],cheerEventComment:["POST","/events/:eventId/comments/:commentId/cheers"],cheerEventPhoto:["POST","/events/:eventId/photos/:photoId/cheers"],cheerEventPhotoComment:["POST","/events/:eventId/photos/:photoId/comments/:commentId/cheers"],cheerRecognition:["POST","/recognitions/:recognitionId/cheers"],cheerRecognitionComment:["POST","/recognitions/:recognitionId/comments/:commentId/cheers"],cheerUserActivity:["POST","/user_activities/:userActivityId/cheers"],cheerUserActivityComment:["POST","/user_activities/:userActivityId/comments/:commentId/cheers"],confirmEventAttendance:["POST","/events/:eventId/confirmation"],createAnnouncement:["POST","/announcements",["title","active"],["body","imageUrl"]],createApiKey:["POST","/api_keys",["email","password"]],createDepartment:["POST","/departments",["name"]],createEvent:["POST","/events",["name","startsAt","endsAt","eventType"],["details","sponsored","surveyId","image","organizationValueIds","location","visibility","cap","locationIds","inviteOnly","openInvites","inviteeIds","timezone","interestNames","allLocations","createSurvey"],!0],createEventComment:["POST","/events/:eventId/comments",["body"],["parentCommentId"]],createEventInvites:["POST","/events/:eventId/event_invites",[],["userIds","locationIds","interestIds","departmentIds"]],createEventPhoto:["POST","/events/:eventId/photos",["image"],["caption"],!0],createEventPhotoComment:["POST","/events/:eventId/photos/:photoId/comments",["body"],["parentCommentId"]],createEventRsvp:["POST","/events/:eventId/rsvps",["responseType"]],createExpense:["POST","/events/:eventId/expenses",["description","amount"],["incurredAt"]],createFeedback:["POST","/feedbacks",["body"],["anonymous"]],createInterest:["POST","/interests",["name"]],createLocation:["POST","/locations",["name"]],createMeeting:["POST","/meetings",[],["departmentIds","interestIds","locationIds"]],createOrganization:["POST","/admin/organizations",["name"],["gamificationEnabled","logoUrl","active","mode","googleSigninEnabled","userCreatedSlackIntegrationsEnabled","userCreatedSurveysEnabled","feedbackEnabled","userCreatedInvitesEnabled","accountInfoEnabled"],!0],createOrganizationValue:["POST","/organization_values",["name"]],createPhotoTag:["POST","/photos/:photoId/photo_tags",["userId"]],createProfileNotificationView:["POST","/profile/notification_views"],createProfilePointNotificationView:["POST","/profile/point_notification_views"],createRecognition:["POST","/recognitions",["body","userIds"]],createRecognitionComment:["POST","/recognitions/:recognitionId/comments",["body"],["parentCommentId"]],createRecognitionType:["POST","/recognitions/recognition_types",["name","approval","imageUrl"],["points"]],createSSOAgreement:["POST","/sso/agreement"],createSession:["POST","/sessions",["email"]],createSimulation:["POST","/admin/simulation",["userId"]],createSlackIntegration:["POST","/slack_integrations",["code"]],createSurvey:["POST","/surveys",["title"],["points","eventId","viewableResults"]],createSurveyItem:["POST","/surveys/:surveyId/survey_items",["prompt","itemType"],["minRange","maxRange"]],createSurveyItemResponseOption:["POST","/survey_items/:surveyItemId/survey_item_response_options",["body"]],createSurveyUserItemResponse:["POST","/survey_items/:surveyItemId/survey_user_item_response",[],["body","surveyItemResponseOptionIds"]],createUserActivityComment:["POST","/user_activities/:userActivityId/comments",["body"],["parentCommentId"]],createUserInvite:["POST","/users/:userId/invites"],deactivateSurvey:["DELETE","/surveys/:surveyId/survey_activation"],deactivateUser:["POST","/users/:userId/deactivation"],deleteAnnouncement:["DELETE","/announcements/:announcementId"],deleteDepartment:["DELETE","/departments/:departmentId"],deleteEvent:["DELETE","/events/:eventId",[],["message"]],deleteEventComment:["DELETE","/events/:eventId/comments/:commentId"],deleteEventPhoto:["DELETE","/events/:eventId/photos/:photoId"],deleteEventPhotoComment:["DELETE","/events/:eventId/photos/:photoId/comments/:commentId"],deleteExpense:["DELETE","/events/:eventId/expenses/:expenseId"],deleteInterest:["DELETE","/interests/:interestId"],deleteLocation:["DELETE","/locations/:locationId"],deleteOrganization:["DELETE","/admin/organizations/:organizationId"],deleteOrganizationValue:["DELETE","/organization_values/:organizationValueId"],deletePhotoTag:["DELETE","/photos/:photoId/photo_tags/:photoTagId"],deleteRecognition:["DELETE","/recognitions/:recognitionId"],deleteRecognitionComment:["DELETE","/recognitions/:recognitionId/comments/:commentId"],deleteRecognitionType:["DELETE","/recognitions/recognition_types/:recognitionTypeId"],deleteSession:["DELETE","/session"],deleteSlackIntegration:["DELETE","/slack_integrations/:slackIntegrationId"],deleteSurvey:["DELETE","/surveys/:surveyId"],deleteSurveyItem:["DELETE","/survey_items/:surveyItemId"],deleteSurveyItemResponseOption:["DELETE","/survey_item_response_options/:surveyItemResponseOptionId"],deleteUserActivityComment:["DELETE","/user_activities/:userActivityId/comments/:commentId"],denyEventAttendance:["DELETE","/events/:eventId/confirmation"],disableStaticWidget:["DELETE","/widgets",["widget"]],duplicateEvent:["POST","/events/:eventId/event_duplicates",["startsAt"],["endsAt"]],enableStaticWidget:["POST","/widgets",["widget"]],eventAutocompleteInvites:["GET","/events/:eventId/autocomplete/event_invites",["query"]],eventAutocompleteRsvps:["GET","/events/:eventId/autocomplete/rsvps",["query"]],exportEvents:["POST","/exports/event_export"],exportFeedback:["POST","/exports/feedback_export"],exportInterests:["POST","/exports/interest_export"],exportRecognitions:["POST","/exports/recognition_export"],exportSurvey:["POST","/exports/surveys/:surveyId/survey_export"],flagAvatar:["POST","/users/:userId/flags",[],["message"]],flagComment:["POST","/comments/:commentId/flags",[],["message"]],flagDepartment:["POST","/departments/:departmentId/flags",[],["message"]],flagEvent:["POST","/events/:eventId/flags",[],["message"]],flagInterest:["POST","/interests/:interestId/flags",[],["message"]],flagLocation:["POST","/locations/:locationId/flags",[],["message"]],flagPhoto:["POST","/photos/:photoId/flags",[],["message"]],flagRecognition:["POST","/recognitions/:recognitionId/flags",[],["message"]],getAnnouncement:["GET","/announcements/:announcementId"],getAutoRecognitionSettings:["GET","/recognitions/auto_recognition_settings"],getDepartment:["GET","/departments/:departmentId"],getDepartmentEventParticipation:["GET","/events/:eventId/department_event_participation"],getEvent:["GET","/events/:eventId"],getEventAnalytics:["GET","/analytics/events/:eventId"],getEventPhoto:["GET","/events/:eventId/photos/:photoId"],getEventRsvp:["GET","/events/:eventId/rsvps/:rsvpId"],getExpense:["GET","/events/:eventId/expenses/:expenseId"],getFeedback:["GET","/feedbacks/:feedbackId"],getInterest:["GET","/interests/:interestId"],getInvite:["GET","/invites/:token"],getLocation:["GET","/locations/:locationId"],getOrganization:["GET","/admin/organizations/:organizationId"],getOrganizationValue:["GET","/organization_values/:organizationValueId"],getOrganizationValueLeaderboard:["GET","/leaderboard/organization_values"],getPhotoGallery:["GET","/gallery",[],["page","range"]],getPointLeaderboard:["GET","/leaderboard/points"],getProfile:["GET","/profile"],getProfileEmailSettings:["GET","/profile/email_settings"],getProfilePointStanding:["GET","/profile/point_standing"],getRecognition:["GET","/recognitions/:recognitionId"],getRecognitionType:["GET","/recognitions/recognition_types/:recognitionTypeId"],getSurvey:["GET","/surveys/:surveyId"],getSurveyItem:["GET","/survey_items/:surveyItemId"],getSurveyItemResponseOption:["GET","/survey_item_response_options/:surveyItemResponseOptionId"],getSurveyUserItemResponse:["GET","/survey_items/:surveyItemId/survey_user_item_response"],getUser:["GET","/users/:userId"],getUserEventTypeBreakdown:["GET","/users/:userId/event_type_breakdown"],getUserPointBreakdown:["GET","/users/:userId/point_breakdown"],getUserPointIncrements:["GET","/users/:userId/point_increments",[],["page"]],getUserRecognitionLeaderboard:["GET","/leaderboard/user_recognitions"],incrementUserPoints:["POST","/users/:userId/point_increments",["points"]],invalidateOtherApiKeys:["DELETE","/api_keys"],listActiveAnnouncements:["GET","/active_announcements",[],["page"]],listAnnouncements:["GET","/announcements",[],["page","active"]],listApiKeys:["GET","/api_keys"],listDepartmentAnalytics:["GET","/analytics/departments",[],["page"]],listDepartments:["GET","/departments",[],["page"]],listEventAnalytics:["GET","/analytics/events",[],["page"]],listEventCommentCheers:["GET","/events/:eventId/comments/:commentId/cheers",[],["page"]],listEventComments:["GET","/events/:eventId/comments",[],["page"]],listEventInterests:["GET","/events/interests",[],["page"]],listEventPhotoCheers:["GET","/events/:eventId/photos/:photoId/cheers",[],["page"]],listEventPhotoCommentCheers:["GET","/events/:eventId/photos/:photoId/comments/:commentId/cheers",[],["page"]],listEventPhotoComments:["GET","/events/:eventId/photos/:photoId/comments",[],["page"]],listEventPhotos:["GET","/events/:eventId/photos",[],["page"]],listEventRsvps:["GET","/events/:eventId/rsvps",[],["page","responseType"]],listEvents:["GET","/events",[],["page","range","locationIds","sort","when","organizationValueIds","eventTypes","sponsored","interestIds","allLocations","userRelation"]],listEventsByOrganization:["GET","/admin/events"],listExpenses:["GET","/events/:eventId/expenses",[],["page"]],listFeedbacks:["GET","/feedbacks",[],["page","reviewed"]],listFlags:["GET","/flags",[],["page","reviewed"]],listInterests:["GET","/interests",[],["page","by"]],listLocations:["GET","/locations",[],["page"]],listOrganizationValueEvents:["GET","/organization_values/:organizationValueId/events",[],["page"]],listOrganizationValueRecognitions:["GET","/organization_values/:organizationValueId/recognitions",[],["page"]],listOrganizationValues:["GET","/organization_values",[],["page"]],listOrganizations:["GET","/admin/organizations",[],["page"]],listPendingRecognitions:["GET","/recognitions/pending_recognitions",[],["page"]],listPhotoTags:["GET","/photos/:photoId/photo_tags",[],["page"]],listProfileAvailableWidgetSurveys:["GET","/profile/widget_surveys/available_surveys",[],["page"]],listProfileCompletedWidgetSurveys:["GET","/profile/widget_surveys/completed_surveys",[],["page"]],listProfileEventSurveys:["GET","/profile/event_surveys"],listProfileManageableWidgetSurveys:["GET","/profile/widget_surveys/manageable_surveys",[],["page"]],listProfileNotifications:["GET","/profile/notifications",[],["seen","page"]],listProfilePointNotifications:["GET","/profile/point_notifications",[],["seen","page"]],listRecognitionCheers:["GET","/recognitions/:recognitionId/cheers",[],["page"]],listRecognitionCommentCheers:["GET","/recognitions/:recognitionId/comments/:commentId/cheers",[],["page"]],listRecognitionComments:["GET","/recognitions/:recognitionId/comments",[],["page"]],listRecognitionTypes:["GET","/recognitions/recognition_types",[],["page"]],listRecognitions:["GET","/recognitions",[],["page","locationIds","departmentIds","organizationValueIds","type"]],listRecognitionsOrganizationValues:["GET","/recognitions/organization_values"],listRecognitionsRecognizedUsers:["GET","/recognitions/recognized_users"],listRecognitionsRecognizingUsers:["GET","/recognitions/recognizing_users"],listSlackIntegrations:["GET","/slack_integrations"],listSurveyItemResponseOptions:["GET","/survey_items/:surveyItemId/survey_item_response_options",[],["page"]],listSurveyItems:["GET","/surveys/:surveyId/survey_items",[],["page"]],listSurveyResults:["GET","/surveys/:surveyId/survey_results"],listSurveySubmittedResponses:["GET","/surveys/:surveyId/submitted_responses"],listTrendingEvents:["GET","/trending_events"],listUserActivities:["GET","/user_activities",[],["page"]],listUserActivityCheers:["GET","/user_activities/:userActivityId/cheers",[],["page"]],listUserActivityCommentCheers:["GET","/user_activities/:userActivityId/comments/:commentId/cheers",[],["page"]],listUserActivityComments:["GET","/user_activities/:userActivityId/comments",[],["page"]],listUserAnalytics:["GET","/analytics/users",[],["page"]],listUserHostedEvents:["GET","/users/:userId/hosted_events",[],["page"]],listUserRecognitions:["GET","/users/:userId/recognitions",[],["page"]],listUserRsvpdEvents:["GET","/users/:userId/rsvpd_events",[],["when","sort"]],listUsers:["GET","/users",[],["page","includeDeactivated","departmentId","interestId","locationId","active","inviteStatus","departmentIds","interestIds","locationIds"]],messageEventGuests:["POST","/events/:eventId/event_notifications",["body"]],reactivateUser:["DELETE","/users/:userId/deactivation"],registerUser:["POST","/invites/:token/users",["password"]],reorderProfileInterests:["PATCH","/profile/interest_order",["order"]],reorderSurveyItemResponseOptions:["PATCH","/survey_items/:surveyItemId/survey_item_response_option_order",["order"]],reorderSurveyItems:["PATCH","/surveys/:surveyId/survey_item_order",["order"]],reorderWidgets:["PATCH","/widget_order",["order"]],requestPasswordReset:["POST","/password_resets",["email"]],resetPassword:["PATCH","/password_resets/:token",[],["password"]],reviewFeedback:["PATCH","/feedbacks/:feedbackId"],search:["GET","/search",["query"]],sendInvite:["POST","/invites",["name","email"],["locationName","departmentNames","interestNames","avatar","title"],!0],subscribeToEventNotifications:["POST","/events/:eventId/event_notification_subscription"],uncheerEventComment:["DELETE","/events/:eventId/comments/:commentId/cheers"],uncheerEventPhoto:["DELETE","/events/:eventId/photos/:photoId/cheers"],uncheerEventPhotoComment:["DELETE","/events/:eventId/photos/:photoId/comments/:commentId/cheers"],uncheerRecognition:["DELETE","/recognitions/:recognitionId/cheers"],uncheerRecognitionComment:["DELETE","/recognitions/:recognitionId/comments/:commentId/cheers"],uncheerUserActivity:["DELETE","/user_activities/:userActivityId/cheers"],uncheerUserActivityComment:["DELETE","/user_activities/:userActivityId/comments/:commentId/cheers"],unsubscribeFromEventNotifications:["DELETE","/events/:eventId/event_notification_subscription"],updateAnnouncement:["PATCH","/announcements/:announcementId",[],["title","body","active","imageUrl"]],updateAutoRecognitionSettings:["PATCH","/recognitions/auto_recognition_settings",[],["allDepartments","eventCreation","newAttendees","didRecognize","wasRecognized","inviteCreation"]],updateDepartment:["PATCH","/departments/:departmentId",[],["name"]],updateEvent:["PATCH","/events/:eventId",[],["name","details","startsAt","endsAt","eventType","sponsored","surveyId","image","organizationValueIds","location","visibility","cap","locationIds","inviteOnly","openInvites","interestNames","allLocations"],!0],updateEventComment:["PATCH","/events/:eventId/comments/:commentId",["body"]],updateEventPhoto:["PATCH","/events/:eventId/photos/:photoId",[],["image","caption"],!0],updateEventPhotoComment:["PATCH","/events/:eventId/photos/:photoId/comments/:commentId",["body"]],updateEventRsvp:["PATCH","/events/:eventId/rsvps/:rsvpId",["responseType"]],updateExpense:["PATCH","/events/:eventId/expenses/:expenseId",[],["description","amount","incurredAt"]],updateFlag:["PATCH","/flags/:flagId",["reviewed"]],updateInterest:["PATCH","/interests/:interestId",["name"]],updateLocation:["PATCH","/locations/:locationId",["name"]],updateOrganization:["PATCH","/admin/organizations/:organizationId",[],["name","gamificationEnabled","logoUrl","active","mode","googleSigninEnabled","userCreatedSlackIntegrationsEnabled","userCreatedSurveysEnabled","feedbackEnabled","userCreatedInvitesEnabled","accountInfoEnabled"],!0],updateOrganizationValue:["PATCH","/organization_values/:organizationValueId",["name"]],updateProfile:["PATCH","/profile",[],["name","email","departmentNames","interestNames","avatar","title","locationName"],!0],updateProfileEmailSettings:["PATCH","/profile/email_settings",[],["eventInvite","eventNotification","postEventSurvey","recognized","redemptionApproved","redemptionRequested","rsvpConfirmation"]],updateRecognition:["PATCH","/recognitions/:recognitionId",["body"],["userIds"]],updateRecognitionComment:["PATCH","/recognitions/:recognitionId/comments/:commentId",["body"]],updateRecognitionType:["PATCH","/recognitions/recognition_types/:recognitionTypeId",[],["name","approval","points","imageUrl"]],updateSurvey:["PATCH","/surveys/:surveyId",[],["title","points","viewableResults"]],updateSurveyItem:["PATCH","/survey_items/:surveyItemId",[],["prompt","itemType","minRange","maxRange"]],updateSurveyItemResponseOption:["PATCH","/survey_item_response_options/:surveyItemResponseOptionId",[],["body"]],updateSurveyUserItemResponse:["PATCH","/survey_items/:surveyItemId/survey_user_item_response",[],["body","surveyItemResponseOptionIds"]],updateUser:["PATCH","/users/:userId",[],["name","email","departmentNames","interestNames","avatar","title","locationName","organizationAdmin"],!0],updateUserActivityComment:["PATCH","/user_activities/:userActivityId/comments/:commentId",["body"]]}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,i=n(10),s=(o=i)&&o.__esModule?o:{default:o};var r={endSimulation:function(){r.signIn(s.default.get("simulation")),s.default.remove("simulation")},getSimulationToken:function(){return s.default.get("simulation")},getToken:function(){return s.default.get("token")},isSignedIn:function(){return void 0!==r.getToken()},isSimulating:function(){return void 0!==s.default.get("simulation")},signIn:function(e){return s.default.set("token",e)},signOut:function(){return s.default.clearAll()},startSimulation:function(e){if(!r.isSignedIn())throw new Error("Cannot simulate unless you're already logged in.");s.default.set("simulation",r.getToken()),r.signIn(e)}};t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,i=n(1),s=(o=i)&&o.__esModule?o:{default:o};t.default=function(e,t,n){return new Promise(function(o,i){return fetch(e.signerUrl).then(function(e){return e.json()}).then(function(r){var a=r.policy,u=r.signature,c=r.key,d=new XMLHttpRequest;d.open("POST",e.uploadBucket+"/"),d.upload.addEventListener("load",function(t){"error"===t.type?i(t):o(e.uploadBucket+"/"+c)}),d.upload.addEventListener("error",i),n&&d.upload.addEventListener("progress",function(e){var t=e.loaded,o=e.total;n(0===o?100:Math.ceil(t/o*100))}),d.send((0,s.default)({key:c,AWSAccessKeyId:e.awsAccessKeyId,acl:"public-read",policy:a,signature:u,success_action_status:"201","Content-Type":t.type,file:t}))}).catch(i)})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=n(2),a=(o=r)&&o.__esModule?o:{default:o};function u(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var c=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.client=t,this.dataType=n}return s(e,[{key:"aggregate",value:function(e,t){var n=this;return this.client[e](i({},t,{page:1})).then(function(o){var s=o.pagination.totalPages;if(s<=1)return o;var r=void 0,a=[];for(r=2;r<=s;r+=1)a.push(n.client[e](i({},t,{page:r})));return Promise.all(a).then(function(e){var t=[].concat(u(o[n.dataType]));for(r=0;r<=s-2;r+=1)t=[].concat(u(t),u(e[r][n.dataType]));var a=i({},o);return a[n.dataType]=t,a})})}}]),e}();Object.keys(a.default).forEach(function(e){c.prototype[e]=function(t){return this.aggregate(e,t)}}),t.default=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},i=n(0);t.default=function(e){if(204===e.status)return Promise.resolve(null);var t=e.headers.get("content-type");return t.startsWith("text/html")||t.startsWith("text/plain")?e.text().then(function(e){return function(t){return new Promise(function(n,o){var i=e.status,s=e.statusText;2===Math.round(i/100)?n({text:t,response:e,status:i}):o({error:s,response:e,status:i})})}}(e)):e.json().then(function(e){return function(t){return new Promise(function(n,s){var r=e.status;(2===Math.round(r/100)?n:s)(o({},(0,i.camelize)(t),{response:e,status:r}))})}}(e))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),i=r(n(1)),s=r(n(6));function r(e){return e&&e.__esModule?e:{default:e}}var a=function(e,t,n){var s,r,a,u,c,d={headers:(s=n,r=s.multipart,a=s.token,u=s.simulation,c={"X-Client-Version":"2.0.1"},r||(c["Content-Type"]="application/json"),"string"==typeof a&&a.length&&(c.Authorization="token "+a),"string"==typeof u&&u.length&&(c["X-Client-Simulation"]=u),c),method:e},l=(0,o.snakerize)(n.params);return"GET"===e?function(e,t){Object.keys(t).forEach(function(n){void 0!==t[n]&&null!==t[n]&&(Array.isArray(t[n])?t[n].length&&t[n].forEach(function(t){return e.searchParams.append(n+"[]",t)}):e.searchParams.append(n,t[n]))})}(t,l):n.multipart?d.body=(0,i.default)(l):d.body=JSON.stringify(l),{url:t.href,options:d}};t.default=function(e,t,n){var o=a(e,t,n);return fetch(o.url,o.options).then(s.default)}},function(e,t){e.exports=require("url-polyfill")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],o=!0,i=!1,s=void 0;try{for(var r,a=e[Symbol.iterator]();!(o=(r=a.next()).done)&&(n.push(r.value),!t||n.length!==t);o=!0);}catch(e){i=!0,s=e}finally{try{!o&&a.return&&a.return()}finally{if(i)throw s}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();n(8);var s=a(n(7)),r=a(n(3));function a(e){return e&&e.__esModule?e:{default:e}}var u=Object.prototype.hasOwnProperty;t.default=function(e,t){var n=i(t,5),a=n[0],c=n[1],d=n[2],l=void 0===d?[]:d,v=n[3],p=void 0===v?[]:v,m=n[4],g=void 0!==m&&m;return Object.assign(function(t){var n="object"!==(void 0===t?"undefined":o(t))?{}:t;!function(e,t){e.forEach(function(e){if(!u.call(t,e))throw new Error("Expected parameter "+e+" not given")})}(l,n);var i=function(e,t){var n=e;return Object.keys(t).forEach(function(e){var o=":"+e;-1!==n.indexOf(o)&&(n=n.replace(o,t[e]),delete t[e])}),n}(c,n);return(0,s.default)(a,new URL(""+e.apiHost+i),{token:r.default.getToken(),simulation:r.default.getSimulationToken(),params:n,multipart:g})},{method:a,path:c,expectedParams:l,optionalParams:p,multipart:g})}},function(e,t){e.exports=require("store/dist/store.modern")},function(e,t){e.exports=require("actioncable")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],o=!0,i=!1,s=void 0;try{for(var r,a=e[Symbol.iterator]();!(o=(r=a.next()).done)&&(n.push(r.value),!t||n.length!==t);o=!0);}catch(e){i=!0,s=e}finally{try{!o&&a.return&&a.return()}finally{if(i)throw s}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=v(n(11)),r=v(n(3)),a=v(n(2)),u=v(n(9)),c=n(0),d=v(n(5)),l=v(n(4));function v(e){return e&&e.__esModule?e:{default:e}}var p={apiHost:"http://localhost:3000",awsAccessKeyId:null,signerUrl:"http://localhost:3001",uploadBucket:"http://localhost:3001"},m=function(){function e(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),Object.keys(p).forEach(function(e){t[e]=n[e]||p[e]}),Object.keys(a.default).forEach(function(e){t[e]=(0,u.default)(t,a.default[e])})}return i(e,[{key:"endUserSimulation",value:function(){r.default.endSimulation(),this.disconnectConsumer()}},{key:"isSignedIn",value:function(){return r.default.isSignedIn()}},{key:"isSimulating",value:function(){return r.default.isSimulating()}},{key:"onLeaderboardUpdated",value:function(e){return this.subscribeToChannel("LeaderboardChannel",e)}},{key:"onNotificationReceived",value:function(e){return this.subscribeToChannel("NotificationChannel",e)}},{key:"onRecognitionCreated",value:function(e){return this.subscribeToChannel("RecognitionChannel",e)}},{key:"onUserActivityCreated",value:function(e){return this.subscribeToChannel("UserActivityChannel",e)}},{key:"setToken",value:function(e){r.default.signIn(e)}},{key:"signIn",value:function(e){return this.createApiKey(e).then(function(e){return r.default.signIn(e.apiKey.token),e})}},{key:"signOut",value:function(){var e=this;return this.deleteSession().then(function(t){return r.default.signOut(),e.disconnectConsumer(),t})}},{key:"signUpload",value:function(e,t){return(0,l.default)(this,e,t)}},{key:"startUserSimulation",value:function(e){var t=this;return this.createSimulation(e).then(function(e){return r.default.startSimulation(e.apiKey.token),t.disconnectConsumer(),e})}},{key:"autoPaginate",value:function(e){return new d.default(this,e)}},{key:"disconnectConsumer",value:function(){this.consumer&&(this.consumer.disconnect(),this.consumer=null)}},{key:"ensureConsumer",value:function(){if(this.consumer)return this.consumer;var e=this.apiHost.split("://"),t=o(e,2),n=t[0],i=t[1],a=("https"===n?"wss":"ws")+"://"+i+"/cable/"+r.default.getToken();return this.consumer=s.default.createConsumer(a),this.consumer}},{key:"subscribeToChannel",value:function(e,t){return this.ensureConsumer().subscriptions.create(e,{received:function(e){return t((0,c.camelize)(e))}})}}]),e}();t.default=m}])});