/**
* News.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var PostModel = require('./Post');

module.exports = _.extend(PostModel, {

  attributes: {
      _type: {
        type: 'string',
        required: true,
        defaultsTo: 'News'
      }
  }
});

/*
News
Systems Update
Game Info
Guild Achievement
*/
