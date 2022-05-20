const paramsBuilder = require("./helpers").paramsBuilder;

const validParams = ["_place"];

const FavoritePlace = require("../models/FavoritePlace");

function find(req, res, next) {
  FavoritePlace.findById(req.params.id)
    .then((favorite) => {
      req.mainObj = favorite;
      req.favorite = favorite;
      res.json(favorite);
      next();
    })
    .catch(next);
}

function create(req, res) {
  const params = paramsBuilder(validParams, req.body);
  params["_user"] = req.auth.id;
  FavoritePlace.create(params)
    .then((favorite) => {
      res.json(favorite);
    })
    .catch((err) => {
      res.status(422).json({ error: err });
    });
}

function destroy(req, res) {
  req.favorite
    .remove()
    .then(() => {
      res.json({});
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

module.exports = { create, find, destroy };
