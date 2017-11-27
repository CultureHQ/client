# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/CultureHQ/client/compare/v0.0.35...HEAD
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
