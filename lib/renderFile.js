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

  /**
   * If we don't have a renderFile() method yet, then create one:
   */

  if (!self.renderFile){

    /**
     * If the engine has a render function that takes text and options as
     * parameters then use that:
     */

    if (self.engine.render){
      self.renderFile = function(path, options, callback){
        fs.readFile(path, 'utf8', function(err, str){
          if (err){
            return callback(err);
          }
          callback(null, self.engine.render(str, { locals: options }));
        });
      };
    }
  }
};
