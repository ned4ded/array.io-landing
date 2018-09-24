const path = require('path');
const gulp = require('gulp');
const config = require('../gulpfile.config');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');

module.exports = gulp.task('styles', function() {
  return gulp.src(config.paths.stylesBase)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({
        browsers: [
          'last 2 versions'
        ]
      })
    ]))
    .pipe(rename('main.css'))
    .pipe(gulp.dest(path.join(config.server.serveFolder, 'css')));
});
