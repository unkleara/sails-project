var request = require('supertest');
var should = require('should');
var assert = require('assert');
var stubs = require('../stubs.js');

describe('AuthController', function() {

  describe('check req.header for bearer token', function() {

    it('responds ok', function(done) {
      var jwtToken = stubs.jwtToken();
      request(sails.hooks.http.app)
        .get('/auth/me')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + jwtToken.token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);


          assert.ok(res.body);

          done();
        });
    });
  });

});

