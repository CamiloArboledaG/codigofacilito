const express = require("express");
let router = express.Router();
const visitsController = require("../controllers/visitsController");
const authenticateOwner = require("../middlewares/authenticateOwner");

var { expressjwt: jwt } = require("express-jwt");
const secrets = require("../config/secrets");

router
  .route("/")
  .get(visitsController.index)
  .post(visitsController.create);

router
  .route("/:id")
  .delete(
    visitsController.find,
    authenticateOwner,
    visitsController.destroy
  );
module.exports = router;
