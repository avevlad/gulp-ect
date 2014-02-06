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
var gulp = require('gulp');
var ect = require('ect');

gulp.task('ect', function(){
  gulp.src('./src/*.ect')
      .pipe(ect())
      .pipe(gulp.dest('./out'));
});

gulp.task('default', ['ect']);
```

coffee
```coffee
ect = require('ect')
gulp.task 'ect', ->
  gulp
    .src('./src/*.ect')
    .pipe(ect())
    .pipe gulp.dest('./out')

gulp.task 'default', ['ect']
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

#### options.data

Type: `Function or Object`  
Default: `{}`  

The template context data. 

If a function is passed, use the format function(fileName,callback) and fire callback as callback(data):

~~~js
  gulp.src(['./src/*.ect', './src/inner/*.ect'])
    .pipe(ect({data: function (filename, cb) {
      cb({foo: "bar"});
    }}))
    .pipe(gulp.dest('./out'));
~~~

## License

MIT © Vladislav Derjavin <dev@vld.me>
