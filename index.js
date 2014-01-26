var es = require('event-stream');
var gutil = require('gulp-util');
var path = require('path');
var ect = require('ect');

module.exports = function (opt) {
  opt = opt || {};
  if (!opt.ext) opt.ext = '.ect';
  if (!opt.outExt) opt.outExt = '.html';

  return es.map(function (file, callback) {
    try {
      var filePath = file.base;
      var fileName = gutil.replaceExtension(path.basename(file.path), "");
      var html = ect({
        root: filePath,
        ext: opt.ext
      });
      html.render(fileName, function (error, html) {
        file.contents = new Buffer(html);
        file.path = gutil.replaceExtension(file.path, opt.outExt);
      });
    } catch (e) {
      gutil.log(gutil.colors.red('Error gulp-ect: ' + e.message));
    }
    callback(null, file);
  });
};
