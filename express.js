const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/saludo", function(req, res) {
    res.send(`Hola ${req.query.name}`);
});

// es una ruta post, para analizar el cuerpo del mensaje necesitamos de body-parser.
app.post("/", function(req, res) {
    res.send(`Hola ${req.body.name}`);
});

app.listen(3000);