const { src, dest, watch, series } = require('gulp');
var sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const browsersync = require('browser-sync').create();

// Sass Task
function scssTask(){
    return src('app/scss/style.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(postcss([cssnano()]))
        .pipe(dest('css/', { sourcemaps: '.' }));
  }

  function browsersyncServe(cb){
    browsersync.init({
      server: {
        baseDir: '.'
      }    
    });
    cb();
  }

  function browsersyncReload(cb){
    browsersync.reload();
    cb();
  }

  // Default Gulp Task
exports.default = series(
    scssTask,
    browsersyncServe,
    watchTask
  );

  // Watch Task
function watchTask(){
    watch('*.html', browsersyncReload);
    watch(['sass/**/*.scss',], series(scssTask, browsersyncReload));
  }