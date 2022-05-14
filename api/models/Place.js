const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Uploader = require("../models/Uploader");
const slugify = require("../plugins/slugify");

let placeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  address: String,
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
  return Uploader(path).then((secure_url) =>
    this.saveImageUrl(secure_url, imageType)
  );
};

placeSchema.methods.saveImageUrl = function (secure_url, imageType) {
  this[imageType + "Image"] = secure_url;
  return this.save();
};

//hooks mongoose, ciclos que guarda un documento. Despues de que se guarde o antes, ejecuta una funcion
/* It's a hook that is called before the document is saved. It generates a slug for the document. */
placeSchema.pre("save", function (next) {
  if (this.slug) {
    return next();
  }
  genetaresSlugAndContinue.call(this, 0, next);
});

/* It's a static method that checks if the slug is unique. */
placeSchema.statics.validateSlugCount = function (slug) {
  return Place.count({ slug: slug }).then((count) => {
    if (count > 0) return false;
    return true;
  });
};

//Paginación para que no nos de todos los datos de una, sino que este por pagina
placeSchema.plugin(mongoosePaginate);

/**
 * It takes a title, slugifies it, checks if the slug is unique, if it's not, it adds a number to the
 * end of the slug and checks again.
 * @param count - The number of times the slug has been generated.
 * @param next - The next func
 * tion to be called after the slug is generated.
 */
function genetaresSlugAndContinue(count, next) {
  this.slug = slugify(this.title);
  if (count != 0) {
    this.slug = this.slug + "-" + count;
  }

  Place.validateSlugCount(this.slug).then((isValid) => {
    if (!isValid) {
      return genetaresSlugAndContinue.call(this, count + 1, next);
    }
    next();
  });
}

let Place = mongoose.model("Place", placeSchema);
module.exports = Place;
