// source: https://css-tricks.com/gulp-for-beginners/

var gulp = require('gulp');

var sass = require('gulp-sass');

var useref = require('gulp-useref');

var uglify = require('gulp-uglify');

var cssnano = require('gulp-cssnano');

var cache = require('gulp-cache');

var runSequence = require('run-sequence');

var del = require('del');

var imagemin = require('gulp-imagemin');

var gulpIf = require('gulp-if');

var browserSync = require('browser-sync').create();


// Below takes SCSS files, converts them to CSS and places them there.

gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// The watch task that's being run with "gulp watch" that updates the scss->css and reloads the browser

gulp.task('watch', ['browserSync', 'sass'], function (){
    gulp.watch('app/scss/**/*.scss', ['sass']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

// The browsersync function

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
})



// Minifying JS and CSS and placing them in the dist folder

gulp.task('useref', function(){
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
});

// image optimization and placing them in the dist folder. It saves the images in local cache, important
// if you have many images and it could take some time


gulp.task('images', function(){
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
});

// simply places the fonts in the dist folder

gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
})

// cleans the dist folder, is run before filling it up with 'gulp build'

gulp.task('clean:dist', function() {
    return del.sync('dist');
})

// Which is, obviously, why it's called a build tool

gulp.task('build', function (callback) {
    runSequence('clean:dist',
        ['sass', 'useref', 'images', 'fonts'],
        callback
    )
})