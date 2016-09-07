exports.name = 'adapter-base-render';

var _ = require('lodash');
var frontMatter = require('front-matter');
var searchFile = require('./searchFile');

exports.attach = function(/* options */){
  var self = this;

  /**
   * This plugin requires that a template engine plugin has already
   * been loaded:
   */

  if (!self.engine){
    throw new Error('A template engine is required.');
  }

  /**
   * If there is no render function then create one:
   */

  if (!self.render){
    self.render = function (str, _options, callback){
      var options = _.cloneDeep(_options);

      /**
       * If there is any front matter then see if it contains a layout template:
       */

      if (frontMatter.test(str)) {
        var content = frontMatter(str);

        if (content.attributes && content.attributes.layout) {
          /**
           * If we do have a layout then we pass the content of this current
           * file as the special local variable 'content' and then run it
           * through renderFile():
           */

          var tempOptions = _.cloneDeep(options);

          options.locals = options.locals || {};
          options.locals.content = content.body;
          self.renderFile(content.attributes.layout + '.html', options, function(err, html) {
            self.render(html, tempOptions, callback);
          })
        }
      } else {

        // try{
        var context = self.engine.newContext();

        /**
         * Note that there's a bug in the library that doesn't allow us to pass
         * the locals to newContext(), hence looping through the keys:
         */

        if (options.locals){
          Object.keys(options.locals).forEach(function (local){
            context.setLocals(local, options.locals[local]);
          });
          delete options.locals;
        }

        if (options.meta){
          context.setLocals('page', options.meta);
          delete options.meta;
        }

        /**
         * Attach the relevant filter functions:
         */

        var facade = require('adapter-filters');
        var filters = facade(self.filters, options);

        Object.keys(filters).forEach(function (filter){
          context.setFilter(filter, filters[ filter ]);
        });

        if ('filters' in options){
          Object.keys(options.filters).forEach(function (filter){
            context.setFilter(filter, options.filters[ filter ]);
          });
          delete options.filters;
        }

        /**
         * Set up a callback for the include directory:
         */

        var includeDirList = options.includeDir || process.cwd();
        delete options.includeDir;

        var path = require('path');
        var fs = require('fs');

        if (!Array.isArray(includeDirList)) {
          includeDirList = [includeDirList];
        }

        var newList = [];

        includeDirList.forEach(function(includeDir) {
          newList.push(path.join(includeDir, 'liquid'));
          newList.push(includeDir);
        });

        context.onInclude(function (name, callback) {
          var extname = path.extname(name) === '' ? '.liquid' : '';

          searchFile(name + extname, newList, function(err, data) {
            if (err) {
              return callback('Failed to find partial: ' + err);
            }
            callback(null, self.engine.parse(data));
          });
        });

        /**
         * The custom tag functions need to have their results pushed back
         * through the parser, so set up a shim before calling the provided
         * callback:
         */

        var compileOptions = {
          customTags: {}
        };

        if (options.customTags){
          var tagFunctions = options.customTags;

          Object.keys(options.customTags).forEach(function (customTag){
            /*Tell jshint there's no problem with having this function in the loop */
            /*jshint -W083 */
            compileOptions.customTags[customTag] = function (context, name, body){
              var tpl = tagFunctions[name](body.trim());
              context.astStack.push(self.engine.parse(tpl));
            };
            /*jshint +W083 */
          });
          delete options.customTags;
        }

        var tmpl = self.engine.compile(str, compileOptions);

        for (var k in options){
          context.setLocals(k, options[k]);
        }
        tmpl(context, callback);
      // }catch(err){
      //   callback(err);
      // }

      }
    };
  }

  /**
   * If the render function that has been provided by the engine is
   * synchronous then we need to wrap it:
   */

  if (self.languageConfig.sync){
    var syncFn = self.render;

    self.render = function (str, options, callback){
      callback(null, syncFn(str, options));
    };
  }

  /**
   * If the locals passed in need moving to a new location then do it:
   */

  if (self.languageConfig.moveLocals){
    var renderFn = self.render;

    self.render = function (str, options, callback){
      var context = {};

      context[self.languageConfig.moveLocals] = options;
      renderFn(str, context, callback);
    };
  }
};
