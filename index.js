var es = require('event-stream');
var gutil = require('gulp-util');
var path = require('path');
var ect = require('ect');

module.exports = function (option) {

  option = option || {};
  if (!option.ext) option.ext = '.ect';
  if (!option.data) option.data = {};
  if (!option.outExt) option.outExt = '.html';

  return es.map(function (file, callback) {
    //function for compile locals async
    var dataCallback = typeof(option.data) == 'function' ? option.data : function (file, cb) {
      process.nextTick(function () {
        cb(option.data);
      });
    };

    //compile locals async
    try {
      var filePath = file.base;
      var fileCwd = file.cwd;
      var fileName = gutil.replaceExtension(file.path, "");

      var relativeBase = path.relative(fileCwd, filePath);
      var relativePath = path.join(relativeBase, fileName);

      //relative path for dynamic locals creation
      dataCallback(relativePath, function (data) {
        try {
          var html = ect({
            root: filePath,
            ext: option.ext
          });

          html.render(fileName, data, function (error, html) {
            if (error) throw new Error('[Error gulp-ect] ' + error);
            error && gutil.log(gutil.colors.red('Error gulp-ect: ' + error.message));
            file.contents = new Buffer(html);
            file.path = gutil.replaceExtension(file.path, option.outExt);
          });
        } catch (e) {
          return callback(e);
        }
        callback(null, file);
      });
    } catch (e) {
      return callback(e);
    }


  });
};
