/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Promise = require('bluebird');

module.exports = {
  login: function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    if (!email || !password) return res.status(401).send({message: 'Email and password required'});

    User.findOneByEmail(email, function(err, user) {
      if (!user) return res.json(401, {message: 'Invalid username or password'});

      User.validatePassword(password, user, function(err, valid) {
        if (err) return res.status(403);
        if (!valid) return res.status(401).send({message: 'Invalid Credentials'});
      });

      var jwtToken = createAuthToken(user);
      res.status(200).json({user: user, token : jwtToken });

    });
  },
  signup: function(req, res) {

    var userParams = {
      email: req.body.email,
      displayName: req.body.displayName,
      password: req.body.password,
      signedIn: false
    };

    if (!userParams.email || !userParams.password) {
      return res.status(401).send({message: 'Email and password required'});
    }

    User.create(userParams).exec(function(err, user) {
      if (err) return res.negotiate(err);
      res.status(200).json({user: user, token : createAuthToken(user)});

  });
  },
  currentUser: function(req, res) {
    User.findOne(req.user.id)
      .populate('roles')
      .exec(function(err, foundUser) {
      if (err) return console.log(err);

      //console.log( _.pluck(foundUser.roles, 'id'));
      var user = {
        email: foundUser.email,
        displayName: foundUser.displayName
      };

      res.status(200).json(user);

  });
  }

};
