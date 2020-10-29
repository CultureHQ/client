# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [10.6.0] - 2020-10-29

### Added

- New endpoint to retrieve a story trend.

## [10.5.0] - 2020-10-06

### Added

- New endpoint to retrieve a single story question.

## [10.4.0] - 2020-09-29

### Added

- New admin endpoints to handle new colleges fields.

## [10.3.11] - 2020-09-28

### Added

- New endpoint to update the social media values.

## [10.3.10] - 2020-09-23

### Added

- The new endpoints to create and delete user courses.

## [10.3.9] - 2020-09-23

### Added

- The new endpoints to create and delete user courses.

## [10.3.8] - 2020-09-23

### Added

- The `listProfileUserCourses` to list the user courses.

## [10.3.7] - 2020-09-23

### Added

- The `listProfileSuggestedCourses` to list the suggested courses.

## [10.3.6] - 2020-08-21

### Added

- Fixing `getStory` path.

## [10.3.5] - 2020-08-21

### Added

- The `getStory` to get a story by id.

## [10.3.4] - 2020-08-12

### Added

- The `listStories` to get stories by user.

## [10.3.3] - 2020-08-11

### Added

- The `deleteStory` to delete the story.

## [10.3.2] - 2020-08-11

### Added

- The `createStoryComment`, `flagStory` and `listStoryComments` to handle story actions.

## [10.3.1] - 2020-08-07

### Added

- The `getTrendingStoryQuestion` to get trending story questions.

## [10.3.0] - 2020-07-28

### Added

- The `createStoryQuestion, deleteStoryQuestion, getStoryQuestion, updateStoryQuestion` CRUD operations for story questions.

## [10.2.9] - 2020-07-15

### Added

- The `deleteUserConnection` call for fetching the followers of a user.

## [10.2.8] - 2020-07-13

### Added

- The `listUserReceivedConnections` call for fetching the followers of a user.

## [10.2.7] - 2020-07-09

### Added

- Fixing `listProfileSimilarPeople` call for fetching the most similar people to a user.

## [10.2.6] - 2020-07-09

### Added

- The `listProfileSimilarPeople` call for fetching the most similar people to a user.
- Removing `listUserSuggestedConnections` because it does not perform the right operation

## [10.2.5] - 2020-07-08

### Added

- The `listUserSuggestedConnections` call for fetching the most similar people to a user.

## [10.2.4] - 2020-06-03

### Added

- New endpoint to delete endorsements.

## [10.2.3] - 2020-06-03

### Changed

- Changing spotlights endpoint to endorsements.

## [10.2.2] - 2020-06-03

### Added

- Adding endpoint to flag different types of user activities.

## [10.2.1] - 2020-01-27

### Added

- The `configure` function, for setting the singleton values for the client.

### Removed

- The `makeClient` function, as it didn't actually solve the problem.

## [10.2.0] - 2020-01-27

### Added

- The `makeClient` function to allow passing in options like `apiHost` to an object that will thereafter configure all API calls.

## [10.1.0] - 2019-12-06

### Added

- The `public` field to the `createEvent` and `updateEvent` calls.

### Removed

- The `autoPaginate` function in favor of the `makePaginatedGet` function.
- 30ish calls that are no longer used on the frontend as we migrate more toward `make*` usage.

## [10.0.1] - 2019-08-21

### Changed

- Fixed up new `@rails/actioncable` usage.

## [10.0.0] - 2019-08-21

### Changed

- Switched the `actioncable` dependency over to `@rails/actioncable`.

## [9.7.0] - 2019-07-22

### Added

- The `getAutoRecognitionSettings`, `listDepartments`, and `updateAutoRecognitionSettings` calls that were accidentally deleted.

## [9.6.1] - 2019-07-19

### Changed

- Fix up `makePaginatedGet` so that it properly handles concatenating multiple pages worth of results.

## [9.6.0] - 2019-06-26

### Added

- The `makePaginatedGet` export for automatically handling pagination.

## [9.5.1] - 2019-06-07

### Changed

- Use the `prepublishOnly` npm script so that the `dist` directory does not need to be checked in.

## [9.5.0] - 2019-04-29

### Added

- The optional `hostOnlySurvey` on the `createEvent` and `updateSurvey` calls.

### Changed

- [INTERNAL] Switch to using `@culturehq/scripts` for simpler development setup.

## [9.4.0] - 2019-03-29

### Changed

- Support generic `GET`, `POST`, `PATCH`, and `DELETE` requests without the need to name the functions.

## [9.3.0] - 2019-03-08

### Added

- The `getProfileCommunityStrength` call.

## [9.2.0] - 2019-03-07

### Added

- The `listProfileSuggestedConnections` call.

## [9.1.2] - 2019-02-21

### Changed

- Properly handle the URL for `listUserSentConnections`.

## [9.1.1] - 2019-02-21

### Changed

- Rename the `listUserConnectedUsers` call to `listUserSentConnections`.

## [9.1.0] - 2019-02-21

### Added

- The `listUserConnectedUsers` call.

## [9.0.0] - 2019-02-20

### Added

- The optional `names` param to the `listProfileSuggestedInterests` and the `listProfileSuggestedSkills` calls.
- The optional `skillIds` param to the `listUsers` call.
- The `listUserSkills`, `profileAutocompleteInterests`, `profileAutocompleteSkills`, and `reorderProfileSkills` calls.

### Changed

- The required param on `createProfileSkill` and `createProfileUserInterest` from `tag_id` and `interest_id` to `name`.
- Corrected the path param on `deleteProfileSkill` and `deleteProfileUserInterest`.

### Removed

- The `profileAutocompleteTags` call.

## [8.7.0] - 2019-02-19

### Added

- The `profileAutocompleteTags` call.

## [8.6.0] - 2019-02-19

### Added

- The `createProfileSkill`, `deleteProfileSkill`, and `listProfileSkills` calls.
- The `createProfileUserInterest`, `deleteProfileUserInterest`, and `listProfileUserInterests` calls.
- The `num` optional param to the `listProfileSuggestedInterests` call for specifying the number of desired suggestions.

## [8.5.0] - 2019-02-05

### Added

- The `listProfileSuggestedInterests` call.

## [8.4.0] - 2019-01-29

### Added

- The `listUserCommonEntities` call.

## [8.3.0] - 2019-01-28

### Added

- Document the optional `uuid` param on the `createPhotoTag` call.
- The `createUserConnection` call.

## [8.2.0] - 2018-12-28

### Added

- Support the location params on photos.

## [8.1.2] - 2018-12-20

### Changed

- Fixed up to use the new upload signer URL.

## [8.1.1] - 2018-12-18

### Added

- Fixed the documentation of optional params for `createEvent` by including the `imageDefault` prop.

## [8.1.0] - 2018-12-07

### Added

- The `getProfileAvailableWidgetSurvey` call.

### Removed

- The `X-Client-Version` header.

## [8.0.0] - 2018-11-28

### Added

- The `*Photo*` equivalents of all `*EventPhoto*` calls.

### Removed

- The `cheer*Comment` calls in favor of using the `cheerComment` call.
- The `uncheer*Comment` calls in favor of using the `uncheerComment` call.
- The `list*CommentCheers` calls in favor of using the `listCommentCheers` call.
- The `update*Comment` calls as they are no longer supported by the API.
- All `*EventPhoto*` calls in favor of `*Photo*` equivalents that are shallow (only requiring the `:photoId` param instead of also the `:eventId` param).

