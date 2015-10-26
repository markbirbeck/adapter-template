var fs = require('fs');
var path = require('path');

/**
 * Load a file, given a list of directories that the file might appear in:
 */

function searchFile(name, dirList, callback) {
  if (typeof dirList === 'function') {
    callback = dirList;
    dirList = '';
  }

  if (dirList === undefined) {
    dirList = ''
  }

  if (!Array.isArray(dirList)) {
    dirList = [dirList];
  }

  var success = dirList.some(function(dir) {
    try {
      /**
       * Don't try to optimise this to be async since any failures will be
       * passed back to the caller:
       */

      var data = fs.readFileSync(path.join(dir, name), 'utf8');

      callback(null, data);
      return true;
    } catch (e) {
      return false;
    }
  });

  if (!success) {
    return callback('Failed to find file \'' + name + '\' at specified locations');
  }
}

module.exports = searchFile;
