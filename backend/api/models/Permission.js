/**
* Permission.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    controller: {
      type: 'string'
    },
    action: {
      type: 'string',
      enum: [
        'create',
        'read',
        'update',
        'delete'
      ]
    },
    name: {
      type: 'string',
      unique: true,
      required: true
    },
    role: {
      model: 'Role',
      required: true
    },
    games: {
      collection: 'game'
    },
    toJSON: function() {
      var obj = this.toObject();

      delete obj.createdAt;
      delete obj.updatedAt;

      return obj;
    }
  }
};

