/**
* _Object.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    url: {
      type: 'string',
      defaultsTo: ''
    },
    displayName: {
      type: 'string',
      defaultsTo: ''
    },
    content: {
      type: 'string',
      defaultsTo: ''
    },
    objectType: {
      type: 'string',
      defaultsTo: ''
    },
    activity: {
      model: 'Activity'
    }
  }

};



