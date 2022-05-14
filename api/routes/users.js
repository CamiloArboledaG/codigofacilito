const express = require('express');
const router = express.Router();

const usersCrontroller = require('../controllers/UsersController');

router.route('/')
  .post(usersCrontroller.create)

module.exports = router;
