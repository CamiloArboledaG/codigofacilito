const User = require("../models/User");

module.exports = function (req, res, next) {
  if (req.auth) {
    User.findById(req.auth.id).then((user) => {
      req.fullUser = user;
      next();
    });
  } else {
    next();
  }
};
