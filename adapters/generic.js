/**
 * Basic engine support.
 */

/**
 * Return a function that creates a plugin:
 */

module.exports = function(language){
  return {
    attach: function (/* options */){
      this.engine = require(language);
    }
  , name: 'adapter-' + language
  };
};
