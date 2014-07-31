/**
 * Set the default configuration values:
 */

process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';
var config = require('config');

config.util.setModuleDefaults('engines', {
  ect: {
    renderFileMethodName: 'render'
  , useConstructor: true
  }
, haml: {
    moveLocals: 'locals'
  , sync: true
  }
, liquid: {

  /**
   * The name of the module that provides Liquid support:
   */

    module: 'tinyliquid'
  }
, handlebars: {

  /**
   * The name of the module that provides Handlebars support:
   */

    module: 'hbs'
  }
});
