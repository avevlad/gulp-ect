var gulp = require('gulp');
var gutil = require('gulp-util');
var ect = require('../');

gulp.task('ect', function () {
  gulp.src(['./src/*.ect', './src/inner/*.ect'])
    .pipe(ect({data: function (file, cb) {
      cb({foo: "bar - " + file});
    }}))
    .pipe(gulp.dest('./out'));
});

gulp.task('default', ['ect']);