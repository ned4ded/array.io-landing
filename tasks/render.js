const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const config = require('../gulpfile.config');
const nunjucksRender = require('gulp-nunjucks-render');

module.exports = (browserSync) => gulp.task('render', function() {
  const envHooks = [];

  const dir = 'datasets';

  const data = fs.readdirSync( dir ).reduce( (acc, filename) => {
    return { ...acc, [ path.basename( filename, '.json') ] : require('../' + dir + '/' + filename) };
  }, {});

  data.get = function(name) {
    return this[name];
  }

  return gulp.src('src/pages/*.+(html|njk)')
    .pipe(nunjucksRender({
      data: {
        datasets: data,
      },
      path: ['src/pages/templates'],
      manageEnv: function(env) {
        return envHooks.forEach(fn => fn(env));
      },
    }))
    .pipe(gulp.dest('www/'))
    .pipe(browserSync.stream());
});
