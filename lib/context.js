exports.name = 'adapter-base-context';

exports.attach = function(/* options */){
  var self = this;

  /**
   * This plugin requires that a template engine plugin has already
   * been loaded:
   */

  if (!self.engine){
    throw new Error('A template engine is required.');
  }

  if (!self.engine.newContext) {
    self.engine.newContext = function() {
      var engine = new self.engine.Engine();

      engine.setFilter = function(name, fn) {
        var filters = {};

        filters[name] = fn;
        return this.registerFilters(filters);
      };
      return engine;
    };
  }
};
