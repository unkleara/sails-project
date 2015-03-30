var should = require('should');
var assert = require('assert');
var sinon = require('sinon');
var stubs = require('../stubs.js');

var jwtAuth = require('../../api/policies/jwtAuth.js');

var req,
    res,
    statusCode,
    sentData;

describe('jwtAuth', function() {

 beforeEach(function() {
      res = {
        send: function(code, data) {
          statusCode = code;
          sentData = data;
        }
      };

      req = {
        headers: {},
        user: {}
      }
  });

  describe('Authorization Header', function() {

    var userStub = stubs.userStub();
    var jwtToken = stubs.jwtToken();
    var next = sinon.stub();

    it('verify token from authorizen headers and assign to req.user', function(done) {

      req.headers = { authorization: 'Bearer ' + jwtToken.token };

      jwtAuth(req, res, function() {
        assert.equal(req.user.id, userStub.id);
      });

      done();
    });

    it('status should be 401 if headers are missing', function(done) {

      jwtAuth(req, res, next);
      statusCode.should.equal(401);
      done();
    });
  });


});
