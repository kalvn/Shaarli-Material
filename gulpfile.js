/********************/
/*** Requirements ***/
/********************/
var gulp = require("gulp"),
    concat    = require('gulp-concat'),
    minifyCSS = require('gulp-cssnano'),
    rename    = require('gulp-rename'),
    autoprefixer  = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace'),
    addsrc = require('gulp-add-src'),
    merge = require('merge-stream'),
    sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var uncss = require('postcss-uncss');

var onError = function(err){
    console.log('ERROR: ' + err.toString());
    this.emit('end');
};

/*****************/
/*** Variables ***/
/*****************/
var DIR_ROOT = './';
var DIR_SRC = DIR_ROOT + 'src/';
var DIR_THEME = DIR_ROOT + 'material/';
var DIR_LIB = DIR_ROOT + 'node_modules/';
var DIR_DIST = DIR_THEME + 'dist/';

var SCSS_SELECTOR = DIR_SRC + 'scss/**/*.scss';
var CSS_LIB = [
    DIR_LIB + 'bootstrap/dist/css/bootstrap.min.css'
];
var CSS_LIB_NO_UNCSS = [
    DIR_LIB + 'awesomplete/awesomplete.css'
];

var JS_SELECTOR = DIR_SRC + 'js/*.js'
var JS_LIB = [
    DIR_LIB + 'jquery/dist/jquery.min.js',
    DIR_LIB + 'awesomplete/awesomplete.min.js',
    DIR_LIB + 'blazy/blazy.min.js',
    DIR_LIB + 'moment/min/moment.min.js',
    DIR_LIB + 'sortablejs/Sortable.min.js',
    DIR_LIB + 'salvattore/dist/salvattore.min.js'
];

var BOOTSTRAP_FONTS = DIR_LIB + 'bootstrap/dist/fonts/*';

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
        .pipe(gulp.dest(DIR_DIST));
});

gulp.task('sass', function(){
    return gulp.src(DIR_SRC + 'scss/styles.scss')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sass())
        .pipe(concat('sass.css'))
        .pipe(gulp.dest(DIR_DIST));
});

gulp.task('csslib', function(){
    var plugins = [
        uncss({
            html: [DIR_THEME + '*.html']
        }),
    ];
    return gulp.src(CSS_LIB)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(concat('lib.css'))
        .pipe(replace(/\.\.\/fonts\//g, 'fonts/'))
        .pipe(postcss(plugins))
        .pipe(addsrc.append(CSS_LIB_NO_UNCSS))
        .pipe(concat('lib.css'))
        .pipe(gulp.dest(DIR_DIST));
});

// Merge css from sass and lib.
gulp.task('css', ['sass', 'csslib'], function(){
    return gulp.src([DIR_DIST + '/lib.css', DIR_DIST + '/sass.css'])
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(concat('styles.css'))
        .pipe(autoprefixer({
            browsers: ['last 5 versions', 'ie >= 8'],
            cascade: false
        }))
        .pipe(minifyCSS())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest(DIR_DIST));
});

gulp.task('assets', function () {
    return gulp.src(DIR_SRC + 'assets/**/*')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(gulp.dest(DIR_DIST));
});

gulp.task('static', ['assets'], function(){
    return gulp.src(BOOTSTRAP_FONTS)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(gulp.dest(DIR_DIST + 'fonts/'));
});


/*****************/
/*** Watchlist ***/
/*****************/
gulp.task('watch', function() {
    gulp.watch(JS_SELECTOR, ['js']);
    gulp.watch(SCSS_SELECTOR, ['css']);
});

/************************/
/*** Boot instruction ***/
/************************/
gulp.task('default', ['watch', 'css', 'js', 'static']);