'use strict';

var gulp = require('gulp'),
    pug = require('gulp-pug'),
    prettify = require('gulp-prettify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    sass   = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    debug = require('gulp-debug');

var path = {
    dest: {
        html: 'build/',
        css : 'build/css/',
        js  : 'build/js/'
    },
    src: {
        html: 'src/pages/**/*.pug',
        scss: 'src/scss/style.scss',
        js  : 'src/js/*.js'
    },
    watch: {
        html: 'src/pug/**/*.pug',
        scss: 'src/scss/style.scss',
        js  : 'src/js/*.js'
    }
};

gulp.task('pug', function() {
    return gulp.src(path.src.html)
        .pipe(debug())
        .pipe(pug())
        .pipe(prettify({
            indent_size: 2
        }))
        .pipe(gulp.dest(path.dest.html))
});

gulp.task('sass', function () {
    return gulp.src(path.src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.dest.css))
});

gulp.task('js', function () {
    return gulp.src(path.src.js)
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.dest.js))
});

gulp.task('watch', function () {
    gulp.watch(path.watch.scss);
    gulp.watch(path.watch.js);
});

gulp.task('default', ['watch']);