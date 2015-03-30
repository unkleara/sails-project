/*var request = require('supertest');
var should = require('should');
var assert = require('assert');
var stubs = require('../../stubs.js');

describe('MessageController', function() {
  var newMessage = {};

  describe('#create()', function() {
    var userStub = stubs.userStub();

    before(function() {
      newMessage = {
        body: 'Test message',
        owner: userStub.id
      };
    });

    it('should post a message', function(done) {


      var jwtToken = stubs.jwtToken();
      request(sails.hooks.http.app)
        .post('/message')
        .send(newMessage)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + jwtToken.token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);


          assert.ok(res.body);
          assert.equal(res.body.body, newMessage.body);

          done();
        });
    });
  });

});
*/
