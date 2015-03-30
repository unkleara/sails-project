/**
* Activity.js
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
      defaultsTo: ''
    },
    verb: {
      type: 'string',
      defaultsTo: 'post'
    },
    // associations
    actor:{
      model: 'User'
    },
    object: {
      model: '_object'
    }
  }
};


/*  {
    published: "2011-02-10T15:04:55Z",
    actor: {
      url: "http://example.org/martin",
      objectType : "person",
      id: "tag:example.org,2011:martin",
      image: {
        url: "http://example.org/martin/image",
        width: 250,
        height: 250
      },
      displayName: "Martin Smith"
    },
    verb: "post",
    object : {
      url: "http://example.org/blog/2011/02/entry",
      id: "tag:example.org,2011:abc123/xyz"
    },
    target : {
      url: "http://example.org/blog/",
      objectType: "blog",
      id: "tag:example.org,2011:abc123",
      displayName: "Martin's Blog"
    }
  }*/
