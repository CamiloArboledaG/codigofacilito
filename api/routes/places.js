const express = require("express");

let router = express.Router();

const placesController = require("../controllers/PlacesController");

//CRUD

//No agregamos como función al final de cada una con (), se envía es la función para que se ejecute en el momento correspondiente

router.route("/").get(placesController.index).post(placesController.multerMiddleware(), placesController.create);
router
  .route("/:id")
  .get(placesController.find, placesController.show)
  .put(placesController.find, placesController.update)
  .delete(placesController.find, placesController.destroy);

module.exports = router;

{
  /**
 //Formas de hacerlo directamente desde el archivo app.js

app.get("/places/:id", (req, res) => {});

app.put("/places/:id", (req, res) => {});

app.delete("/places/:id", (req, res) => {});
*/
}
