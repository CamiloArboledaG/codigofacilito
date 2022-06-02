const express = require("express");
let router = express.Router();
const applicationsController = require("../controllers/applicationsController");
const authenticateOwner = require("../middlewares/authenticateOwner");

var { expressjwt: jwt } = require("express-jwt");
const secrets = require("../config/secrets");

router
  .route("/")
  .get(jwt({ secret: secrets.jwtSecret, algorithms: ["HS256"] }),applicationsController.index)
  .post(applicationsController.create);

router
  .route("/:id")
  .delete(
    applicationsController.find,
    applicationsController.destroy
  );
module.exports = router;
