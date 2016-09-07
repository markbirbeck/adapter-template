exports.name = 'adapter-base-render';

var _ = require('lodash');

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
    self.render = function (str, _options, callback){
      var options = _.cloneDeep(_options);

      /**
       * Attach the relevant filter functions:
       */

      var facade = require('adapter-filters');
      var filters = facade(self.language);

      Object.keys(filters).forEach(function (filter){
        context.setFilter(filter, filters[ filter ]);
      });

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
