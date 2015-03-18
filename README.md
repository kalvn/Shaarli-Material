# Shaarli Material Theme
Shaarli Material is a theme for [Shaarli](https://github.com/shaarli/Shaarli), the famous personal, minimalist, super-fast, no-database delicious clone.


## Screenshots
![Shaarli Material Screenshot Home](https://raw.githubusercontent.com/kalvn/Shaarli-Material/master/material/screenshots/home.png)

[More screenshots](https://github.com/kalvn/Shaarli-Material/tree/master/material/screenshots).


## Requirements
You need to have Shaarli **0.0.44beta** installed or above. You can try with version 0.0.43beta but there might be some issues with PHP variable I use and that don't exist in `index.php`.

Older versions won't work, take a look at the [official project](https://github.com/shaarli/Shaarli) to upgrade.


## Installation

Download the `material` folder into the `tpl` directory of your Shaarli installation. It should be next to existing `.html` files.

In your Shaarli installation, open the `options.php` file which is inside the `data` folder. If it doesn't exist, create it.
If you created it, ensure the content of the file starts with `<?php` as it's a PHP file.

At the bottom of the file, add the following line:

```php
$GLOBALS['config']['RAINTPL_TPL'] = 'tpl/material/' ; // keep the trailing slash!
```

Access your Shaarli and enjoy your new Material theme.


## Configuration
You can configure a few things by adding the following lines in the `data/options.php` file of your Shaarli installation.

### Change the display of the dates using the "5 days ago" notation.
The `MATERIAL_DATE_PATTERN` is optional. If you don't put it, the date resolution will be automatically done via the javascript `Date` object. But it can lead to bad behavior depending on your web server's locale configuration. So it's definitely better to put it.

```php
$GLOBALS['config']['MATERIAL_DATE_FROMNOW'] = true;
$GLOBALS['config']['MATERIAL_DATE_PATTERN'] = 'DD/MM/YYYY HH:mm:ss'; // optional
```

To know what format to use, start by putting `MATERIAL_DATE_FROMNOW` to false. Then have a look on the format of links date in your Shaarli. Then check [this page](http://momentjs.com/docs/#/parsing/string-format/) to know what format to use.

For other interesting configuration options, [check this](https://github.com/shaarli/Shaarli/wiki#main-dataoptionsphp-file).


## Libraries used
This theme use a few Javascript libraries.

- [jquery](http://jquery.com/)
- [Bootstrap](http://getbootstrap.com/)
- [moment.js](http://momentjs.com/) (only if you activate the `MATERIAL_DATE_FROMNOW` parameter described above)
- [awesomplete](http://leaverou.github.io/awesomplete/)
- [blazy](http://dinbror.dk/blazy/)


## Demo
A read-only demo is available on my personal Shaarli : http://exystenz.com/links

------------------------------------------------------------------------------

Shaarli Material was tested and validated on Shaarli 0.0.45beta.

You can download Shaarli on the project page: http://sebsauvage.net/wiki/doku.php?id=php:shaarli

Or via the Github project page: https://github.com/shaarli/Shaarli