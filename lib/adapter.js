/**
 * ADAPTER
 * =======
 */

module.exports = function (engineName, options){
  var broadway = require('broadway');
  var plugin = new broadway.App();

  /**
   * Create an adapter for the specified engine:
   */

  var adapter = require('../adapters/generic')(engineName);

  /**
   * Now load the adapter and do the post-processing to map the Express
   * support:
   */

  plugin.use(adapter, options);
  plugin.use(require('./express'), options);

  plugin.init(function (err) {
    if (err) {
      console.log(err);
    }
  });

  return plugin;
};
