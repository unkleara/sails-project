
module.exports = function isAllowed(req, res, next) {
  if (!req.options.controller || !req.options.action)
    return res.send(400, 'Bad Request');

  next();

  //return res.forbidden();

};
