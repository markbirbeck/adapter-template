/**
 * Tests to ensure that any template engine adapter works with Express.
 */

var request = require('supertest');
var express = require('express');
var facade = require('..');

/**
 * Create an Express server app that uses a specified templating engine to
 * return a view.
 */

function createApp (engineName, templateName, viewsDir){
  var app = express();

  app.engine(engineName, facade(engineName).renderFile);

  app.set('views', viewsDir);

  app.get('/', function (req, res) {
    res.render(templateName, req.query);
  });

  return app;
}

/**
 * Ensure that each template engine adapter can be used with Express:
 */

describe('Express', function(){

  var viewsDir = __dirname + '/fixtures';

  /**
   * The tests are driven by the presence of a template:
   */

  var fs = require('fs');
  var regex = /^user\.(.*)$/;

  fs.readdirSync(viewsDir).map(function (filename){
    it(filename, function (done){
      filename.should.match(
        regex
      , 'Use \'user.engine\' as template name, where \'engine\' is engine name.'
      );

      var matches = filename.match(regex);
      var engineName = matches[1];

      var app = createApp(engineName, filename, viewsDir);

      request(app)
        .get('/')
        .query( {user: 'tobi'} )
        .expect(200, '<p>tobi</p>', done);
    });
  });
});
