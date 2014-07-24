exports.name = 'adapter-base-express';

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
   * If the engine supports the __express(path, options, callback) method
   * then use it as our renderFile method:
   */

  if (self.engine.__express){
    self.renderFile = self.engine.__express;
  }

  /**
   * Alternatively, if the engine supports a renderFile method then use that:
   */

  else if (self.engine.renderFile){
    self.renderFile = self.engine.renderFile;
  }
};
