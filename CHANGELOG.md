# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
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

## 0.0.1 - 2017-09-22
### Added
- Initial checkin.

[Unreleased]: https://github.com/CultureHQ/client/compare/v0.0.5...HEAD
[0.0.5]: https://github.com/CultureHQ/client/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/CultureHQ/client/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/CultureHQ/client/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/CultureHQ/client/compare/v0.0.1...v0.0.2
