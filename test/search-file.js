var fs = require('fs');
var path = require('path');

var should = require('chai').should();

var uut = require('../lib/search-file');

describe('#searchFile()', function() {
  var testDir = __dirname;
  var fixturesDir = path.join(testDir, 'fixtures');

  var file1Name = 'filter.liquid';
  var file1 = fs.readFileSync(path.join(fixturesDir, file1Name), 'utf8');

  describe('search 0 directories', function(done) {
    it('no parameter', function(done) {
      uut(path.join(fixturesDir, file1Name), function(err, data) {
        should.not.exist(err);
        should.exist(data);
        data.should.equal(file1);
        done();
      });
    });

    it('undefined parameter', function(done) {
      uut(path.join(fixturesDir, file1Name), undefined, function(err, data) {
        should.not.exist(err);
        should.exist(data);
        data.should.equal(file1);
        done();
      });
    });
  });

  it('search 1 directory', function(done) {
    uut(file1Name, fixturesDir, function(err, data) {
      should.not.exist(err);
      should.exist(data);
      data.should.equal(file1);
      done();
    });
  });

  describe('search 2 directories', function() {
    it('1 match', function(done) {
      uut(file1Name, [testDir, fixturesDir], function(err, data) {
        should.not.exist(err);
        should.exist(data);
        data.should.equal(file1);
        done();
      });
    });

    it('no match', function(done) {
      uut('no file', [testDir, fixturesDir], function(err, data) {
        should.exist(err);
        err.should.equal('Failed to find file \'no file\' at specified locations');
        done();
      });
    });
  });
});
