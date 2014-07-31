/**
 * Basic engine support.
 */

require('../lib/setModuleDefaults');

var config = require('config');
var engineConfig = config.engines || {};

/**
 * Return a function that creates a plugin:
 */

module.exports = function(language){
  return {
    attach: function (/* options */){
      var languageConfig = engineConfig[language] || {};

      /**
       * If there is a specified engine for this language then use it,
       * otherwise just use the provided name:
       */

      this.engine = require(languageConfig.module || language);

      /**
       * Add key methods:
       */

      this.__express = this.engine.__express || undefined;
      this.renderFile = this.engine.renderFile || undefined;
    }
  , name: 'adapter-' + language
  };
};
