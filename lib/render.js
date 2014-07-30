exports.name = 'adapter-base-render';

exports.attach = function(/* options */){
  var self = this;

  /**
   * This plugin requires that a template engine plugin has already
   * been loaded:
   */

  if (!self.engine){
    throw new Error('A template engine is required.');
  }

  self.render = function(str, options, callback){
    callback(null, self.engine.render(str, { locals: options }));
  };
};
