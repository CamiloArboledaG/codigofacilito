const express = require("express");
const router = express.Router();

const usersCrontroller = require("../controllers/UsersController");
const sessionsController = require("../controllers/SessionsController");

router
  .route("/")
  .post(
    usersCrontroller.create,
    sessionsController.generateToken,
    sessionsController.sendToken
  )

module.exports = router;
