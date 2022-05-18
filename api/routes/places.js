const express = require("express");

let router = express.Router();

const placesController = require("../controllers/PlacesController");

const authenticateOwner = require("../middlewares/authenticateOwner");

//CRUD

//No agregamos como función al final de cada una con (), se envía es la función para que se ejecute en el momento correspondiente

router
  .route("/")
  .get(placesController.index)
  .post(
    placesController.multerMiddleware(),
    placesController.create,
    placesController.saveImage
  );
router
  .route("/:id")
  .get(placesController.find, placesController.show)
  .put(placesController.find, authenticateOwner, placesController.update)
  .delete(placesController.find, authenticateOwner, placesController.destroy);

module.exports = router;

{
  /**
 //Formas de hacerlo directamente desde el archivo app.js

app.get("/places/:id", (req, res) => {});

app.put("/places/:id", (req, res) => {});

app.delete("/places/:id", (req, res) => {});
*/
}
