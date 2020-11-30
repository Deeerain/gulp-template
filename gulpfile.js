const gulp = require('gulp')
const sass = require('gulp-sass')
const pug = require('gulp-pug');
const BrowserSync = require('browser-sync').create();

function css (){
  return gulp.src('src/sass/**/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('build/css'));
}

function html_pug(){
  return gulp.src('src/pages/**/**.pug')
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('build/'));
}

function html(){
  return gulp.src('src/pages/**/*.html')
    .pipe(gulp.dest('build'));
}

function scripts(){
  return gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('build/js'));
}

function browser(){
  return BrowserSync.init({
    server: {
      baseDir: 'build'
    }
  });
}

function browser_refresh(){
  BrowserSync.reload();
}

function watch(){
  gulp.watch('src/sass/**/*.sass', css)
    .on('change', BrowserSync.reload);

  gulp.watch('src/pages/**/*.html', html_pug)
    .on('change', BrowserSync.reload);
    
  gulp.watch('src/js/**/*.js', html_pug)
    .on('change', BrowserSync.reload);
}

exports.build = gulp.series(css, html, html_pug, scripts);
exports.default = gulp.parallel(browser, watch);