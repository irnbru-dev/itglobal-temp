'use strict';

const gulp = require('gulp'),
    pug = require('gulp-pug'),
    prettify = require('gulp-prettify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    sass   = require('gulp-sass'),
    postcss   = require('gulp-postcss'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('autoprefixer'),
    debug = require('gulp-debug');

const path = {
    dest: {
        html: 'build/',
        css : 'build/css/',
        js  : 'build/js/'
    },
    src: {
        html: 'src/pages/**/*.pug',
        scss: 'src/scss/style.scss',
        js  : 'src/js/**/*.js'
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
        .pipe(postcss([ autoprefixer({browsers: ['last 20 versions, IE 9']}) ]))
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

gulp.task('image', function() {
    gulp.src('src/img/**/*')
    .pipe(imagemin({}))
    .pipe(gulp.dest('build/img/'));
});

gulp.task('watch', function () {
    gulp.watch(path.watch.scss);
    gulp.watch(path.watch.js);
});

gulp.task('default', ['watch']);