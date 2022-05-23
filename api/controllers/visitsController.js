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

//Haremos todas las visitas de un usuario y luego todas las visitas de un lugar

function index(req, res) {
  let promise = null;

  if (req.place) {
    promise = req.place.visits;
  } else if (req.auth) {
    promise = Visit.forUser(req.auth.id, req.query.page || 1);
  }
  if (promise) {
    promise
      .then((visits) => {
        res.json(visits);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  } else {
    res.status(404).json({});
  }
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
