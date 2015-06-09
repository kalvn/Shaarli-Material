# Shaarli Material Theme
Shaarli Material is a theme for [Shaarli](https://github.com/shaarli/Shaarli), the famous personal, minimalist, super-fast, no-database delicious clone.


## Screenshots
![Shaarli Material Screenshot Home](https://raw.githubusercontent.com/kalvn/Shaarli-Material/master/material/screenshots/home.png)

[More screenshots](https://github.com/kalvn/Shaarli-Material/tree/master/material/screenshots).


## Requirements
You need to have Shaarli **0.0.44beta** installed or above. You can try with version 0.0.43beta but there might be some issues with PHP variable I use and that don't exist in `index.php`.

Older versions won't work, take a look at the [official project](https://github.com/shaarli/Shaarli) to download or upgrade.


## Download
To download this theme, [visit this page](https://github.com/kalvn/Shaarli-Material/releases) and choose the version matching the version of your Shaarli installation. Both use the same notation.


## Installation
Download the `material` folder into the `tpl` directory of your Shaarli installation. It should be next to existing `.html` files.

In your Shaarli installation, open the `options.php` file which is inside the `data` folder. If it doesn't exist, create it.
If you created it, ensure the content of the file starts with `<?php` as it's a PHP file.

At the bottom of the file, add the following line:

```php
$GLOBALS['config']['RAINTPL_TPL'] = 'tpl/material/' ; // keep the trailing slash!
```

Access your Shaarli and enjoy your new Material theme.


## Additional configuration
You can configure a few things using the `data/options.php` file of your Shaarli installation. If the file doesn't exist, just create it.

Here is an example of the whole file. It's available here as well: https://github.com/kalvn/Shaarli-Material/blob/master/material/options.example.php.txt

```php
<?php
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
?>
```


## Libraries used
This theme uses a few Javascript libraries.

- [jQuery](http://jquery.com/)
- [Bootstrap](http://getbootstrap.com/)
- [moment.js](http://momentjs.com/) (loaded only if you activate the `MATERIAL_DATE_FROMNOW` parameter described above)
- [awesomplete](http://leaverou.github.io/awesomplete/)
- [blazy](http://dinbror.dk/blazy/)


## Demo
A read-only demo is available on my personal Shaarli : http://exystenz.com/links

------------------------------------------------------------------------------

Shaarli Material was tested and validated on Shaarli 0.0.45beta.

You can download Shaarli on the project page: http://sebsauvage.net/wiki/doku.php?id=php:shaarli

Or via the Github project page: https://github.com/shaarli/Shaarli