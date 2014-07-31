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
      this.languageConfig = languageConfig;

      /**
       * Add key methods:
       */

      var renderFileMethodName = languageConfig.renderFileMethodName
        || 'renderFile';

      this.__express = this.engine.__express || undefined;
      this.renderFile = this.engine[renderFileMethodName] || undefined;
      this.render = this.engine.render || undefined;
    }
  , name: 'adapter-' + language
  };
};
