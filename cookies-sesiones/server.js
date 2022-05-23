const express = require("express");
const cookieSession = require("cookie-session");

const app = express();

//las claves solo se usa la primera, el resto es para rotar así es más complicado que se vulnere

app.use(
  cookieSession({
    name: "session",
    keys: ["asdasd", "123"],
  })
);

app.get("/", function (req, res) {
    //primero declaramos que tiene el valor normal, pero si es la primera visita el valor es 0 ya que si no lo hacemos lanza error
  // si es la primera vez que entramos nos lanza el valor undefined
    req.session.visits = req.session.visits || 0;
  // cada vez que acceda suma un más uno en la cookie
  req.session.visits = req.session.visits + 1;

  res.send(`${req.session.visits} visitas`);
});

app.listen(3000);
