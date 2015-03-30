/**
 * ActivityController
 *
 * @description :: Server-side logic for managing Activities
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	find: function(req, res) {
      Activity.find()
      .populate('actor')
      .populate('object')
        .then(function(results) {


          if (!req.isSocket)
          return res.ok(results);

					Activity.watch(req);
          res.ok(results);

        }).catch(function(error) {
          console.log(error);
        });
  }
};
