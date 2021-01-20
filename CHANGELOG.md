# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).


## v0.12.1
### Added
- Support for Shaarli v0.12.1.
- Async metadata loading when adding a new link.
- Working with URL rewriting disabled.
- Highlight searched text in links and tags.
- Server page which shows you details about your server config.
- Weekly and Monthly Shaarli, in addition to the Daily.
- Support for customized tag separator.
- ESLint to ensure better JS code quality.

### Changed
- Replaced the QR Code JS library from [qrcodejs](https://davidshimjs.github.io/qrcodejs/) to [qrcode](https://github.com/soldair/node-qrcode).
- Improved overall localization.
- Build system from Gulp to Rollup.

### Fixed
- Page unique identification.

### Removed
- `config.MATERIAL_DATE_FROMNOW` option, in order to greatly reduce JS dependencies size.
- `moment.js` JS dependency.
- Dropped support for IE9 and IE10.


## [v0.12.0](https://github.com/kalvn/Shaarli-Material/releases/tag/v0.12.0) - 2020-11-28
### Added
- Support for Shaarli v0.12.0.
- Support for new page URLs.
- `lang` attribute in `<html>` tag.

### Changed
- Jump from jQuery v1.12.4 to v3.4.1. It lowers browser support to IE9+.
- Other NPM dependencies updated.

### Fixed
- An issue where the login form couldn't be displayed.
- An issue where images where overflowing their container when markdown is enabled.

### Removed
- Firefox Social API support.


## [v0.11.0](https://github.com/kalvn/Shaarli-Material/releases/tag/v0.11.0) - 2020-04-08
### Added
- Batch mode: option to select all links on the page.
- Batch mode: visibility settings.
- NPM dependencies updated.


## [v0.10.4](https://github.com/kalvn/Shaarli-Material/releases/tag/v0.10.4) - 2019-04-16
### Added
- Support of `<del>` tag in Markdown.

### Fixed
- Unformatted date is now displayed instead of "Invalid date" in some cases when date format is not recognized.

### Changed
- Slight design refresh.
- Improved search overlay usability.
- Optimized fonts loading by making text readable while loading.


## [v0.10.3](https://github.com/kalvn/Shaarli-Material/releases/tag/v0.10.3) - 2019-03-29
Be careful, one important change comes with this release: the `build` folder is not anymore part of the code repository. So if you use to update the theme with `git pull`, you now need to do

```bash
$ git pull
$ npm install
$ gulp build
```

This will install build tools and process files. I'll now attach ready-to-use built theme to each release, similarly to what is done for Shaarli.

**Known issue:** the build process outputs scary errors due to new version of *uncss* not understanding properly some links containing RainTPL markup. This doesn't prevent it from working properly so you can ignore.

### Changed
- Processed JS and CSS files are not anymore in code repository.
- Reorganisation of directories in order to keep `/material` directory clean.
- Updated dependencies.
- Updated Gulp to v4.
- Refreshed linklist page design.

### Removed
- Bower. Front-end dependencies are now also retrieved with NPM.


## [v0.10.2-patch.3](https://github.com/kalvn/Shaarli-Material/releases/tag/v0.10.2-patch.3) - 2019-01-12
### Fixed
- Laggy popup animation.
- Missing feedback when deleting tag.
- Error on permalink page due to inexistant variables with Shaarli v0.10.2.

### Removed
- Useless resources.


## [v0.10.2-patch.2](https://github.com/kalvn/Shaarli-Material/releases/tag/v0.10.2-patch.2) - 2018-11-06
### Fixed
- HTML class added in the wrong place.
- RainTPL escaping in linklist page.
- Open Graph description containing html tags.


## [v0.10.2](https://github.com/kalvn/Shaarli-Material/releases/tag/v0.10.2) - 2018-11-04
### Added
- Supports Shaarli v0.10.2
- Thumbnail update page
- Keyboard shortcut "S" displays search overlay

### Fixed
- Thumbnails on link list and daily pages
- Daily previous link not disabled properly when on oldest day


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
