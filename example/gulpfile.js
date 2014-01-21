var gulp = require('gulp');
var gutil = require('gulp-util');
var ect = require('../');

gulp.task('ect', function(){
  gulp.src('./src/*.ect')
      .pipe(ect())
      .pipe(gulp.dest('./out'));
});

gulp.task('default', function(){
  gulp.run('ect');
});