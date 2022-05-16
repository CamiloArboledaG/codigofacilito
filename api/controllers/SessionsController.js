//aquí guardamos la logica de la sesion de usuario con JWT
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");
const User = require("../models/User");

function authenticate(req, res, next) {
  User.findOne({ email: req.body.email }).then((user) => {
    user.verifyPassword(req.body.password)
    .then(valid => {
      if(valid){
        req.user = user;
        next();
      }else{
        next(new Error("Usuario o contraseña incorrectos"));
      }
    })
  }).catch(error => next(error));
}

function generateToken(req, res, next) {
  if (!req.user) return next();
  //Primer parametro de sign de jwt es la información que necesitamos que almacene el token
  //Segundo parametro es la clave secreta
  req.token = jwt.sign({ id: req.user._id }, secrets.jwtSecret);
  next();
}

function sendToken(req, res) {
  if (req.user) {
    res.json({
      user: req.user,
      jwt: req.token,
    });
  } else {
    res.status(422).json({
      error: "No se pudo crear la sesion",
    });
  }
}
module.exports = {
  generateToken,
  sendToken,
  authenticate,
};
