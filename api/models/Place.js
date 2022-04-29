const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");


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

//Paginación para que no nos de todos los datos de una, sino que este por pagina
placeSchema.plugin(mongoosePaginate);

let Place = mongoose.model("Place", placeSchema);

module.exports = Place;