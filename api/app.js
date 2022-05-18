var createError = require("http-errors");
var express = require("express");
var path = require("path");
//var cookieParser = require('cookie-parser');//Leer las cookies del navegador
var logger = require("morgan"); //Registrar en un log todas las peticiones que se hacen al servidor
/**
 * Este middleware valida el jwt, si es valido genera una propiedad
 * user dentro de req, donde almacena toda la información procesada para el jwt.
 * Si no lo es bloquea las peticiones.
 */

var { expressjwt: jwt } = require("express-jwt");
const secrets = require("./config/secrets");

//Rutas
const places = require("./routes/places");
const users = require("./routes/users");
//No ponemos esto dentro de los usuarios por respetar las reglas REST
const sessions = require("./routes/sessions");

//Base de datos
const db = require("./config/database");

db.connect();
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  jwt({ secret: secrets.jwtSecret, algorithms: ["HS256"] }).unless({
    path: ["/sessions"],
    //method: "GET",
  })
);

app.use("/places", places);
app.use("/users", users);
app.use("/sessions", sessions);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
