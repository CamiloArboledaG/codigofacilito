const express = require("express");

const app = express();

app.set("view engine", "ejs");

// use lo que hace es insertar un nuevo middleware en el stack de middlewares
app.use("/public", express.static("assets"));

{
  /**
// Para pasar etag false hacemos lo siguiente
// Ya no genera el cache con etag, de igual forma etag reduce el volumen, pero igual necesita hacer peticiones
app.use("/public", express.static("assets"), {
    etag:false
});
*/
}

{
    /**
  // Para pasar maxAge
  // Con esto podemos decir que espere un tiempo antes de volver a hacer una petición
  // por lo que no generara peticiones y usara el cache, hay que estar seguros que en ese tiempo no cambiara nada
  app.use("/public", express.static("assets"), {
      maxAge: "5h" //5 horas, el valor maximo es un año.
  });
  */
  }

app.get("/", function (req, res) {
  res.render("index");
});

{
  /**
// función para recibir archivos
app.get("/", function (req, res) {
 res.sendFile("index.html", {
  root: __dirname,
 });
 res.send(__dirname)
});
*/
}

app.listen(3000);
