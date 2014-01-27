# [gulp](https://github.com/wearefractal/gulp)-ect

> Gulp plugin to compile ect.js template engine

## Install

Install with [npm](https://npmjs.org/package/gulp-mocha)

```
npm install --save-dev gulp-ect
```


## Example

js
```js
var ect = require('ect');

gulp.task('ect', function(){
  gulp.src('./src/*.ect')
      .pipe(ect())
      .pipe(gulp.dest('./out'));
});

gulp.task('default', function(){
  gulp.run('ect');
});
```

coffee
```coffee
ect = require('ect')
gulp.task 'ect', ->
  gulp
    .src('./src/*.ect')
    .pipe(ect())
    .pipe gulp.dest('./out')

gulp.task 'default', ->
  gulp.run "ect"
```

## API

### ect(options)


#### options.ext

Type: `String`  
Default: `.ect`  

The extensions input files.


#### options.outExt

Type: `String`  
Default: `.html`  

The extensions output files.



## License

MIT © Vladislav Derjavin <dev@vld.me>
