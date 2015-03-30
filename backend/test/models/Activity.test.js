var wolfpack = require('wolfpack');
var should = require('should');
var assert = require('assert');

var Activity = wolfpack(__dirname + '/../../api/models/Activity.js');

var as = require('activitystrea.ms');
// When Im looking for id 3, I want to return this result
//Activity.setFindResults({id: 3}, {id: 3, displayName: 'John'});

// When Im looking for name John, I want these results
var newActivity = {
    actor: {
      url: "http://example.org/martin",
      objectType: "person",
      id: "tag:example.org,2011:martin",
      displayName: "Martin Smith"
    },
    verb: "post",
    object: {
      url: "http://example.org/blog/2011/02/entry",
      id: "tag:example.org,2011:abc123/xyz"
    },
    target: {
      url: "http://example.org/blog/",
      objectType: "blog",
      id: "tag:example.org,2011:abc123",
      displayName: "Martin's Blog"
    }
  }

describe('ActivityModel', function() {

  describe('#find()', function() {

    it('find list of activites', function(done) {

      Activity.setFindResults({name: 'John' }, [{ id: 3, name: 'John' }, { id: 5, name: 'John' }]);

      Activity.find({
          name: 'John'
        }).then(function(results) {

          results.should.be.instanceof(Array).and.have.lengthOf(2);

          done();
        }).catch(done);

    });

  });



  describe('#create()', function() {

    it('creates an post activity', function(done) {

      Activity.setCreateResults({verb: 'post'}, newActivity);

      Activity.create({
        verb: 'post'
      }).then(function(result) {
        assert.ok(result);
        done();
      }).catch(done);

    });

  });


  //   describe('activitystream.js', function() {

  //         it('created a simple activity object', function(done) {

  //          Activity.setCreateResults({
  //            verb: 'post'
  //          }, newActivity);

  //          as.post().
  //          actor('acct:sally@example.org').
  //          object('http://www.example.org/post').
  //          get().
  //          export(function(err, obj) {
  //            assert.ok(obj);
  //            done();
  //          });

  //        });



  // });
});
