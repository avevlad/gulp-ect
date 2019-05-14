var es = require('event-stream');
var gutil = require('gulp-util');
var path = require('path');
var ect = require('ect');

var gulpEct = (options) => {

  options = options || {};
  if (!options.ext) options.ext = '.ect';
  if (!options.data) options.data = {};
  if (!options.outExt) options.outExt = '.html';

  return es.map(function (file, callback) {
    //function for compile locals async
    var dataCallback = typeof(options.data) == 'function' ? options.data : function (file, cb) {
      process.nextTick(function () {
        cb(options.data);
      });
    };

    //compile locals async
    try {
      var filePath = file.base;
      var fileCwd = file.cwd;
      var fileName = gutil.replaceExtension(path.basename(file.path), "");

      var relativeBase = path.relative(fileCwd, filePath);
      var relativePath = path.join(relativeBase, fileName);
      //relative path for dynamic locals creation
      dataCallback(relativePath, function (data) {
        try {
          var html = ect({
            root: filePath,
            ext: options.ext
          });

          html.render(fileName, data, function (error, html) {
            if (error) throw new Error('[Error gulp-ect] ' + error);
            file.contents = new Buffer(html);
            file.path = gutil.replaceExtension(file.path, options.outExt);
          });
        } catch (e) {
          gutil.log(gutil.colors.red('Error gulp-ect: ' + e.message));
          return callback(e);
        }
        callback(null, file);
      });
    } catch (e) {
      gutil.log(gutil.colors.red('Error Locals gulp-ect: ' + e.message));
      return callback(e);
    }
  });
};

module.exports = gulpEct;
