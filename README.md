# Shaarli Material Theme

Shaarli Material is a theme for [Shaarli](https://github.com/shaarli/Shaarli), the famous personal, minimalist, super-fast, no-database delicious clone.

<!--
![Shaarli Blocks Screenshot 1](http://exystenz.com/files/shaarli-blocks/screen1.jpg)

![Shaarli Blocks Screenshot 2](http://exystenz.com/files/shaarli-blocks/screen2.jpg)
-->

## Requirements
You need to have Shaarli 0.0.44beta installed or above. It's important because the way to customize themes has changed a bit lately.
But upgrading Shaarli is really easy, take a look at the [official project](https://github.com/shaarli/Shaarli).

## Installation

### Step 1
Download the `material` folder into the `tpl` directory of your Shaarli installation. It should be next to existing `.html` files.

### Step 2
In your Shaarli installation, open the `options.php` file which is inside the `data` folder. If it doesn't exist, create it.
At the bottom of the file, add the following lines:

    $GLOBALS['config']['RAINTPL_TPL'] = 'tpl/material/' ; // Use material template instead of the default one (keep the trailing slash!)

Access your Shaarli and enjoy your new Material theme.

## Configuration
You can configure a few things by adding the following lines in the `data/options.php` file of your Shaarli installation.

### Change the display of the dates using the "from xxx" notation.
The `MATERIAL_DATE_PATTERN` is optional. If you don't put it, the date resolution will be automatically done via the javascript `Date` object. But it can lead to bad behavior depending on your web server's locale configuration. So it's definitely better to put it.

    $GLOBALS['config']['MATERIAL_DATE_FROMNOW'] = true;
    $GLOBALS['config']['MATERIAL_DATE_PATTERN'] = 'DD/MM/YYYY HH:mm:ss';

To know what format to use, start by putting `MATERIAL_DATE_FROMNOW` to false. Then have a look on the format of links date in your Shaarli. Then check [this page](http://momentjs.com/docs/#/parsing/string-format/) to know what format to use.

## Libraries
This theme use a few additional libraries compared to the default one.

- [jquery}(http://jquery.com/)
- [Bootstrap](http://getbootstrap.com/)
- [moment.js](http://momentjs.com/) (only if you activate the `MATERIAL_DATE_FROMNOW` parameter described above)
- [awesomplete](http://leaverou.github.io/awesomplete/)
- [blazy](http://dinbror.dk/blazy/)

## Demo
A read-only demo is available on my personal Shaarli : http://exystenz.com/links

------------------------------------------------------------------------------

Shaarli Material was tested and validated on Shaarli 0.0.44beta.

You can download Shaarli on the project page: http://sebsauvage.net/wiki/doku.php?id=php:shaarli
Or via the Github project page: https://github.com/shaarli/Shaarli