## [7.1.0] - 2018-11-27

### Added

- The `getUserActivity` call.

## [7.0.0] - 2018-11-26

### Added

- The `deleteComment` call.

### Removed

- [BREAKING] The `delete*Comment` calls.

## [6.7.2] - 2018-11-26

### Changed

- Fix up the `listCommentCheers` endpoint.

## [6.7.1] - 2018-11-26

### Added

- Document the optional `timezone` param on the `updateEvent` call.

## [6.7.0] - 2018-11-20

### Added

- The `cheerComment`, `uncheerComment`, and `listCommentCheers` calls. These allow directly accessing the comment instance instead of going through the associated comment entity.

## [6.6.2] - 2018-11-19

### Changed

- Getting this right this time, removing the added `get*Comment` calls added in `6.6.0` and instead just rolling with `getComment`.

## [6.6.1] - 2018-11-19

### Changed

- Fixed the `getActiveAnnouncements` to be `getActiveAnnouncement` to be consistent. Making this a patch even though it's breaking because I released this 5 minutes ago.

## [6.6.0] - 2018-11-19

### Added

- The `getActiveAnnouncements` call.
- The `getEventComment` call.
- The `getEventPhotoComment` call.
- The `getPost` call.
- The `getRecognitionComment` call.
- The `getUserActivityComment` call.

## [6.5.0] - 2018-11-13

### Added

- The `listEntityUsers` call.

## [6.4.1] - 2018-10-16

### Changed

- Handled the case where fetch is not even loaded at all (in IE).

## [6.4.0] - 2018-10-01

### Added

- The `autocompleteMentions` call. Slightly differs from the `autocompleteUsers` call in that it returns results no matter what (does not actually require a query).

## [6.3.2] - 2018-09-23

### Changed

- Handled the case that the nested iframe does not have `fetch` defined within the `skipPreflightChecks` function.

## [6.3.1] - 2018-09-17

### Changed

- Fixed an issue where if options objects were passed to API calls multiple times, they would be mutated between calls by the client library.

## [6.3.0] - 2018-08-31

### Added

- The `deleteUser` call (currently only accessible to CultureHQ admins).

## [6.2.0] - 2018-08-30

### Added

- The `deleteGoogleIntegration` call.

## [6.1.0] - 2018-08-30

### Added

- The `getGoogleIntegration` and `createGoogleIntegration` calls.

### Changed

- Increased the line width for `prettier` when sorting the `calls.json` file so it's a little easier to read.

## [6.0.0] - 2018-08-23

### Changed

- Stripped all reference to multipart calls, as the API now supports URLs for each of the attachments present in the product. As such we no longer allow file objects to be passed through the API calls.

## [5.0.3] - 2018-08-13

### Changed

- Bind the new `fetch` property to the child `window` when running `skipPreflightChecks` because otherwise it won't pick up the new domain.

## [5.0.2] - 2018-08-13

### Changed

- Bind the new `fetch` property to the parent `window` when running `skipPreflightChecks`.

## [5.0.1] - 2018-08-13

### Changed

- Bind `fetch` properly to the `window` in order to avoid illegal invocation errors.
- Don't use the `createConsumer` named export from `ActionCable`, just use the main object (doesn't appear to work otherwise).

## [5.0.0] - 2018-08-13

### Added

- The `skipPreflightChecks` named export that handles building an `iframe` to match domains and skip preflight CORS checks.

### Changed

- Build an iframe and change the domain in order to avoid preflight checks.
- Moved the WebSocket exports into their own named exports and out of the main client: `onEventStarting`, `onLeaderboardUpdated`, `onNotificationReceived`, `onRecognitionCreated`, and `onUserActivityCreated`.
- Moved the `autoPaginate` function into its own named export.
- Moved `endUserSimulation`, `isSimulating`, and `startUserSimulation` functions into their own named exports.
- Moved the signed in state functions into their own named exports: `isSignedIn`, `setToken`, `signIn`, and `signOut`.

## [4.1.0] - 2018-08-11

### Added

- The `onEventStarting` websocket call.

## [4.0.1] - 2018-08-08

### Changed

- Bump `actioncable` dependency.

## [4.0.0] - 2018-08-02

### Changed

- Moved the `url-polyfill` to dev dependencies. It's now the consumer's responsibility to load it.
- Removed the `store` dependency, just using `localStorage` directly.
- Removed the unnecessary `index.js` file, instead just using `client.js` as the main export.

## [3.1.0] - 2018-08-01

### Added

- The `getMicrosoftIntegration` call.

## [3.0.1] - 2018-07-31

### Changed

- Don't include `NODE_ENV` in the inlined environment variables.

## [3.0.0] - 2018-07-31

### Changed

- The name of the package has been changed to `@culturehq/client`.
- The main export is no longer a class, it's just a singleton JavaScript object. No need to instantiate it at all. As such the endpoints are no longer configurable, they're just constants now.

## [2.3.1] - 2018-07-26

### Changed

- Don't require `body` on `createPost` call.

## [2.3.0] - 2018-07-26

### Added

- The `createPost` call.
- The `updatePost` call.
- The `deletePost` call.

## [2.2.0] - 2018-07-26

### Added

- The optional `types` param to the `listUserActivities` call.
- The `pinUserActivity` and `unpinUserActivity` calls.

## [2.1.2] - 2018-07-17

### Changed

- Actually add the `calls.json` file to `dist`.

## [2.1.1] - 2018-07-17

### Changed

- Removed the `module` spec from `package.json` so webpack won't freak out because I want to use the spread operator.

## [2.1.0] - 2018-07-17

### Changed

- No longer using `webpack` to build the final distribution. Instead just use `babel` directly. Publish under both `src` (`node`) and `dist` (`CommonJS`).

## [2.0.2] - 2018-07-11

### Changed

- Fixed the `snakerize` function to not recurse infinitely.

## [2.0.1] - 2018-07-11

### Changed

- Bring back `url-polyfill` into the bundle as it's needed for IE11.

## [2.0.0] - 2018-07-11

### Changed

- The optional `logo` parameter on the `createOrganization` and `updateOrganization` calls was changed to `logoUrl`.
- Moved the `isomorphic-fetch` and `url-polyfill` packages in the `devDependencies` as they're only needed for testing.
- Made the `createAnnouncement` and `updateAnnouncement` calls `application/json` instead of multipart.
- Changed the configuration of `src/calls.json` to cut down on duplication and thereby reduce bundle size.

### Removed

- The client will no longer track if the `/profile` endpoint returns a 403 or that multiple requests return 403s in a row. This responsibility is now on the end users to verify the integrity of the requests.

## [1.8.1] - 2018-07-02

### Changed

- When automatically logging out, redirect to the login page.

## [1.8.0] - 2018-07-02

### Added

- The `exportInterests` call.

## [1.7.0] - 2018-06-22

### Added

- The `getRecognitionType` call.

## [1.6.0] - 2018-06-22

### Added

- The optional `imageUrl` parameter to the `createAnnouncement` and `updateAnnouncement` calls.
- The `approveRecognition` call.
- The `createRecognitionType` call.
- The `deleteRecognitionType` call.
- The `exportRecognitions` call.
- The `listPendingRecognitions` call.
- The `listRecognitionTypes` call.
- The `updateRecognitionType` call.

### Removed

- The optional `image` parameter from the `createAnnouncement` and `updateAnnouncement` calls.

## [1.5.2] - 2018-06-12

### Changed

