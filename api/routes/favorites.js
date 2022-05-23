const express = require("express");
let router = express.Router();
const favoritesController = require("../controllers/FavoritesController");
const authenticateOwner = require("../middlewares/authenticateOwner");

var { expressjwt: jwt } = require("express-jwt");
const secrets = require("../config/secrets");

router
  .route("/")
  .get(jwt({ secret: secrets.jwtSecret, algorithms: ["HS256"] }), favoritesController.index)
  .post(favoritesController.create);

router
  .route("/:id")
  .delete(
    favoritesController.find,
    authenticateOwner,
    favoritesController.destroy
  );
module.exports = router;
