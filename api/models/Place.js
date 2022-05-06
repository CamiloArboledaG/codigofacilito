const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Uploader = require("../models/Uploader");

let placeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  acceptsCreditCards: {
    type: Boolean,
    default: false,
  },
  coverImage: String,
  avatarImage: String,
  openHour: Number,
  closeHour: Number,
});

placeSchema.methods.updateImage = function (path, imageType) {
  //subir avatar
  //Guardar el lugar
  return Uploader(path)
  .then((secure_url) => this.saveImageUrl(secure_url, imageType));
};

placeSchema.methods.saveImageUrl = function (secure_url, imageType) {
  this[imageType + "Image"] = secure_url;
  return this.save();
};

//Paginación para que no nos de todos los datos de una, sino que este por pagina
placeSchema.plugin(mongoosePaginate);

let Place = mongoose.model("Place", placeSchema);

module.exports = Place;
