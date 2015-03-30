/**
 * NewsController
 *
 * @description :: Server-side logic for managing News
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res) {
			News.find()
			.then(function(news) {
				res.ok(news);
			}).catch(function(error) {
				console.log(error);
			});
	},
	create: function(req, res) {

		var newPost = {
			title: req.body.title,
			body: req.body.body,
			creator: req.user.id
		};

		News.create(newPost).exec(function(err, newsItem) {
			if (err) return console.log(err);

			res.ok(newsItem);
		});
	}
};
