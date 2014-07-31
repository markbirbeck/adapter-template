adapter-template
================

Adapters to standardise the interfaces on the plethora of available templating engines.

[![wercker status](https://app.wercker.com/status/b56d4ba83550c79c90a82f510dc523df/m/master "wercker status")](https://app.wercker.com/project/bykey/b56d4ba83550c79c90a82f510dc523df)

# Documentation

See the [adapter-template wiki](https://github.com/stakk/adapter-template/wiki) for documentation on:

* how to use the module in your applications;
* how to use the module in Express;
* and how to add other template engines.

# Template Languages Supported:

* atpl
* ejs
* haml
* handlebars
* jade
* liquid
* swig
* toffee
* whiskers

# Changelog

## 2014-07-31 (v0.7.0)
Add Liquid support.

Add Haml support.

Enable modules to provide synchronous or asynchronous `render()` methods.

Create a `render()` method of an engine does not provide one.

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
