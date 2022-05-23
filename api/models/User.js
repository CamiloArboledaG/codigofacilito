const mongoose = require("mongoose");
const mongooseBcrypt = require("mongoose-bcrypt");
const FavoritePlace = require("./FavoritePlace");
const Place = require("./Place");

let userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, //Esto no es una validación es un index para hacer busquedas
  },
  name: String,
  admin: {
    type: Boolean,
    default: false,
  },
});
// quien va a ser el primer administrador
userSchema.post("save", function (user, next) {
  /* Checking if the user is the first user in the
database. If it is, it will make the user an admin. */

  // cuando exista el primer admin, se recomienda que el siguiente que asigne como admin elimine del admin al primero
  User.count({}).then((count) => {
    if (count === 1) {
      User.update({ _id: user._id }, { admin: true }).then((result) => {
        next();
      });
    } else {
      next();
    }
  });
});

//usaremos un virtual para conocer todos los lugares creados por el usuario.
userSchema.virtual("places").get(function () {
  return Place.find({ user: this._id });
});

userSchema.virtual("favorites").get(function () {
  return FavoritePlace.find({ "_user": this._id }, { "_place": true }).then(
    (favorites) => {
      let placesIds = favorites.map((favorite) => favorite._place);
      return Place.find({ _id: { $in: placesIds } });
    }
  );
});
//Instalamos mongoose-bcrypt para encriptar las contraseñas
userSchema.plugin(mongooseBcrypt);

const User = mongoose.model("User", userSchema);
module.exports = User;