- Fixed the progress checker to listen to the upload object on `signUpload` calls.

## [1.5.1] - 2018-06-11

### Changed

- Removed the usage of `async`/`await` so that users don't have to polyfill.

## [1.5.0] - 2018-06-11

### Added

- Handle signing and uploading images through the `signUpload` function.

## [1.4.0] - 2018-06-05

### Added

- The `reorderProfileInterests` call.

## [1.3.0] - 2018-06-04

### Added

- The `getAutoRecognitionSettings` call.
- The `updateAutoRecognitionSettings` call.

## [1.2.0] - 2018-06-01

### Added

- The `search` call.

## [1.1.0] - 2018-05-31

### Added

- The `exportSurvey` call.

## [1.0.0] - 2018-05-30

### Added

- The optional `createSurvey` parameter to the `createEvent` call.
- The `exportFeedback` call.

### Changed

- Actually start using semver.

### Removed

- The `adminSendInvite` call.
- The `listWidgetSurveys` call.

## [0.0.102] - 2018-05-17

### Changed

- Don't rely on `url` off the response, use the explicit request instead.

## [0.0.101] - 2018-05-17

### Added

- The optional `active` parameter on the `autocompleteUsers` call.
- The optional `by` parameter on the `listInterests` call (only available option is `most`).
- The optional `locationIds` parameter to the `listUsers` call.
- The optional `departmentIds` parameter to the `listUsers` call.
- The optional `interestIds` parameter to the `listUsers` call.

### Changed

- If the client receives a 403 on the /profile route, automatically log out as this should not happen.

## [0.0.100] - 2018-05-03

### Changed

- The `password` parameter on the `resetPassword` call to be optional to support the new managed passwords flow.

## [0.0.99] - 2018-05-03

### Added

- The optional `inviteStatus` parameter on the `autocompleteUsers` call.

### Changed

- Fixes parameter name `eventId` and `commentId` for `listEventCommentCheers`

## [0.0.98] - 2018-04-30

### Added

- The optional `locationIds` scalar parameter to the `listRecognitions` call.
- The optional `departmentIds` scalar parameter to the `listRecognitions` call.
- The optional `organizationValueIds` scalar parameter to the `listRecognitions` call.
- The optional `type` string parameter to the `listRecognitions` call, can be `automatic` or `manual`.
- The optional `includeDeactivated` boolean parameter to the `autocompleteUsers` call.
- The `listRecognitionsOrganizationValues` call.
- The `listRecognitionsRecognizedUsers` call.
- The `listRecognitionsRecognizingUsers` call.

## [0.0.97] - 2018-04-30

### Added

- The optional `listProfileManageableWidgetSurveys` call.

## [0.0.96] - 2018-04-26

### Added

- The optional `viewableResults` parameter to the `createSurvey` and `updateSurvey` calls.
- The `listProfileAvailableWidgetSurveys` call.
- The `listProfileCompletedWidgetSurveys` call.

### Removed

- The `listSurveys` call.
- The `deleteSurveyUserItemResponse` call.
- The optional `filter` parameter from the `listProfileEventSurveys` call.

## [0.0.95] - 2018-04-25

### Added

- The optional `userCreatedSlackIntegrationsEnabled`, `userCreatedSurveysEnabled`, `feedbackEnabled`, `userCreatedInvitesEnabled`, and `accountInfoEnabled` parameters to the `createOrganization` and `updateOrganization` calls.

### Changed

- Don't pass up null or undefined values.

## [0.0.94] - 2018-04-20

### Changed

- Remove previous consumer when the consumer has been disconnected.

## [0.0.93] - 2018-04-20

### Changed

- Ensure that when creating the consumer for websockets the token hasn't changed out from underneath the client.

## [0.0.92] - 2018-04-18

### Changed

- Rename the `eventType` parameter on the `listEvents` call to be `eventTypes`, which is now a scalar that will filter with an "or" condition.

## [0.0.91] - 2018-04-17

### Added

- The optional `interestIds` parameters to the `listEvents` call.
- The optional `allLocations` parameter to the `listEvents` call.
- The optional `userRelation` parameter on the `listEvents` call, valid values include "host", "responded", and "invited".
- The `onLeaderboardUpdated` function for listening to leaderboard changes.
- The `getProfilePointStanding` call for fetching the current standing of the user in terms of points.

## [0.0.90] - 2018-04-12

### Added

- The `listEventInterests` call for listing the top interests with the most events attached to them.
- The optional `googleSigninEnabled` to the `createOrganization` and `updateOrganization` calls.

## [0.0.89] - 2018-04-10

### Added

- The `listTrendingEvents` call for listing the top events with the most activity.

## [0.0.88] - 2018-03-27

### Added

- The `AutoPaginator` class, for automatically concatenating data across multiple pages of results.

## [0.0.87] - 2018-03-26

### Added

- The `listProfilePointNotifications` call for listing exclusively point notifications.
- The `createProfilePointNotificationView` call for marking all point notifications as viewed.

### Removed

- A bunch of calls were removed that are either no longer being used or were never used, including: `adminListInvites`, `createBulkUserImport`, `getBulkUserImport`, `get*Comment`, `list*Users`, `listInvites`, `listProfilePointIncrements`, and `markEventAsSponsored`.

## [0.0.86] - 2018-03-22

### Removed

- Remove the now-unsupported `getUserActivity` call.

## [0.0.85] - 2018-03-21

### Changed

- Rename `createSamlAgreement` to `createSSOAgreement`, as it's now being used by the new managed password mode as well.

## [0.0.84] - 2018-03-19

### Added

- The `getUserActivity` call for fetching an individual feed item.
- The optional `allLocations` param for the `createEvent` and `updateEvent` calls.
- The `createMeeting` call for the "Meet Someone New" feature.
- The `getUserPointIncrements` call for listing the points awarded to a particular user.

## [0.0.83] - 2018-03-13

### Added

- The optional `active` parameter to the `listUsers` call, which when given `true` or `false` will filter down to those users matching that criteria.
- The optional `inviteStatus` parameter on the `listUsers` call, which when given `"pending"` or `"expired"` will filter down to those users matching that criteria.

## [0.0.82] - 2018-03-02

### Changed

- Do not break logging to fishbowl with new client option.

## [0.0.81] - 2018-03-02

### Added

- The `onRecognitionCreated` and `onUserActivityCreated` functions for subscribing to the recognition and user activity creation channels.

## [0.0.80] - 2018-03-01

### Changed

- Auto signout after 3 403 responses.

## [0.0.79] - 2018-03-01

### Added

- Auto signout after 5 403 responses.

## [0.0.78] - 2018-03-01

### Added

- Send along the token of the simulated user as well.

## [0.0.77] - 2018-02-27

### Added

- The `invalidateOtherApiKeys` and `listApiKeys` calls.

### Removed

- The optional `primaryColor` and `secondaryColor` parameters on `createOrganization` and `updateOrganization`.

## [0.0.76] - 2018-02-26

### Added

- The `createSamlAgreement` call.

## [0.0.75] - 2018-02-23

### Changed

- Do not require body on the `createAnnouncement` or `updateAnnouncement` calls.

## [0.0.74] - 2018-02-23

### Changed

- Make the API call to delete the session when logging out.

## [0.0.73] - 2018-02-23

### Added

- The `deleteSession` call to invalidate API keys on sign out.

### Removed

- The `onPointsIncremented` function, as it has been made obsolete by the `onNotificationReceived` function.
- The `createOrganizationBot`, `deleteOrganizationBot`, and `listOrganizationBots` calls, as they're no longer necessary.

