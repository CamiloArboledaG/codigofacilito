const express = require("express");
let router = express.Router();
const applicationsController = require("../controllers/applicationsController");
const authenticateAdmin = require("../middlewares/authenticateAdmin");
const findUser = require("../middlewares/findUser");

var { expressjwt: jwt } = require("express-jwt");
const secrets = require("../config/secrets");

router.all("*", jwt({ secret: secrets.jwtSecret, algorithms: ["HS256"] }), findUser, authenticateAdmin)

router
  .route("/")
  .get(applicationsController.index)
  .post(applicationsController.create);

router
  .route("/:id")
  .delete(
    applicationsController.find,
    applicationsController.destroy
  );
module.exports = router;
