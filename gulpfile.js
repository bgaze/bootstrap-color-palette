// Dependencies.
const gulp = require('gulp');
const rename = require('gulp-rename');
const beautify = require('gulp-beautify');
const terser = require('gulp-terser');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

// Files.
const src = {
    js: './src/*.js',
    css: './src/*.scss'
};

// Javascripts.
function js() {
    return  gulp.src(src.js)
            .pipe(beautify.js({indent_size: 4}))
            .pipe(gulp.dest('./dist'))
            .pipe(terser())
            .pipe(rename({extname: '.min.js'}))
            .pipe(gulp.dest('./dist'));
}

// Styles.
function css() {
    return gulp.src(src.css)
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(beautify.css({indent_size: 4}))
            .pipe(gulp.dest('./dist'))
            .pipe(cleanCSS())
            .pipe(rename({extname: '.min.css'}))
            .pipe(gulp.dest('./dist'));
}


// Declare tasks.

gulp.task('dist', gulp.series(js, css));

gulp.task('watch', function () {
    gulp.watch(src.js, gulp.series(js));
    gulp.watch(src.css, gulp.series(css));
});

gulp.task('default', gulp.series('dist', 'watch'));