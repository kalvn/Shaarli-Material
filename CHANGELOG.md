# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## v0.9.1
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
