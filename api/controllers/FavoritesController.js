const paramsBuilder = require("./helpers").paramsBuilder;

const validParams = ["_place"];

const FavoritePlace = require("../models/FavoritePlace");

const User = require("../models/User");

function find(req, res, next) {
  FavoritePlace.findById(req.params.id)
    .then((favorite) => {
      req.mainObj = favorite;
      req.favorite = favorite;
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
  FavoritePlace.create(params)
    .then((favorite) => {
      res.json(favorite);
    })
    .catch((error) => {
      res.status(422).json({ error });
    });
}

function destroy(req, res) {
  req.favorite
    .remove()
    .then((doc) => {
      res.json({});
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
}

module.exports = { create, find, destroy, index };
