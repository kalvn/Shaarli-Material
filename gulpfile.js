/*****************/
/*** Variables ***/
/*****************/
var ROOT = 'material/';

// CSS files containing the theme style.
var CSS_SELECTOR = [
        ROOT + 'src/reset.css',
        ROOT + 'src/material.css',
        ROOT + 'src/style.css'
    ];
// CSS destination folder.
var CSS_OUTPUT = ROOT + 'build';
// CSS libraries.
var CSS_LIB = [
    ROOT + 'lib/bootstrap/dist/css/bootstrap.min.css'
];
// CSS libraries that need not to be uncss-ed, i.e. libs that may concern dynamically added HTML code.
var CSS_LIB_NO_UNCSS = [
    ROOT + 'lib/awesomplete/awesomplete.css'
]

// JS files of the theme.
var JS_SELECTOR = ROOT + 'src/*.js'
// JS destination folder.
var JS_OUTPUT = ROOT + 'build';
// JS libraries.
var JS_LIB = [
    ROOT + 'lib/jquery/dist/jquery.min.js',
    //ROOT + 'lib/bootstrap/dist/js/bootstrap.min.js',
    ROOT + 'lib/awesomplete/awesomplete.min.js',
    ROOT + 'lib/blazy/blazy.min.js',
    ROOT + 'lib/moment/min/moment.min.js'
];

// Other stuff.
var BOOTSTRAP_FONTS = ROOT + 'lib/bootstrap/dist/fonts/*';

/********************/
/*** Requirements ***/
/********************/
var gulp = require("gulp"),
    concat    = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    rename    = require('gulp-rename'),
    autoprefixer  = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    uncss = require('gulp-uncss'),
    copy = require('gulp-copy'),
    replace = require('gulp-replace'),
    addsrc = require('gulp-add-src'),
    merge = require('merge-stream');

var onError = function(err){
    console.log(err.toString());
    this.emit('end');
};

/*************/
/*** Tasks ***/
/*************/
gulp.task('js', function(){
    return gulp.src(JS_LIB)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(addsrc.append(JS_SELECTOR))
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest(JS_OUTPUT));
});

gulp.task('css', function(){
    return gulp.src(CSS_LIB)
        .pipe(concat('lib.css'))
        .pipe(replace(/\.\.\/fonts\//g, 'fonts/'))
        .pipe(uncss({
            html: [ROOT + '/*.html']
        }))
        .pipe(addsrc.append(CSS_LIB_NO_UNCSS))
        .pipe(addsrc.append(CSS_SELECTOR))
        .pipe(concat('styles.css'))
        .pipe(autoprefixer({
            browsers: ['last 5 versions', 'ie >= 8'],
            cascade: false
        }))
        .pipe(minifyCSS())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest(CSS_OUTPUT));
});

gulp.task('static', function(){
    return gulp.src(BOOTSTRAP_FONTS)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(copy(CSS_OUTPUT + '/fonts/', {prefix: 5}));
});


/*****************/
/*** Watchlist ***/
/*****************/
gulp.task('watch', function() {
    gulp.watch(JS_SELECTOR, ['js']);
    gulp.watch(CSS_SELECTOR, ['css']);
});

/************************/
/*** Boot instruction ***/
/************************/
gulp.task('default', ['watch', 'css', 'js', 'static']);