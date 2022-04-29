//modelo
const Place = require("../models/Place");
const upload = require("../config/upload");

//middleware
function find(req, res, next) {
  Place.findById(req.params.id)
    .then((place) => {
      req.place = place;
      next();
    })
    .catch((err) => {
      next(err);
    });
}

//CRUD

function index(req, res) {
  //Todos los lugares
  //En vez de usar find, usamos paginate para que nos de todos los lugares por pagina
  //En los parametros, decimos page y limit, que nos de todos los lugares por pagina, y que nos de 8 lugares por pagina damos sort por id de manera que nos de los lugares mas recientes primero
  Place.paginate({}, { page: req.query.page || 1, limit: 8, sort: { _id: -1 } })
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

// Cambiamos show con el middleware find.

{
  /**function show(req, res) {
  //Busqueda individual
  Place.findById(req.params.id)
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
} */
}

function show(req, res) {
  //Busqueda individual
  res.json(req.place);
}

function create(req, res) {
  //Crear un nuevo lugar
  Place.create({
    title: req.body.title,
    description: req.body.description,
    acceptsCreditCards: req.body.acceptsCreditCards,
    openHour: req.body.openHour,
    closeHour: req.body.closeHour,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

function update(req, res) {
  //Actualizar un lugar
  //se puede usar findById y save, pero se usa findOneAndUpdate || findByIdAndUpdate porque es mas eficiente

  {
    /**Place.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });*/
  }
  //Quitamos esto si usamos req.body en object.assign, pero es inseguro.

  let attributes = [
    "title",
    "description",
    "acceptsCreditCards",
    "openHour",
    "closeHour",
  ];
  let placeParams = {};
  attributes.forEach((attribute) => {
    if (Object.prototype.hasOwnProperty.call(req.body, attribute)) {
      placeParams[attribute] = req.body[attribute];
    }
  });

  //El problema de la siguiente línea es que si existe alguien malisioso que intenta tener permisos extras
  //puede mandarlo por el body y este lo aceptaría
  //req.place = Object.assign(req.place, req.body);

  req.place = Object.assign(req.place, placeParams);
  req.place
    .save()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

function destroy(req, res) {
  //Eliminar un lugar
  {
    /**
  Place.findByIdAndDelete(req.params.id)
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
 */
  }
  req.place
    .remove()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

function multerMiddleware() {
  //si es una imagen usamos avatar, usamos fields para que nos de un array con todas las imagenes
  return upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]);
}

module.exports = { index, show, create, update, destroy, find, multerMiddleware };
