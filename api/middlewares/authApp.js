const Application = require("../models/Application");

module.exports = function(req, res, next){
    Application.count({}).then(count => {
        if(count > 0 && !req.headers.secret) return next(new Error("No se encontró la aplicación"));

        req.validApp = true;
        next();
    }).catch(err => next(err));
}