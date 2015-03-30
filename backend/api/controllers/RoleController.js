/**
 * RoleController
 *
 * @description :: Server-side logic for managing roles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	users: function(req, res) {
		Role.find({users: req.query.user_id})
		.then(function(users) {
			res.ok(users);
		}).catch(function(error) {
			console.log(error);
		});
	}
};
