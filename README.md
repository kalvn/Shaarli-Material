# Shaarli Material Theme
Shaarli Material is a theme for [Shaarli](https://github.com/shaarli/Shaarli), the famous personal, minimalist, super-fast, database free, bookmarking service.


## Screenshots
![Shaarli Material Screenshot Home](https://raw.githubusercontent.com/kalvn/Shaarli-Material/master/screenshots/showcase.png)

[More screenshots](https://github.com/kalvn/Shaarli-Material/tree/master/screenshots).


## Download
To download this theme, [visit this page](https://github.com/kalvn/Shaarli-Material/releases) and choose the most recent version matching the version of your Shaarli installation. Both use the same notation.

Versions suffixed by `-patch.x` include some bugfix so take those preferentially if they exist for the version that fits your Shaarli installation.

If you install an older version, please read the README.md file you'll find in the root folder rather than this one.


## Installation
### Your Shaarli is up to date
Download the `material` folder into the `tpl` directory of your Shaarli installation. It should be next to existing `.html` files.

In your Shaarli installation, open the `data/config.json.php` and change the `raintpl_tpl` parameter from `tpl\/` to `tpl\/material\/`.

Access your Shaarli and enjoy your new Material theme.

### You use an older version
Please refer to the README file within the root folder of the version you downloaded.


## Customization
You can customize a few things using the `data/config.json.php` file of your Shaarli installation. If the file doesn't exist, just create it. Be careful to respect the JSON format notation (end lines with a comma except for the last item, just before the closing curly brace), otherwise you'll get errors.

Here are parameters you can set.

- **resource.raintpl_tpl**: REQUIRED: Sets the active template directory (keep the trailing slash!).
- **config.MATERIAL_PHP_DATE_PATTERN**: OPTIONAL: Customizes the date format. Check this to know what to write: https://php.net/manual/function.strftime.php (ex: `"%d/%m/%Y"` will output for example '30/05/2015').
- **config.MATERIAL_NO_QRCODE**: OPTIONAL: Removes the QR code control of the theme. To completely get rid of QR Codes, you of course need to disable the qrcode plugin as well.
- **config.MATERIAL_DATE_FROMNOW**: OPTIONAL: If set to true, enables dates to be displayed with the 'from now' notation. ex: 2 days ago. Set it to false to disable this.
- **config.MATERIAL_DATE_PATTERN**: OPTIONAL (but REQUIRED if MATERIAL_DATE_FROMNOW is enabled): This date pattern MUST match the MATERIAL_PHP_DATE_PATTERN option but doesn't use the same notation. Check this for more information about the notation: http://momentjs.com/docs/#/parsing/string-format/ ex: 'DD/MM/YYYY'. It's used to correctly convert dates to the 'from now' notation.
- **config.MATERIAL_COLOR**: OPTIONAL: Customizes the theme's colors. I suggest picking colors from here : https://www.google.com/design/spec/style/color.html#color-color-palette with the shades 500, 600 and 700 for the 3 following settings, respectively. MATERIAL_COLOR is mandatory and represents the main color (used for the toolbar or the buttons).
- **config.MATERIAL_COLOR_FOCUS**: OPTIONAL: Used for the hover and focus effects on buttons.
- **config.MATERIAL_COLOR_ACTIVE**: OPTIONAL: Used for the active effect on button (when they are clicked).


Here is an example of what you can configure (in real life, there will be other parameters in the file, just add those to the different categories):

```json
{
    "resource": {
        "raintpl_tpl": "tpl\/material\/"
    },
    
    "config": {
        "MATERIAL_PHP_DATE_PATTERN": "%d\/%m\/%Y %H:%M:%S",
        "MATERIAL_NO_QRCODE": true,
        "MATERIAL_DATE_FROMNOW": true,
        "MATERIAL_DATE_PATTERN": "DD/MM/YYYY HH:mm:ss",
        "MATERIAL_COLOR": "#607D8B",
        "MATERIAL_COLOR_FOCUS": "#546E7A",
        "MATERIAL_COLOR_ACTIVE": "#455A64"
    }
}
```

## Add custom resources
If you want to add your custom scripts or styles (for example analytics script), you must create a new template named `extra.html` in the *material* folder.
Then, anything you add in this file will be included at the end of the `<head>` tag.

This file is NOT commited on the repository, which allows you to update the theme without overriding this file.

## Plugins
As from Shaarli 0.6.0, you can install plugins to enrich your experience.
Most of them should work properly, although it's up to the plugin developer to ensure the code is as minimal as possible to integrates well in themes.
I tested all plugins available with Shaarli 0.6.0 and they all work well even though the display is a bit weird for some of them. I will keep monitoring the behavior of popular plugins in the future.

## Libraries used
This theme uses a few Javascript libraries.

- [jQuery](http://jquery.com/)
- [Bootstrap](http://getbootstrap.com/)
- [moment.js](http://momentjs.com/)
- [awesomplete](http://leaverou.github.io/awesomplete/)
- [blazy](http://dinbror.dk/blazy/)
- [Sortable](http://rubaxa.github.io/Sortable/)


## Demo
A read-only demo is available on my personal Shaarli : [https://links.kalvn.net](https://links.kalvn.net)


## Develop and debug
To tweak this theme, you'll need to install Javascript and CSS libraries. To do this, install bower and run this command from inside the `material` folder:

```shell
bower install
```

Then, if you want to compile those files via Gulp, first adapt the `gulp.js` file to your needs. Then, install Gulp and nodejs if it's not done already and run the following command from the root folder:

```shell
npm install
gulp
```

------------------------------------------------------------------------------

Shaarli Material was tested and validated on Shaarli 0.8.3.

You can download Shaarli via the Github project page: https://github.com/shaarli/Shaarli

Original project page: http://sebsauvage.net/wiki/doku.php?id=php:shaarli