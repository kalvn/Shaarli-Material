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
    copy = require('gulp-copy'),
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
var ROOT = 'material/';
var LIB_ROOT = 'node_modules/';
var BUILD_FOLDER = ROOT + 'build';

var SCSS_SELECTOR = ROOT + 'scss/**/*.scss';
var CSS_LIB = [
    LIB_ROOT + 'bootstrap/dist/css/bootstrap.min.css'
];
var CSS_LIB_NO_UNCSS = [
    LIB_ROOT + 'awesomplete/awesomplete.css'
];

var JS_SELECTOR = ROOT + 'src/*.js'
var JS_LIB = [
    LIB_ROOT + 'jquery/dist/jquery.min.js',
    LIB_ROOT + 'awesomplete/awesomplete.min.js',
    LIB_ROOT + 'blazy/blazy.min.js',
    LIB_ROOT + 'moment/min/moment.min.js',
    LIB_ROOT + 'sortablejs/Sortable.min.js',
    LIB_ROOT + 'salvattore/dist/salvattore.min.js'
];

var BOOTSTRAP_FONTS = LIB_ROOT + 'bootstrap/dist/fonts/*';

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
        .pipe(gulp.dest(BUILD_FOLDER));
});

gulp.task('sass', function(){
    return gulp.src(ROOT + 'scss/styles.scss')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sass())
        .pipe(concat('sass.css'))
        .pipe(gulp.dest(BUILD_FOLDER));
});

gulp.task('csslib', function(){
    var plugins = [
        uncss({
            html: [ROOT + '/*.html']
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
        .pipe(gulp.dest(BUILD_FOLDER));
});

// Merge css from sass and lib.
gulp.task('css', ['sass', 'csslib'], function(){
    return gulp.src([BUILD_FOLDER + '/lib.css', BUILD_FOLDER + '/sass.css'])
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
        .pipe(gulp.dest(BUILD_FOLDER));
});

gulp.task('static', function(){
    return gulp.src(BOOTSTRAP_FONTS)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(copy(BUILD_FOLDER + '/fonts/', {prefix: 5}));
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