## [0.0.72] - 2018-02-20

### Added

- The `listProfileNotifications` and `createProfileNotificationView` calls.

## [0.0.71] - 2018-02-19

### Changed

- Fixed the method in which channels are subscribed.

## [0.0.70] - 2018-02-19

### Added

- The `incurredAt` optional parameter to the `createExpense` and `updateExpense` calls.
- The optional `interestNames` parameter to the `createEvent` and `updateEvent` calls.
- The `onNotificationReceived` WebSocket connection function.

### Removed

- Event tags and all references to them.

## [0.0.69] - 2018-02-15

### Changed

- The `adminSendInvite`, `sendInvite`, `updateProfile`, `updateUser` calls all changed from having the optional `departmentIds` and `locationId` parameters to having the optional `departmentNames` and `locationName` parameters. This will create one on the fly if the name is missing, allowing users to type in their own without having to go through the admin.

## [0.0.68] - 2018-02-14

### Added

- All of the `flag*` calls for flagging various content around the platform.
- The `listFlags` call with an optional `reviewed` parameter.
- The `updateFlag` call to mark something as `reviewed` or not.

### Removed

- The "extra" value from RSVP calls.
- Everything to do with event votes.
- Everything to do with event leaderboards.
- Everything to do with rewards.
- The `listProfilePointModifications` call in favor of the `listProfilePointIncrements` call (since redemptions are now gone).
- Everything to do with content moderation events.

## [0.0.67] - 2018-02-12

### Changed

- Filter out the password parameter from fishbowl requests.

## [0.0.66] - 2018-02-08

### Added

- The `onPointsIncremented` function for listening to when points are incremented, which includes the profile of the user.

### Removed

- The `onProfileUpdated` function for listening to profile changes.

## [0.0.65] - 2018-02-08

### Added

- Fail gracefully when fishbowl goes down.

## [0.0.64] - 2018-02-08

### Added

- More verbose fishbowl logging.

## [0.0.63] - 2018-02-08

### Added

- Added support to send reports to fishbowl.

## [0.0.62] - 2018-02-02

### Added

- The comment and cheer calls for event photos.
- The apparently missing `getSurveyUserItemResponse` call, which is not in use but is implemented in the API.

## [0.0.61] - 2018-02-02

### Added

- The `listUserActivities` call for fetching the activity feed.
- The `listUserActivityCheers`, `cheerUserActivity`, and `uncheerUserActivity` calls for cheering user activities.
- The `listUserActivityComments`, `getUserActivityComment`, `createUserActivityComment`, `updateUserActivityComment`, and `deleteUserActivityComment` calls for commenting on user activities.
- The `listUserActivityCommentCheers`, `cheerUserActivityComment`, and `uncheerUserActivityComment` calls for cheering user activity comments.

### Removed

- The `getPointConfig` and `updatePointConfig` calls.

## [0.0.60] - 2018-02-01

### Added

- The `onProfileUpdated` function to the main client for listening through websockets to profile updates.

## [0.0.59] - 2018-01-27

### Added

- Add the `setToken` function on the main client.

## [0.0.58] - 2018-01-27

### Added

- The `createSession` call for determining whether or not a password field should be shown.

## [0.0.57] - 2018-01-23

### Added

- The optional `mode` param on the `createOrganization` and `updateOrganization` calls. Can currently be set to `"admin_mode"` or `"user_mode"`.
- The `listContentModerationEvents` and `clearContentModerationEvent` calls.
- The optional `departmentId`, `interestId`, and `locationId` params on the `listUsers` call.
- The `cancelEvent` call, with an optional `message` parameter for messaging attendees.
- The `deleteEvent` call, with an optional `message` parameter for messaging attendees.
- The `exportEvent` call, for sending an email to the user with exported event data.

## [0.0.56] - 2018-01-15

### Added

- The `createRecognitionComment`, `deleteRecognitionComment`, `getRecognitionComment`, `listRecognitionComments`, and `updateRecognitionComment` calls, for commenting on recognitions.
- The `listEventCommentCheers`, `cheerEventComment`, and `uncheerEventComment` calls for cheering event comments.
- The `listRecognitionCommentCheers`, `cheerRecognitionComment`, and `uncheerRecognitionComment` calls for cheering recognition comments.
- The `listRecognitionCheers`, `cheerRecognition`, and `uncheerRecognition` calls for cheering recognitions.

### Changed

- The `*Comment` calls have all been changed to their equivalent `*EventComment` names. All other semantics about the calls remain the same.

## [0.0.55] - 2018-01-11

### Added

- The `eventAutocompleteInvites` call for autocompleting all of the entities that can be invites to an event, including the information about RSVPs that already exist.

## [0.0.54] - 2018-01-09

### Changed

- Ensure that objects of File or Blob type passed in an array are appropriately handled.

## [0.0.53] - 2018-01-05

### Added

- The `listProfilePointModifications` call.

## [0.0.52] - 2018-01-05

### Added

- The optional `locationIds`, `interestIds`, and `departmentIds` for the `createEventInvites` call.

## [0.0.51] - 2018-01-04

### Added

- The `listProfileRedemptions` call.

## [0.0.50] - 2018-01-02

### Changed

- Multipart requests that have `null` values in their parameters now get serialized as empty strings (because FormData serialized them as the string `"null"`).

## [0.0.49] - 2017-12-27

### Added

- The ability to create the first admin in an organization for a CultureHQ admin.
- The optional `completed` parameter to the `listWidgetSurveys` call, for filtering between complete or incomplete widget surveys.
- The `listProfilePointIncrements` for getting a history of all point increments that a user has received.

### Changed

- The `createSurvey` call's `firstEventId` parameter has been changed to `eventId` to better reflect that it is just the one event that can be linked to a survey.

### Removed

- The `createEventSurveyUserItemResponse`, `deleteEventSurveyUserItemResponse`, `listEventSurveyResults`, `listEventSurveySubmittedResponses`, `getSurveyUserItemResponse`, and `updateEventSurveyUserItemResponse` calls, in favor of their "Survey" equivalents.
- The `listActiveSurveys` call, in favor of `listWidgetSurveys` with the `active` flag set to true.

## [0.0.48] - 2017-12-22

### Changed

- The `createEvent` call now lists `details` as optional.

## [0.0.47] - 2017-12-19

### Added

- The `getProfileEmailSettings` and `updateProfileEmailSettings` calls.
- The `listWidgetSurveys` call.

## [0.0.46] - 2017-12-12

### Changed

- Switched out the URL polyfill `universal-url` for `url-polyfill`.

## [0.0.45] - 2017-12-06

### Added

- The `reorderSurveyItems` and `reorderSurveyItemResponseOptions` calls.

## [0.0.44] - 2017-12-06

### Changed

- Added all appropriate `multipart: true` parameters to multipart calls.

## [0.0.43] - 2017-12-04

### Added

- The `enableStaticWidget` and `disableStaticWidget` calls.

## [0.0.42] - 2017-12-03

### Changed

- Properly handle array parameters on GET requests.

## [0.0.41] - 2017-12-02

### Changed

- Handle empty array parameters in multipart requests.

## [0.0.40] - 2017-12-02

### Added

- The `confirmEventAttendance` and `denyEventAttendance` calls.

## [0.0.39] - 2017-12-01

### Changed

- Make the `createEventSurveyUserItemResponse` parameters optional.

