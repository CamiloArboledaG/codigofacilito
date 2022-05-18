//modelo
const Place = require("../models/Place");
const upload = require("../config/upload");
const Uploader = require("../models/Uploader");
const helpers = require("./helpers");

const validParams = [
  "title",
  "description",
  "address",
  "acceptsCreditCards",
  "openHour",
  "closeHour",
];

//middleware
function find(req, res, next) {
  Place.findOne({ slug: req.params.id }) //cambiamos el slug por id, encerramos en corchetes y ponemos findOne
    .then((place) => {
      req.place = place;
      req.mainObj = place;
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

function create(req, res, next) {
  //Crear un nuevo lugar
  const params = helpers.paramsBuilder(validParams, req.body);
  console.log(req.auth);
  params["_user"] = req.auth.id;
  Place.create(params)
    .then((doc) => {
      req.place = doc;
      next();
    })
    .catch((err) => {
      next(err);
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

  //El problema de la siguiente línea es que si existe alguien malisioso que intenta tener permisos extras
  //puede mandarlo por el body y este lo aceptaría
  //req.place = Object.assign(req.place, req.body);
  const params = helpers.paramsBuilder(validParams, req.body);
  req.place = Object.assign(req.place, params);
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
  /* A middleware that is going to be used in the update route. It is going to be used to upload
  images. */
  return upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]);
}

function saveImage(req, res) {
  if (req.place) {
    const files = ["avatar", "cover"];
    const promises = [];
    files.forEach((imageType) => {
      if (req.files && req.files[imageType]) {
        // req.place.avatar = req.files.avatar[0].secure_url;
        const path = req.files[imageType][0].path;
        promises.push(req.place.updateImage(path, imageType));
      }
    });
    Promise.all(promises)
      .then((results) => {
        console.log(results);
        res.json(req.place);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  } else {
    res.status(422).json({
      error: req.error || "No files were uploaded.",
    });
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  find,
  multerMiddleware,
  saveImage,
};
