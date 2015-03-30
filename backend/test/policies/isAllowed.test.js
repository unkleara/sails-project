var should = require('should');
var assert = require('assert');
var sinon = require('sinon');
var stubs = require('../stubs.js');

var isAllowed = require('../../api/policies/isAllowed.js');

var req,
  res,
  statusCode,
  sentData;

var next = sinon.stub();

describe('isAllowed - Policy', function() {

  beforeEach(function() {
    res = {
      send: function(code, data) {
        statusCode = code;
        sentData = data;
      }
    };

    req = {
      headers: {},
      options: {
        action: '',
        controller: ''
      },
      headers: {},
      user: ''
    }
  });

  describe('isAllowed middleware', function() {
    var userStub = stubs.userStub();

    it('returns next if no errors', function(done) {
      req.options.controller = 'user';
      req.options.action = 'create';

      isAllowed(req, res, next);
      next.called.should.be.true
      done();
    });

    it('returns 400 if req.options are missing ', function(done) {

      isAllowed(req, res, next);

        statusCode.should.equal(400);
        done();

    });

  });


});
