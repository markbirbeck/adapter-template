var fs = require('fs');

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
    self.renderFile = function(path, options, callback){
      fs.readFile(path, 'utf8', function(err, template){
        if (err){
          return callback(err);
        }
        self.render(template, options, callback);
      });
    };
  }
};
