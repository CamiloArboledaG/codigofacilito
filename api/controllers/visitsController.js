const paramsBuilder = require("./helpers").paramsBuilder;

const validParams = ["_place", "reaction", "observation"];

const Visit = require("../models/Visit");
const User = require("../models/User");

function find(req, res, next) {
  Visit.findById(req.params.visit_id)
    .then((visit) => {
      req.mainObj = visit;
      req.visit = visit;
      next();
    })
    .catch(next);
}

function index(req, res) {
  User.findOne({ _id: req.auth.id })
    .then((user) => {
      user.favorites.then((fav) => {
        res.json(fav);
      });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
}

function create(req, res) {
  const params = paramsBuilder(validParams, req.body);
  params["_user"] = req.auth.id;
  Visit.create(params)
    .then((visit) => {
      res.json(visit);
    })
    .catch((error) => {
      res.status(422).json({ error });
    });
}

function destroy(req, res) {
  req.visit
    .remove()
    .then((doc) => {
      res.json({});
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
}

module.exports = { create, find, destroy, index };
