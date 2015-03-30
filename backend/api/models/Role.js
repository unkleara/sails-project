/**
* Role.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      index: true,
      notNull: true,
      unique: true,
      required: true
    },
    description: {
      type: 'string'
    },
    active: {
      type: 'boolean',
      defaultsTo: true,
      index: true
    },
    permissions: {
      collection: 'permission',
      via: 'role'
    },
    users: {
      collection: 'user',
      via: 'roles'
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.createdAt;
      delete obj.updatedAt;

      return obj;
    }
  }
};
