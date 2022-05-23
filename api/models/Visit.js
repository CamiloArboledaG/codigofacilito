const mongoose = require("mongoose");
const monogoosePaginate = require("mongoose-paginate");

//Enums son valores predefinidos para un campo.
//Permite delimitar los valores que puede tomar un campo.

const REACTIONS = ["like", "love", "dislike", "haha", "sad", "angry"];

let visitSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  _place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
    required: true,
  },
  reaction: {
    type: String,
    //arreglo con los valores que son validos para el campo, si no esta en el arreglo no se guarda
    enum: REACTIONS,
    //default: "like",
  },
  observation: String,
});

visitSchema.plugin(monogoosePaginate);

const Visit = mongoose.model("Visit", visitSchema);

module.exports = Visit;
