//aquí guardamos la logica de la sesion de usuario con JWT
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

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
};
