adapter-template
================

Adapters to standardise the interfaces on the plethora of available templating engines.

[![wercker status](https://app.wercker.com/status/95faee8928ba8b43498da5204d591f94/m "wercker status")](https://app.wercker.com/project/bykey/95faee8928ba8b43498da5204d591f94)

# Documentation

See the [adapter-template wiki](https://github.com/stakk/adapter-template/wiki) for documentation on:

* how to use the module in your applications;
* how to use the module in Express;
* and how to add other template engines.

# Template Languages Supported:

* atpl
* ect
* ejs
* haml
* handlebars
* jade
* liquid
* swig
* toffee
* whiskers

# Changelog

## 2014-09-11 (v0.9.0)
Add support for filters in Liquid.

## 2014-07-31 (v0.8.0)
Add ECT support.

Allow for engine modules that return a constructor.

Allow the name of an engine's main function to be set in the configuration.

## 2014-07-31 (v0.7.0)
Add Liquid support.

Add Haml support.

Enable modules to provide synchronous or asynchronous `render()` methods.

Create a `render()` method if an engine does not provide one.

## 2014-07-28 (v0.6.0)
Add handlebars support.

Enable modules to have a different name to the template language they support.

## 2014-07-25 (v0.5.0)
Add swig support.

## 2014-07-25 (v0.4.0)
`package.json` was breaking Wercker.

Improve descriptions in `README`.

## 2014-07-25 (v0.3.0)
Ensure package.json is ready for NPM publishing.

## 2014-07-25 (v0.2.0)
Fix test dependencies for Wercker.

Add Wercker status badge to README.

## 2014-07-25 (v0.1.0)
Initial release with support for template engines that already provide Express support.
