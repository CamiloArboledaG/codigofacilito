const mongoose = require("mongoose");

const uri =
  "mongodb+srv://domicilio:root@cluster0.aj7ot.mongodb.net/curso_cf?retryWrites=true&w=majority";

module.exports = {
  connect: () => mongoose.connect(uri),
  dbName: "curso_cf",
  connection: () => {
    if (mongoose.connection) return mongoose.connection;
    return this.connect();
  },
};
