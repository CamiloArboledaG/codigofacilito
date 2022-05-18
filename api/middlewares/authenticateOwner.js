module.exports = function(req, res, next) {
  if (req.mainObj && (req.mainObj._user == req.auth.id)) {
    return next();
  } else {
      next(new Error("You have no permission to do this action"));
  }
}