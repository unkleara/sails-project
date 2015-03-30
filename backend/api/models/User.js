/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcryptjs');

module.exports = {
  attributes: {
    displayName: {
      type: 'string',
      required: true,
      unique: true
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string'
    },
    lastActive: {
      type: 'date',
      required: true,
      defaultsTo: new Date(0)
    },
    signedIn: {
      type: 'boolean',
      defaultsTo: false
    },
    isAdmin: {
      type: 'boolean',
      defaultsTo: false
    },
    roles: {
      collection: 'Role',
      via: 'users',
      dominant: true
    },
    posts: {
      collection: 'Post',
      via: 'creator',
      dominant: true
    },
    messages: {
      collection: 'Message',
      via: 'owner'
    },
    activities: {
      collection: 'Activity',
      via: 'actor'
    },
    games: {
      collection: 'Game',
      via: 'members'
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.updatedAt;
      delete obj.createdAt;

      return obj;
    }
  },
  beforeCreate: function(attributes, next) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(attributes.password, salt, function(err, hash) {
        if (err) return next(err);
        attributes.password = hash;
        next();
      });
    });
  },
  validatePassword: function(password, user, cb) {
    bcrypt.compare(password, user.password, function(err, match) {
      if (err) cb(err);

      if (match) {
        cb(null, true);
      } else {
        cb(err);
      }
    });
  },
  getRoles: function(userId) {
    User.findOne(userId)
      .populate('roles')
      .then(function(user) {
        console.log(user.roles);
        return user.roles;
      });
  }
};
