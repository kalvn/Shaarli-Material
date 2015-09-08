# Shaarli Material Theme
Shaarli Material is a theme for [Shaarli](https://github.com/shaarli/Shaarli), the famous personal, minimalist, super-fast, no-database delicious clone.


## Screenshots
![Shaarli Material Screenshot Home](https://raw.githubusercontent.com/kalvn/Shaarli-Material/master/material/screenshots/home.png)

[More screenshots](https://github.com/kalvn/Shaarli-Material/tree/master/material/screenshots).


## Requirements
You need to have Shaarli **0.0.44beta** installed or above. You can try with version 0.0.43beta but there might be some issues with PHP variable I use and that don't exist in `index.php`.

Older versions won't work, take a look at the [official project](https://github.com/shaarli/Shaarli) to download or upgrade.


## Download
To download this theme, [visit this page](https://github.com/kalvn/Shaarli-Material/releases) and choose the most recent version matching the version of your Shaarli installation. Both use the same notation.

Versions suffixed by `-patch.x` include some bugfix so take those preferentially if they exist for the version that fits your Shaarli installation.


## Installation
### Shaarli 0.5.0 or above
Download the `material` folder into the `tpl` directory of your Shaarli installation. It should be next to existing `.html` files.

In your Shaarli installation, open the `data/config.php` and change the `RAINTPL_TPL` parameter to `tpl/material/`.
If you can find this parameter, paste the following line at the end of the file:

```php
$GLOBALS['config']['RAINTPL_TPL'] = 'tpl/material/' ; // keep the trailing slash!
```

Access your Shaarli and enjoy your new Material theme.

### Older versions
The instructions are the same than for Shaarli 0.5.0 except that you need to paste the line in a file called `options.php` which you put in the `data` folder. Don't forget to add `<?php` at the beginning of the file.


## Additional configuration
You can configure a few things using the `data/config.php` file (or the `data/options.php` if you use an version older than 0.5.0) of your Shaarli installation. If the file doesn't exist, just create it.

Here is an example of what you can configure.

```php
// ### REQUIRED ###
// Sets the active template directory (keep the trailing slash!).
$GLOBALS['config']['RAINTPL_TPL'] = 'tpl/material/' ;

// ### OPTIONAL ###
// Customizes the date format. Check this to know what to write: https://php.net/manual/function.strftime.php
// ex: '%d/%m/%Y' will output for example '30/05/2015'.
$GLOBALS['config']['MATERIAL_PHP_DATE_PATTERN'] = '%d/%m/%Y %H:%M:%S';

// ### OPTIONAL ###
// If set to true, enables dates to be displayed with the 'from now' notation.
// ex: 2 days ago.
// Set it to false to disable this.
$GLOBALS['config']['MATERIAL_DATE_FROMNOW'] = false;

// ### OPTIONAL ### (but REQUIRED if MATERIAL_DATE_FROMNOW is enabled)
// This date pattern MUST match the MATERIAL_PHP_DATE_PATTERN option but doesn't use the same notation.
// Check this for more information about the notation: http://momentjs.com/docs/#/parsing/string-format/
// ex: 'DD/MM/YYYY'.
// It's used to correctly convert dates to the 'from now' notation.
$GLOBALS['config']['MATERIAL_DATE_PATTERN'] = 'DD/MM/YYYY HH:mm:ss';

// ### OPTIONAL ###
// Enables debug mode for dev only. Will load CSS and JS resources from src rather than dist.
// This requires to first download all libraries via bower. Check the *Develop and debug* section below.
$GLOBALS['debug'] = false;
```


## Libraries used
This theme uses a few Javascript libraries.

- [jQuery](http://jquery.com/)
- [Bootstrap](http://getbootstrap.com/)
- [moment.js](http://momentjs.com/)
- [awesomplete](http://leaverou.github.io/awesomplete/)
- [blazy](http://dinbror.dk/blazy/)


## Demo
A read-only demo is available on my personal Shaarli : http://exystenz.com/links


## Develop and debug
To tweak this theme, you'll need to install Javascript and CSS libraries. To do this, install bower and run this command from inside the `material` folder:

```shell
bower install
```

Then, to use these files instead of the compiled ones, change the parameter `debug` to true (check the section *Additional configuration* above).

To finish, if you want to compile those files via Gulp, first adapt the `gulp.js` file to your needs. Then, install Gulp and nodejs if it's not done already and run the following command from the root folder:

```shell
npm install
gulp
```

------------------------------------------------------------------------------

Shaarli Material was tested and validated on Shaarli 0.5.3.

You can download Shaarli on the project page: http://sebsauvage.net/wiki/doku.php?id=php:shaarli

Or via the Github project page: https://github.com/shaarli/Shaarli