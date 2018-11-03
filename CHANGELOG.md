# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [v0.10.2](https://github.com/kalvn/Shaarli-Material/releases/tag/v0.10.2) - ????-??-??
### Added
- Supports Shaarli v0.10.2
- Thumbnail update page
- Keyboard shortcut "S" displays search overlay

## [v0.9.5](https://github.com/kalvn/Shaarli-Material/releases/tag/v0.9.5) - 2018-02-08
### Changed
- Optimizes bookmarklet popup size and enables scrollbars

### Removed
- Redirector setting as it was removed from Shaarli core

### Fixed
- Typo in the bottom link counter.


## [v0.9.3](https://github.com/kalvn/Shaarli-Material/releases/tag/v0.9.3) - 2018-01-08
### Added
- Supports Shaarli v0.9.3 with an important security fix
- New design for The Daily Shaarli

### Fixed
- Now properly applies MATERIAL_COLOR variable


## [v0.9.2](https://github.com/kalvn/Shaarli-Material/releases/tag/v0.9.2) - 2017-10-23
### Added
- Unique version hash appended to JS and CSS files to avoid cache issue after an update
- *Remember me* setting is taken into account

### Changed
- Modified [referrer policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy) to `cross-origin` instead of `origin-when-crossorigin`

### Fixed
- Links in footer


## [v0.9.1](https://github.com/kalvn/Shaarli-Material/releases/tag/v0.9.1) - 2017-10-08
### Added
- Tag list view
- Creation date when editing a link
- Filter in the toolbar to display only untagged links
- Batch link selection and deletion
- Icons from iconfont in toolbar, Tools page, floating add button, etc.
- 3rd party plugins and application on Tools page
- Icon for notes in link list

### Changed
- Plugin error design is better integrated

### Removed
- config.MATERIAL_COLOR, config.MATERIAL_COLOR_FOCUS and config.MATERIAL_COLOR_ACTIVE customization options. The first one is still present but only acts on a meta tag in `<head>`. They are replaced by `data/user.css` with an example in `user.example.css`.

### Fixed
- Auto-complete plugin for search field is now only initialized once
