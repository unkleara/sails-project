'use strict';

var jwt = require('jsonwebtoken');
var moment = require('moment');

module.exports = function(req, res, next) {

  if (!req.headers || !req.headers.authorization)
    return res.send(401, { message: 'Authenication Failed' });

  var token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, 'secret', function(err, payload) {
    if (err) {
      return console.log(err);
    } else {
      if (payload.exp <= moment().unix())
        return res.send(401, { message: 'Token has expired' });

      req.user = {
        id: payload.sub,
        displayName: payload.displayName
      };

      return next();
    }

  });

};
