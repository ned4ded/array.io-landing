const gulp = require('gulp');
const path = require('path');
const config = require('../gulpfile.config');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

module.exports = (browserSync) => gulp.task('scripts', function() {
  return gulp.src(config.paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['env'],
      plugins: ["transform-object-rest-spread"]
    }))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(config.server.serveFolder, 'js')))
    .pipe(browserSync.stream());
});