## [0.0.38] - 2017-12-01

### Added

- The optional `sort` param on the `listUserRsvpdEvents` call.

### Changed

- Make the `createSurveyUserItemResponse` parameters optional.

## [0.0.37] - 2017-11-29

### Added

- The `active` status on the `listAnnouncements` call.

### Changed

- The `listUserAttendedEvents` call to `listUserRsvpdEvents` call.

## [0.0.36] - 2017-11-28

### Added

- The `reorderWidgets` call.

## [0.0.35] - 2017-11-27

### Added

- The `eventAutocompleteRsvps` call, for searching for a specific RSVP on an event.

### Changed

- The `image` parameter should not be required for announcements.

### Removed

- The `createOktaApiKey` call, which no longer exists in the API.

## [0.0.34] - 2017-11-21

### Added

- The ability to specify arbitrary event tags on event create and update. Additionally provide a `listEventTag` call for getting the current created ones.
- The ability to filter on `sponsored`, `eventType`, and/or `organizationValueIds` on the `listEvents` call.

## [0.0.33] - 2017-11-13

### Added

- The `includeDeactivated` param on the `listUsers`, `listInterestUsers`, and `listDepartmentUsers` calls (only accessible by admins).
- The `createUserInvite` call for inviting a user explicitly after they have already been created but not yet claimed. This call will fail if the user is already claimed.
- The `createOrganizationBot`, `deleteOrganizationBot`, and `listOrganizationBots` calls for managing organization bots.
- The optional `organizationAdmin` parameter for the `updateUser` call (only functional if you yourself are an admin).

### Changed

- The `interests` param on the `sendInvite`, `updateProfile`, and `updateUser` calls have all been updated to `interestNames`.

## [0.0.32] - 2017-11-08

### Added

- The `sendInvite` call now permits all of the same parameters as updating a user's profile, in order to set them at invite time.
- The `image` param on creating and updating announcements.
- The `createBulkUserImport` and `getBulkUserImport` calls.
- The `createSimulation` and associated `adminAutocompleteUsers` call.
- The `startUserSimulation`, `endUserSimulation`, and `isSimulating` functions on the main client object.
- The optional `timezone` param on the `createEvent` call.

### Removed

- You can no longer pass `name` and `locationId` to the `registerUser` call. Instead, `password` is the only accepted parameter.

## [0.0.31] - 2017-11-07

### Added

- The `getInvite` call for checking if a token is valid.
- The `when` param to `listEvents` which can be `past`, `present`, or `future`.

### Changed

- The `changePassword` call now requires an `oldPassword` and `newPassword` parameter.

## [0.0.30] - 2017-11-03

### Changed

- Full remove `async/await` calls to simplify dependencies.

## [0.0.29] - 2017-11-03

### Changed

- Removing `async/await` calls to simplify dependencies.

## [0.0.28] - 2017-11-03

### Changed

- Added `babel-present-env` in order to properly convert `async/await` constructs to generators.

## [0.0.27] - 2017-11-02

### Added

- A `bin/cleanup` script for prettier.
- Added `listSlackIntegrations`, `createSlackIntegration`, and `deleteSlackIntegration`

## [0.0.26] - 2017-11-02

### Added

- The optional `sort` param to the `listEvents` call, which at the moment can be either `-starts_at` or `+starts_at`.
- The optional `responseType` param to the `listEventRsvps` call for filtering. Currently can be one of `invited`, `declined`, `interested`, `accepted`, or `checked_in`.
- The `listSurveySubmittedResponses` and `listEventSurveySubmittedResponses` calls.
- The `listDepartmentUsers` and `listInterestUsers` calls.

### Changed

- Fixed the way responses were being parsed to instead check the content-type header such that we don't run into unexpected JSON parsing errors.
- Changed the test port from 8080 to 1693.

## [0.0.25] - 2017-10-29

### Added

- The optional `openInvites` param to create and update event calls.
- The optional `inviteeIds` param on the `createEvent` call.
- The `getOrganizationValueLeaderboard` call.
- The `getUserRecognitionLeaderboard` call.
- The optional `reviewed` param on the `listFeedbacks` call that can be either `reviewed` or `not_reviewed`.
- The `createOktaApiKey` call and `signInWithOkta` function.
- The `X-Client-Version` header on all requests so that it can be tracked for metrics later.

### Changed

- The `getPointLeaderboard` call got an updated endpoint.

## [0.0.24] - 2017-10-26

### Added

- The `createInterest` and `updateInterest` calls.
- The optional `active` param to the create and update organization calls.
- The `listProfileEventSurveys` call with the optional `filter` param, which can be "complete" or "incomplete".
- The optional `inviteOnly` param to create and update event calls.

## [0.0.23] - 2017-10-25

### Added

- The ability to activate and deactivate surveys through the `activateSurvey` and `deactivateSurvey` calls.
- The `listActiveSurveys` call.
- The `getEventAnalytics` call.
- The optional `firstEventId` param to the `createSurvey` call.
- The optional `cap` param to the create and update event calls.
- The optional `locationIds` param to the create and update event calls.
- The CRUD calls for locations, including: `createLocation`, `deleteLocation`, `getLocation`, `listLocations`, and `updateLocation`.
- The optional `locationIds` param to the `listEvents` call.
- The `locationId` param to the register and update user calls.

## [0.0.22] - 2017-10-24

### Added

- The CRUD calls for the event leaderboard attribute entity, including: `createEventLeaderboardAttribute`, `deleteEventLeaderboardAttribute`, `getEventLeaderboardAttribute`, `listEventLeaderboardAttributes`, and `updateEventLeaderboardAttribute`.
- The CRUD calls for the event leaderboard attribute rsvp entity, including: `createEventLeaderboardAttributeRsvp`, `deleteEventLeaderboardAttributeRsvp`, and `updateEventLeaderboardAttributeRsvp`.
- The CRUD calls for the event votes entity, including: `createEventVote`, `getEventVote`, `deleteEventVote`, `listEventVotes`, and `updateEventVote`.
- The CRUD calls for the event vote entry entity, including: `createEventVoteEntry`, `deleteEventVoteEntry`, and `updateEventVoteEntry`.
- The calls for approving and unapproving an event vote entry.
- The calls for voting for and removing a vote from an event vote entry.
- The `autocompleteUsers` call.
- The optional `range` option to the `listEvents` call.

### Changed

- The `updatePointConfig` param from `firstEvent` to `firstPublicEvent`.
- Fixed handling no content coming back from API.
- Fixed the `interestList` param to be `interests`.

## [0.0.21] - 2017-10-23

### Added

- The `listDepartmentAnalytics` call.
- The `listOrganizationValueEvents` call.
- The optional `organizationValueIds` param to the create and update event calls.
- The `getDepartmentEventParticipation` call.
- The `createEventInvites` call.
- The optional `location` param to the create and update event calls.
- The optional `visibility` param to the create and update event calls, must be either `"view_public"` or `"view_private"`.
- The `listActiveAnnouncements` call and the optional `active` param on announcement create and update calls.

### Changed

- Handle arrays properly in multipart form data.

## [0.0.20] - 2017-10-19

### Changed

- Fixing the bad 0.0.19 release.

## [0.0.19] - 2017-10-19

### Added

- The `checkInEventAttendee` call.
- The optional `image` param to the create and update rewards calls.

### Changed

