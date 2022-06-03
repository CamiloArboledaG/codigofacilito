const Application = require("../models/Application");

module.exports = function (req, res, next) {
  //verificamos si es ajax.
  if (req.xhr) return next();

  const secret = req.headers.secret;

  if (!secret) return next();

  Application.findOne({ secret })
    .then((app) => {
      if (!app) return next(new Error("No se encontró la aplicación"));
      req.application = app;
      next();
    })
    .catch((err) => next(err));
};
