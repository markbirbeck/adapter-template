/**
 * Basic engine support.
 */

/**
 * Return a function that creates a plugin:
 */

module.exports = function(engineName){
  return {
    attach: function (/* options */){
      this.engine = require(engineName);
    }
  , name: 'adapter-' + engineName
  };
};
