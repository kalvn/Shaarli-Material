var ROOT = 'material/';

var CSS_SELECTOR = [
        ROOT + 'src/reset.css',
        ROOT + 'src/material.css',
        ROOT + 'src/style.css'
    ];
var CSS_DIST = ROOT + 'dist';
var CSS_LIB = [
    ROOT + 'lib/bootstrap/dist/css/bootstrap.min.css'
];
var JS_SELECTOR = ROOT + 'src/*.js';
var JS_DIST = ROOT + 'dist';
var JS_LIB = [
    ROOT + 'lib/jquery/dist/jquery.min.js',
    ROOT + 'lib/bootstrap/dist/js/bootstrap.min.js'
];
var BOOTSTRAP_FONTS = ROOT + 'lib/bootstrap/dist/fonts/*';

var gulp = require("gulp"),
    concat    = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    rename    = require('gulp-rename'),
    autoprefixer  = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    uncss = require('gulp-uncss'),
    copy = require('gulp-copy'),
    replace = require('gulp-replace');

var onError = function(err){
    console.log(err.toString());
    this.emit('end');
};

gulp.task('css', function () {
    return gulp.src(CSS_SELECTOR)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(CSS_DIST))
        .pipe(autoprefixer({
            browsers: ['last 5 versions', 'ie >= 8'],
            cascade: false
        }))
        .pipe(gulp.dest(CSS_DIST))
        .pipe(minifyCSS())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest(CSS_DIST));
});

gulp.task('js', function () {
    return gulp.src(JS_SELECTOR)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(JS_DIST))
        .pipe(uglify())
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest(JS_DIST));
});

gulp.task('libjs', function(){
    return gulp.src(JS_LIB)
        .pipe(concat('lib.js'))
        .pipe(gulp.dest(JS_DIST))
        .pipe(uglify())
        .pipe(rename('lib.min.js'))
        .pipe(gulp.dest(JS_DIST));;
});
gulp.task('libcss', function(){
    return gulp.src(CSS_LIB)
        .pipe(concat('lib.css'))
        .pipe(gulp.dest(CSS_DIST))
        .pipe(replace(/\.\.\/fonts\//g, 'fonts/'))
        .pipe(uncss({
            html: [ROOT + '/*.html']
        }))
        .pipe(gulp.dest(CSS_DIST))
        .pipe(minifyCSS())
        .pipe(rename('lib.min.css'))
        .pipe(gulp.dest(CSS_DIST));
});
gulp.task('static', function(){
    return gulp.src(BOOTSTRAP_FONTS)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(copy(CSS_DIST + '/fonts/', {prefix: 5}));
});


// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(JS_SELECTOR, ['js']);
    gulp.watch(CSS_SELECTOR, ['css']);
});

gulp.task('default', ['watch', 'css', 'js', 'libcss', 'libjs', 'static']);