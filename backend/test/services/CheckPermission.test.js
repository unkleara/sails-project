var should = require('should');
var assert = require('assert');
var sinon = require('sinon');
var stubs = require('../stubs.js');

var CheckPermission = require('../../api/services/CheckPermission.js');

var req,
  res,
  statusCode,
  sentData;

var next = sinon.stub();

describe('CheckPermission - Service', function() {

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

  describe('getMethod', function() {

    it('maps the method name', function(done) {
       req.method = 'GET';
      CheckPermission.getMethod(req).should.equal('read');

      done();
    });

  });


});
