/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  online: function(req, res) {

    User.find().exec(function(err, users) {
      if (err) return console.log(err);

      var whiteListedUsers = [];

      _.each(users, function(user) {

        User.subscribe(req.socket, user.id, 'update');

        whiteListedUsers.push({
          id: user.id,
          displayName: user.displayName,
          email: user.email,
          signedIn: user.signedIn,

          // Add a property called "msUntilInactive" so the front-end code knows
          // how long to display this particular user as active.
          msUntilInactive: (function() {
            var _msUntilLastActive;
            var now = new Date();
            _msUntilLastActive = (user.lastActive.getTime() + 5 * 1000) - now.getTime();
            if (_msUntilLastActive < 0) {
              _msUntilLastActive = 0;
            }
            return _msUntilLastActive;
          }())

        }); // whiteListedUsers end

      }); //_.each end

      res.ok(whiteListedUsers);
    }); // User.find end




  },
  setOnline: function(req, res) {

    User.findOne(req.user.id).exec(function(err, user) {
      if (err) return console.log(err);

      var INACTIVITY_TIMEOUT = 5 * 1000;
      User.update(user.id, {
        lastActive: new Date()
      }).then(function() {
        if (!req.isSocket)
          return res.ok();

        publishUpdate(user, INACTIVITY_TIMEOUT);
        res.ok();

      }).catch(function(error) {
        console.log(error);
      });
    });
  },
  setOffline: function(req, res) {

    User.findOne(req.user.id).exec(function(err, user) {
      if (err) return console.log(err);
      User.update(user.id, {
        signedIn: false
      }).then(function() {

        if (!req.isSocket)
          return res.ok();

        publishUpdate(user, 0);
        res.ok();

      }).catch(function(error) {
        console.log(error);
      });

    });
  },
  profile: function(req, res) {

    var userId = req.params.id;
    User.findOne(userId).exec(function(err, foundUser) {
      if (err) return console.log(err);

      res.status(200).json(foundUser);

    });
  }
};



function publishUpdate(user, activityTime) {
  User.publishUpdate(user.id, {
    msUntilInactive: activityTime,
    displayName: user.displayName
  });
}

//function handleResponse(req, res, respondWithSocket) {
//  if (req.isSocket) {
//    respondWithSocket();
//    return res.ok();
//  } else {
//    return res.ok();
//  }
//}
