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

  /**
   * If there is no render function then create one:
   */

  if (!self.render){
    self.render = function (str, options, callback){
      var context = self.engine.newContext();
      var tmpl = self.engine.compile(str, options);

      for (var k in options){
        context.setLocals(k, options[k]);
      }
      tmpl(context, callback);
    };
  }

  /**
   * If the render function that has been provided by the engine is
   * synchronous then we need to wrap it:
   */

  if (self.languageConfig.sync){
    var syncFn = self.render;

    self.render = function (str, options, callback){
      callback(null, syncFn(str, options));
    };
  }

  /**
   * If the locals passed in need moving to a new location then do it:
   */

  if (self.languageConfig.moveLocals){
    var renderFn = self.render;

    self.render = function (str, options, callback){
      var context = {};

      context[self.languageConfig.moveLocals] = options;
      renderFn(str, context, callback);
    };
  }
};