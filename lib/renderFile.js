var path = require('path');
var _ = require('lodash');
var searchFile = require('./searchFile');

exports.name = 'adapter-base-renderfile';

exports.attach = function(/* options */){
  var self = this;

  /**
   * This plugin requires that a template engine plugin has already
   * been loaded:
   */

  if (!self.engine){
    throw new Error('A template engine is required.');
  }

  if (!self.renderFile){
    self.renderFile = function(filename, _options, callback){
      var options = _.cloneDeep(_options);

      /**
       * If we're in Express then the layout directory is provided by the
       * 'views' option. Otherwise, use 'layoutDir':
       */

      var layoutDir = (options.settings && options.settings.views) || options.layoutDir;
      if (!Array.isArray(layoutDir)) {
        layoutDir = [layoutDir];
      }

      /**
       * We should receive a simple file name with no path, but if we do
       * receive a file name with a full path then just add the directory
       * to the list of directories to search:
       */

      var dirname = path.dirname(filename);
      var basename = path.basename(filename);
      if (dirname) {
        layoutDir.unshift(dirname);
      }

      /**
       * Now we can load the template and pass it to the render function:
       */

      searchFile(basename, layoutDir, function(err, template){
        if (err){
          return callback(err);
        }
        options.layoutDir = layoutDir;
        self.render(template, options, callback);
      });
    };
  }
};
