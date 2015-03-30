/**
 * Stubs for use in tests
 */
var crypto = require('crypto');
var stubs = {};
var createAuthToken = require('../api/services/createAuthToken.js');

stubs.userStub = function userStub() {
  return {
    id: '54e7c5d181c923952a7931db',
    roles: ['admin'],
  }
}


stubs.postStub = function postStub() {
  return {
    id:  crypto.randomBytes(10).toString('hex'),
    body:   crypto.randomBytes(90).toString('hex')
  }
}

stubs.jwtToken = function jwtToken() {
  return {
    token:  createAuthToken({id: '54e7c5d181c923952a7931db'})
  }
}

module.exports = stubs;
