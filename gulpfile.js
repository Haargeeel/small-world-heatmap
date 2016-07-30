const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const babelify = require('babelify');
const streamify = require('gulp-streamify');
const uglify = require('gulp-uglify');

const paths = {
  jsx: ['./lib/jsx/index.jsx']
};

gulp.task('default', () => {
  browserify(paths.jsx)
  .transform(babelify, {presets: ['es2015', 'react']})
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(streamify(uglify()))
  .pipe(gulp.dest('./public/js/'));
});