- `DELETE` calls are now properly handled (since they return no content, they were previously breaking because we were attempting to parse an empty string as JSON).
- API call functions are now constructed when the client is initially constructed as opposed to on the prototype. This allows them to change state based on the configuration of the client object.

## [0.0.18] - 2017-10-17

### Changed

- The `listUserEvents` call to `listUserHostedEvents` to better reflect what it's doing.
- The `getUserAttendedEvents` to `listUserAttendedEvents` to better reflect that an array is returned.
- Moved all of the calls from `/src/calls/*.js` into one `/src/calls.json`. Things are now much more consolidated and smaller.
- Made the `CultureHQ` object into a class that should now be instantiated with an object that contains an `apiHost` key. For now this is the only option, but it leaves it open for further expansion later (currently considering a `verbose` option).

## [0.0.17] - 2017-10-17

### Added

- The `getPointLeaderboard` call.
- The `image` param on the `createEvent` call.
- The `getPhotoGallery` call.
- The `logo` param on the `createOrganization` and `updateOrganization` call.
- The `messageEventGuests` param.
- The `subscribeToEventNotifications` and `unsubscribeFromEventNotifications` calls.
- The `updateEvent` call.
- The `markEventAsSponsored` call.
- The `listEventsByOrganization` call.
- The CRUD actions for photo tags.
- The `duplicateEvent` call.

### Changed

- Modified the `surveyItem` param to be `surveyItemId` on the `updateSurveyItem` action to be consistent.
- Build process should extract config from application code by having a `build/constants.js` that can define a webpack plugin.
- Fixed the expense endpoints.

## [0.0.16] - 2017-10-12

### Added

- The `getUserPointBreakdown` call for generating pie charts based on historical user points.
- The `getUserEventTypeBreakdown` call for generating pie charts based on historical user attendance.
- The `getUserAttendedEvents` to get the past events that a user has attended.

### Changed

- Fixed `updateSurveyItem` endpoint.

## [0.0.15] - 2017-10-12

### Added

- Actions for creating event photos.
- The `title` param on updating users and profiles.

### Changed

- Handle nested null in API call params.
- Fixed the endpoint for `listRewardRedemptions`.

## [0.0.14] - 2017-10-11

### Added

- The ability to handle multipart uploads.
- An `updateProfile` call because the `updateUser` action on the API is now locked down to admins.

### Changed

- The point config parameter `profilePicture` was changed to `avatar`.

## [0.0.13] - 2017-10-11

### Added

- Actions for listing survey results attached to events and for responding to surveys attached to events.
- Actions for getting and updating the point configuration for an organization.

### Changed

- Fixed the deactivation endpoint for users.
- Fixed the point increments endpoint.
- Fixed the name of the point config param from `hobbies` to `interests`.
- Adding the optional points param to surveys.

## [0.0.12] - 2017-10-10

### Added

- Add organization value CRUD actions.
- Add recognition CRUD actions.
- Add CRUD actions for surveys, survey items, and survey item response options.
- Add CRUD actions for listing survey results and managing responses to survey items.

### Changed

- Fixed accidentally assigning back to call path which was preventing binds in paths being used more than once.

## [0.0.11] - 2017-10-05

### Changed

- Properly handle arrays coming back to be transformed as arrays.

## [0.0.10] - 2017-10-05

### Added

- Additional actions for RSVPs, including `getEventRsvp`, `listEventRsvps`, and `updateEventRsvp`.

### Changed

- Changed the name of the `createRSVP` action to `createEventRsvp` to be more consistent.

## [0.0.9] - 2017-10-05

### Changed

- The main entry point for this package has been changed to the `dist` directory for usage as a library.

## [0.0.8] - 2017-10-04

### Added

- Add reward CRUD actions.
- Add redemption CRUD actions.
- Add announcement CRUD actions.
- Add incrementUserPoints action.
- Add the optional color parameters to organizations CRUD.
- Add analytics calls for users and events.
- Add gamificationEnabled optional parameter to organizations CRUD.
- Add expense CRUD actions.
- Add interest fetching and deleting actions.

### Changed

- Refactored tests to automatically detect new API calls and test them.
- Make the routes more consistent with their id names by changing orgId to organizationId and dptId to departmentId.
- Fixed the routing on the comment actions.

## [0.0.7] - 2017-10-02

### Added

- Add requestPasswordReset and resetPassword commands for a "Forgot Password" flow.
- Add the comment CRUD actions.
- Add the feedback mechanisms.

### Changed

- Fixed the department calls such that they're actually added to the singleton CultureHQ object.

## [0.0.6] - 2017-10-01

### Added

- Add the listInvites command for hitting the corresponding API endpoint.
- Add deactivateUser and reactivateUser commands.
- Add the updateUser command.
- Add department commands to handle department CRUD.

### Changed

- Allow department ids to be passed to the updateUser command.

## [0.0.5] - 2017-10-01

### Added

- Add the listUsers command for hitting the corresponding API endpoint.

### Changed

- Allow case changing to handle undefined or null response bodies returned from the API.

## [0.0.4] - 2017-09-28

### Changed

- Refactor the API calls to be generated functions run through the api-call module. This simplifies the call structure and allows easier refactoring of overall interactions with the API.
- Move API calls into their own modules that extend the main object so that it's easier to extend in the future.
- Rename some parameters to make more sense, e.g. id -> orgId.

## [0.0.3] - 2017-09-23

### Changed

- Add `webpack-node-externals` to make sure dependencies aren't bundled together with the build when targeting another node project.
- Build both variables so it can be used in the sample and also the web.

## [0.0.2] - 2017-09-22

### Added

- Allow GET requests to have query parameters.
- Mark responses with 3xx status codes as successful.

## [0.0.1] - 2017-09-22

### Added

- Initial checkin.

