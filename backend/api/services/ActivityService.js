
module.exports = function(req, res, item) {

  var reqOptions = req.options;
  var modelName = reqOptions.model;
  var action = reqOptions.action;
  var savedObject = item;


  var newActivity = {
    verb: action,
    actor: savedObject.owner,
    title: action+'ed' + ' a new ' + modelName,
    object: {
      title: savedObject.body,
      url: 'http://localhost:1337/' + modelName + '/' + savedObject.id,
      objectType: modelName
    }
  };

  Activity.create(newActivity)
    .exec(function(err, activity) {
      if (err) return console.log(err);

      newActivity.id = activity.id;
      Activity.publishCreate(newActivity);
      
      return res.ok(activity);
    });
};
