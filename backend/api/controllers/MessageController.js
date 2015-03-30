/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function(req, res) {

    User.findOne(req.user.id).exec(function(err, user) {
      if (err) return console.log(err);

      var newMessage = {
        body: req.body.body,
        owner: user.id
      };

      Message.create(newMessage)
      .then(function(message) {
        //console.log(message);
        ActivityService(req, res, object);
        //res.ok(message);
      }).catch(function(error) {
        console.log(error);
      });
    });
  }
};