[unreleased]: https://github.com/CultureHQ/client/compare/v10.2.1...HEAD
[10.2.1]: https://github.com/CultureHQ/client/compare/v10.2.0...v10.2.1
[10.2.0]: https://github.com/CultureHQ/client/compare/v10.1.0...v10.2.0
[10.1.0]: https://github.com/CultureHQ/client/compare/v10.0.1...v10.1.0
[10.0.1]: https://github.com/CultureHQ/client/compare/v10.0.0...v10.0.1
[10.0.0]: https://github.com/CultureHQ/client/compare/v9.7.0...v10.0.0
[9.7.0]: https://github.com/CultureHQ/client/compare/v9.6.1...v9.7.0
[9.6.1]: https://github.com/CultureHQ/client/compare/v9.6.0...v9.6.1
[9.6.0]: https://github.com/CultureHQ/client/compare/v9.5.1...v9.6.0
[9.5.1]: https://github.com/CultureHQ/client/compare/v9.5.0...v9.5.1
[9.5.0]: https://github.com/CultureHQ/client/compare/v9.4.0...v9.5.0
[9.4.0]: https://github.com/CultureHQ/client/compare/v9.3.0...v9.4.0
[9.3.0]: https://github.com/CultureHQ/client/compare/v9.2.0...v9.3.0
[9.2.0]: https://github.com/CultureHQ/client/compare/v9.1.2...v9.2.0
[9.1.2]: https://github.com/CultureHQ/client/compare/v9.1.1...v9.1.2
[9.1.1]: https://github.com/CultureHQ/client/compare/v9.1.0...v9.1.1
[9.1.0]: https://github.com/CultureHQ/client/compare/v9.0.0...v9.1.0
[9.0.0]: https://github.com/CultureHQ/client/compare/v8.7.0...v9.0.0
[8.7.0]: https://github.com/CultureHQ/client/compare/v8.6.0...v8.7.0
[8.6.0]: https://github.com/CultureHQ/client/compare/v8.5.0...v8.6.0
[8.5.0]: https://github.com/CultureHQ/client/compare/v8.4.0...v8.5.0
[8.4.0]: https://github.com/CultureHQ/client/compare/v8.3.0...v8.4.0
[8.3.0]: https://github.com/CultureHQ/client/compare/v8.2.0...v8.3.0
[8.2.0]: https://github.com/CultureHQ/client/compare/v8.1.2...v8.2.0
[8.1.2]: https://github.com/CultureHQ/client/compare/v8.1.1...v8.1.2
[8.1.1]: https://github.com/CultureHQ/client/compare/v8.1.0...v8.1.1
[8.1.0]: https://github.com/CultureHQ/client/compare/v8.0.0...v8.1.0
[8.0.0]: https://github.com/CultureHQ/client/compare/v7.1.0...v8.0.0
[7.1.0]: https://github.com/CultureHQ/client/compare/v7.0.0...v7.1.0
[7.0.0]: https://github.com/CultureHQ/client/compare/v6.7.2...v7.0.0
[6.7.2]: https://github.com/CultureHQ/client/compare/v6.7.1...v6.7.2
[6.7.1]: https://github.com/CultureHQ/client/compare/v6.7.0...v6.7.1
[6.7.0]: https://github.com/CultureHQ/client/compare/v6.6.2...v6.7.0
[6.6.2]: https://github.com/CultureHQ/client/compare/v6.6.1...v6.6.2
[6.6.1]: https://github.com/CultureHQ/client/compare/v6.6.0...v6.6.1
[6.6.0]: https://github.com/CultureHQ/client/compare/v6.5.0...v6.6.0
[6.5.0]: https://github.com/CultureHQ/client/compare/v6.4.1...v6.5.0
[6.4.1]: https://github.com/CultureHQ/client/compare/v6.4.0...v6.4.1
[6.4.0]: https://github.com/CultureHQ/client/compare/v6.3.2...v6.4.0
[6.3.2]: https://github.com/CultureHQ/client/compare/v6.3.1...v6.3.2
[6.3.1]: https://github.com/CultureHQ/client/compare/v6.3.0...v6.3.1
[6.3.0]: https://github.com/CultureHQ/client/compare/v6.2.0...v6.3.0
[6.2.0]: https://github.com/CultureHQ/client/compare/v6.1.0...v6.2.0
[6.1.0]: https://github.com/CultureHQ/client/compare/v6.0.0...v6.1.0
[6.0.0]: https://github.com/CultureHQ/client/compare/v5.0.3...v6.0.0
[5.0.3]: https://github.com/CultureHQ/client/compare/v5.0.2...v5.0.3
[5.0.2]: https://github.com/CultureHQ/client/compare/v5.0.1...v5.0.2
[5.0.1]: https://github.com/CultureHQ/client/compare/v5.0.0...v5.0.1
[5.0.0]: https://github.com/CultureHQ/client/compare/v4.1.0...v5.0.0
[4.1.0]: https://github.com/CultureHQ/client/compare/v4.0.1...v4.1.0
[4.0.1]: https://github.com/CultureHQ/client/compare/v4.0.0...v4.0.1
[4.0.0]: https://github.com/CultureHQ/client/compare/v3.1.0...v4.0.0
[3.1.0]: https://github.com/CultureHQ/client/compare/v3.0.1...v3.1.0
[3.0.1]: https://github.com/CultureHQ/client/compare/v3.0.0...v3.0.1
[3.0.0]: https://github.com/CultureHQ/client/compare/v2.3.1...v3.0.0
[2.3.1]: https://github.com/CultureHQ/client/compare/v2.3.0...v2.3.1
[2.3.0]: https://github.com/CultureHQ/client/compare/v2.2.0...v2.3.0
[2.2.0]: https://github.com/CultureHQ/client/compare/v2.1.2...v2.2.0
[2.1.2]: https://github.com/CultureHQ/client/compare/v2.1.1...v2.1.2
[2.1.1]: https://github.com/CultureHQ/client/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/CultureHQ/client/compare/v2.0.2...v2.1.0
[2.0.2]: https://github.com/CultureHQ/client/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/CultureHQ/client/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/CultureHQ/client/compare/v1.8.1...v2.0.0
[1.8.1]: https://github.com/CultureHQ/client/compare/v1.8.0...v1.8.1
[1.8.0]: https://github.com/CultureHQ/client/compare/v1.7.0...v1.8.0
[1.7.0]: https://github.com/CultureHQ/client/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/CultureHQ/client/compare/v1.5.2...v1.6.0
[1.5.2]: https://github.com/CultureHQ/client/compare/v1.5.1...v1.5.2
[1.5.1]: https://github.com/CultureHQ/client/compare/v1.5.0...v1.5.1
[1.5.0]: https://github.com/CultureHQ/client/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/CultureHQ/client/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/CultureHQ/client/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/CultureHQ/client/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/CultureHQ/client/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/CultureHQ/client/compare/v0.0.102...v1.0.0
[0.0.102]: https://github.com/CultureHQ/client/compare/v0.0.101...v0.0.102
[0.0.101]: https://github.com/CultureHQ/client/compare/v0.0.100...v0.0.101
[0.0.100]: https://github.com/CultureHQ/client/compare/v0.0.99...v0.0.100
[0.0.99]: https://github.com/CultureHQ/client/compare/v0.0.98...v0.0.99
[0.0.98]: https://github.com/CultureHQ/client/compare/v0.0.97...v0.0.98
[0.0.97]: https://github.com/CultureHQ/client/compare/v0.0.96...v0.0.97
[0.0.96]: https://github.com/CultureHQ/client/compare/v0.0.95...v0.0.96
[0.0.95]: https://github.com/CultureHQ/client/compare/v0.0.94...v0.0.95
[0.0.94]: https://github.com/CultureHQ/client/compare/v0.0.93...v0.0.94
[0.0.93]: https://github.com/CultureHQ/client/compare/v0.0.92...v0.0.93
[0.0.92]: https://github.com/CultureHQ/client/compare/v0.0.91...v0.0.92
[0.0.91]: https://github.com/CultureHQ/client/compare/v0.0.90...v0.0.91
[0.0.90]: https://github.com/CultureHQ/client/compare/v0.0.89...v0.0.90
[0.0.89]: https://github.com/CultureHQ/client/compare/v0.0.88...v0.0.89
[0.0.88]: https://github.com/CultureHQ/client/compare/v0.0.87...v0.0.88
[0.0.87]: https://github.com/CultureHQ/client/compare/v0.0.86...v0.0.87
[0.0.86]: https://github.com/CultureHQ/client/compare/v0.0.85...v0.0.86
[0.0.85]: https://github.com/CultureHQ/client/compare/v0.0.84...v0.0.85
[0.0.84]: https://github.com/CultureHQ/client/compare/v0.0.83...v0.0.84
[0.0.83]: https://github.com/CultureHQ/client/compare/v0.0.82...v0.0.83
[0.0.82]: https://github.com/CultureHQ/client/compare/v0.0.81...v0.0.82
[0.0.81]: https://github.com/CultureHQ/client/compare/v0.0.80...v0.0.81
[0.0.80]: https://github.com/CultureHQ/client/compare/v0.0.79...v0.0.80
[0.0.79]: https://github.com/CultureHQ/client/compare/v0.0.78...v0.0.79
[0.0.78]: https://github.com/CultureHQ/client/compare/v0.0.77...v0.0.78
[0.0.77]: https://github.com/CultureHQ/client/compare/v0.0.76...v0.0.77
[0.0.76]: https://github.com/CultureHQ/client/compare/v0.0.75...v0.0.76
[0.0.75]: https://github.com/CultureHQ/client/compare/v0.0.74...v0.0.75
[0.0.74]: https://github.com/CultureHQ/client/compare/v0.0.73...v0.0.74
[0.0.73]: https://github.com/CultureHQ/client/compare/v0.0.72...v0.0.73
[0.0.72]: https://github.com/CultureHQ/client/compare/v0.0.71...v0.0.72
[0.0.71]: https://github.com/CultureHQ/client/compare/v0.0.70...v0.0.71
[0.0.70]: https://github.com/CultureHQ/client/compare/v0.0.69...v0.0.70
[0.0.69]: https://github.com/CultureHQ/client/compare/v0.0.68...v0.0.69
[0.0.68]: https://github.com/CultureHQ/client/compare/v0.0.67...v0.0.68
[0.0.67]: https://github.com/CultureHQ/client/compare/v0.0.66...v0.0.67
[0.0.66]: https://github.com/CultureHQ/client/compare/v0.0.65...v0.0.66
[0.0.65]: https://github.com/CultureHQ/client/compare/v0.0.64...v0.0.65
[0.0.64]: https://github.com/CultureHQ/client/compare/v0.0.63...v0.0.64
[0.0.63]: https://github.com/CultureHQ/client/compare/v0.0.62...v0.0.63
[0.0.62]: https://github.com/CultureHQ/client/compare/v0.0.61...v0.0.62
[0.0.61]: https://github.com/CultureHQ/client/compare/v0.0.60...v0.0.61
[0.0.60]: https://github.com/CultureHQ/client/compare/v0.0.59...v0.0.60
[0.0.59]: https://github.com/CultureHQ/client/compare/v0.0.58...v0.0.59
[0.0.58]: https://github.com/CultureHQ/client/compare/v0.0.57...v0.0.58
[0.0.57]: https://github.com/CultureHQ/client/compare/v0.0.56...v0.0.57
[0.0.56]: https://github.com/CultureHQ/client/compare/v0.0.55...v0.0.56
[0.0.55]: https://github.com/CultureHQ/client/compare/v0.0.54...v0.0.55
[0.0.54]: https://github.com/CultureHQ/client/compare/v0.0.53...v0.0.54
[0.0.53]: https://github.com/CultureHQ/client/compare/v0.0.52...v0.0.53
[0.0.52]: https://github.com/CultureHQ/client/compare/v0.0.51...v0.0.52
[0.0.51]: https://github.com/CultureHQ/client/compare/v0.0.50...v0.0.51
[0.0.50]: https://github.com/CultureHQ/client/compare/v0.0.49...v0.0.50
[0.0.49]: https://github.com/CultureHQ/client/compare/v0.0.48...v0.0.49
[0.0.48]: https://github.com/CultureHQ/client/compare/v0.0.47...v0.0.48
[0.0.47]: https://github.com/CultureHQ/client/compare/v0.0.46...v0.0.47
[0.0.46]: https://github.com/CultureHQ/client/compare/v0.0.45...v0.0.46
[0.0.45]: https://github.com/CultureHQ/client/compare/v0.0.44...v0.0.45
[0.0.44]: https://github.com/CultureHQ/client/compare/v0.0.43...v0.0.44
[0.0.43]: https://github.com/CultureHQ/client/compare/v0.0.42...v0.0.43
[0.0.42]: https://github.com/CultureHQ/client/compare/v0.0.41...v0.0.42
[0.0.41]: https://github.com/CultureHQ/client/compare/v0.0.40...v0.0.41
[0.0.40]: https://github.com/CultureHQ/client/compare/v0.0.39...v0.0.40
[0.0.39]: https://github.com/CultureHQ/client/compare/v0.0.38...v0.0.39
[0.0.38]: https://github.com/CultureHQ/client/compare/v0.0.37...v0.0.38
[0.0.37]: https://github.com/CultureHQ/client/compare/v0.0.36...v0.0.37
[0.0.36]: https://github.com/CultureHQ/client/compare/v0.0.35...v0.0.36
[0.0.35]: https://github.com/CultureHQ/client/compare/v0.0.34...v0.0.35
[0.0.34]: https://github.com/CultureHQ/client/compare/v0.0.33...v0.0.34
[0.0.33]: https://github.com/CultureHQ/client/compare/v0.0.32...v0.0.33
[0.0.32]: https://github.com/CultureHQ/client/compare/v0.0.31...v0.0.32
[0.0.31]: https://github.com/CultureHQ/client/compare/v0.0.30...v0.0.31
[0.0.30]: https://github.com/CultureHQ/client/compare/v0.0.29...v0.0.30
[0.0.29]: https://github.com/CultureHQ/client/compare/v0.0.28...v0.0.29
[0.0.28]: https://github.com/CultureHQ/client/compare/v0.0.27...v0.0.28
[0.0.27]: https://github.com/CultureHQ/client/compare/v0.0.26...v0.0.27
[0.0.26]: https://github.com/CultureHQ/client/compare/v0.0.25...v0.0.26
[0.0.25]: https://github.com/CultureHQ/client/compare/v0.0.24...v0.0.25
[0.0.24]: https://github.com/CultureHQ/client/compare/v0.0.23...v0.0.24
[0.0.23]: https://github.com/CultureHQ/client/compare/v0.0.22...v0.0.23
[0.0.22]: https://github.com/CultureHQ/client/compare/v0.0.21...v0.0.22
[0.0.21]: https://github.com/CultureHQ/client/compare/v0.0.20...v0.0.21
[0.0.20]: https://github.com/CultureHQ/client/compare/v0.0.19...v0.0.20
[0.0.19]: https://github.com/CultureHQ/client/compare/v0.0.18...v0.0.19
[0.0.18]: https://github.com/CultureHQ/client/compare/v0.0.17...v0.0.18
[0.0.17]: https://github.com/CultureHQ/client/compare/v0.0.16...v0.0.17
[0.0.16]: https://github.com/CultureHQ/client/compare/v0.0.15...v0.0.16
[0.0.15]: https://github.com/CultureHQ/client/compare/v0.0.14...v0.0.15
[0.0.14]: https://github.com/CultureHQ/client/compare/v0.0.13...v0.0.14
[0.0.13]: https://github.com/CultureHQ/client/compare/v0.0.12...v0.0.13
[0.0.12]: https://github.com/CultureHQ/client/compare/v0.0.11...v0.0.12
[0.0.11]: https://github.com/CultureHQ/client/compare/v0.0.10...v0.0.11
[0.0.10]: https://github.com/CultureHQ/client/compare/v0.0.9...v0.0.10
[0.0.9]: https://github.com/CultureHQ/client/compare/v0.0.8...v0.0.9
[0.0.8]: https://github.com/CultureHQ/client/compare/v0.0.7...v0.0.8
[0.0.7]: https://github.com/CultureHQ/client/compare/v0.0.6...v0.0.7
[0.0.6]: https://github.com/CultureHQ/client/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/CultureHQ/client/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/CultureHQ/client/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/CultureHQ/client/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/CultureHQ/client/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/CultureHQ/client/compare/f26481...v0.0.1
