/**
* Post.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    published: {
      type: 'date',
      required: true,
      defaultsTo: new Date(0)
    },
    title: {
      type: 'string',
      required: true
    },
    active:{
      type: 'boolean',
      defaultsTo: false
    },
    // post content
    body: {
      type: 'text',
      required: true
    },
    // body without tags
    bodyClean: {
      type: 'text'
    },
    image: {
      type: 'array'
    },
    sharedUrl: {
      type: 'string'
    },
    creator: {
      model: 'user'
    },
    game: {
      model: 'game'
    }
  }
};
