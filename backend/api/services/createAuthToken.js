
var jwt = require('jsonwebtoken');


module.exports = function(user) {

  var payload = {
    displayName: user.displayName,
    sub: user.id
  };

  var expireTokenTime = 60 * 72;

  var token = jwt.sign(payload, 'secret', { expiresInMinutes: expireTokenTime });

  return token;

};
