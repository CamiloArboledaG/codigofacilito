const mongoose = require("mongoose");
const mongooseBcrypt = require("mongoose-bcrypt");

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

//Instalamos mongoose-bcrypt para encriptar las contraseñas
userSchema.plugin(mongooseBcrypt);

const User = mongoose.model("User", userSchema);
module.exports = User;
