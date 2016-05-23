# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).
This changelog's template come from [keepachangelog.com](http://keepachangelog.com/). When editing this document, please follow the convention specified there.

## [Unreleased]
### Changed

## [0.0.6] - 2016-05-20
### Added
- Add utm infos for Google analytics if the link belong to seekube.com

## [0.0.5] - 2016-05-20
### Changed
- Add pageview analytics at the initialization.
- Add Hostname and Pathname to the analytics request when a user click on a link

## [0.0.4] - 2016-05-20
### Changed
- Correction error in getOrCreateGUID in SeekubeUtils
- Update README

## [0.0.3] - 2016-05-20
### Changed
- Add Changelog to the project
- Refactoring event-widget
- Add settings to be able to configure the widget
- Create SeekubeUtils which contains utility functions
- Add [google-analytics measurement](https://developers.google.com/analytics/devguides/collection/protocol/v1/) in the event-widget
