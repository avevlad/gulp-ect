var es = require('event-stream');
var gutil = require('gulp-util');
var path = require('path');
var ect = require('ect');

module.exports = function (opt) {

  opt = opt || {};
  if (!opt.ext) opt.ext = '.ect';
  if (!opt.data) opt.data = {};
  if (!opt.outExt) opt.outExt = '.html';

  return es.map(function (file, callback) {
    //function for compile locals async
    var dataCallback = typeof(opt.data) == 'function' ? opt.data : function (file, cb) {
      process.nextTick(function () {
        cb(opt.data);
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
            ext: opt.ext
          });

          html.render(fileName, data, function (error, html) {
            file.contents = new Buffer(html);
            file.path = gutil.replaceExtension(file.path, opt.outExt);
          });
        } catch (e) {
          gutil.log(gutil.colors.red('Error gulp-ect: ' + e.message));
        }
        callback(null, file);
      });
    } catch (e) {
      gutil.log(gutil.colors.red('Error Locals gulp-ect: ' + e.message));
    }


  });
};
