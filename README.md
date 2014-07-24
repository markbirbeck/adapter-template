adapter-template
================

Adapters to standardise the interfaces on the plethora of available templating engines.

[![wercker status](https://app.wercker.com/status/b56d4ba83550c79c90a82f510dc523df/m/master "wercker status")](https://app.wercker.com/project/bykey/b56d4ba83550c79c90a82f510dc523df)

# Usage

To use the adapter, invoke the package with the name of the template *language* you want to use:

```javascript
var adapter = require('adapter-template');
var jade = adapter('jade');
```

The adapter will now provide access to an appropriate templating engine via a `renderFile` method which takes as parameters a path to a template, an object that can be used by that template, and a callback:

```javascript
jade.renderFile('./test/fixtures/user.jade', { user: 'tobi' }, function (err, html){
  console.log(html);
});
```

To use the adapter in Express, do the following:

```javascript
var express = require('express');
var adapter = require('adapter-template');
var engineName = 'jade';

var app = express();

app.engine(engineName, adapter(engineName).renderFile);
app.set('views', __dirname + '/fixtures');
...
```

Express requires a function that takes a path, locals and a callback, which `renderFile` does.

# Adding Additional Templating Engines

## Adding an Engine That Already Supports Express

The easiest templating libraries to support are those that:

* provide Express support by way of the `express()` method;
* have the same module name as the template file extension.

All that is required for these is to add an entry for an engine to the dependencies in `package.json`, and a template with the same file extension to the fixtures collection in the tests directory (see `test/fixtures`). This template will be picked up automatically when running tests, and its presence will cause a test to be run for the corresponding template engine.

# Template Languages Supported:

* atpl
* ejs
* jade
* toffee
* whiskers

# Changelog

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
