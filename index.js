var gutil = require('gulp-util');
var path = require('path');
var Stream = require('stream');
var license = require('bower-license');

var PLUGIN_NAME = 'gulp-bower-license-finder';

function bowerLicenseFinder(filename, options) {
  filename = filename || 'bowerLicenses.txt';
  options = options || {};
  options.path = options.path || './www/lib';

  var stream = new Stream();

  license.init(options, function (licenseMap, err) {
    if (err) {
      throw new gutil.PluginError(PLUGIN_NAME, err, { showStack: true });
    }

    var file = new gutil.File({
      path: path.join(process.cwd(), options.path, filename),
      contents: new Buffer(JSON.stringify(licenseMap))
    });

    stream.emit('data', file);
    stream.emit('finish');
  });

  return stream;
}

module.exports = bowerLicenseFinder;