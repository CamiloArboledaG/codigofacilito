const mongoose = require("mongoose");
const mongooseBcrypt = require("mongoose-bcrypt");

let userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true //Esto no es una validación es un index para hacer busquedas
    },
    name: String,
    admin: {
        type: Boolean,
        default: false
    }
});

//Instalamos mongoose-bcrypt para encriptar las contraseñas
userSchema.plugin(mongooseBcrypt);


const User  = mongoose.model("User", userSchema);
module.exports = User;