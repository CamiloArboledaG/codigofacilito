const express = require("express");
const sqlite3 = require("sqlite3");
const bodyParser = require("body-parser");
//SequelizeJS ORM para SQLite y node
const Sequelize = require("sequelize");

const app = express();

const tasksRoutes = require("./routes/tasks_routes");

//Está comentado por lo que vamos a usar subrutas
//const tasks = require("./controllers/tasks");

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "pug");


//Esto es como si fuera un middleware
app.use(tasksRoutes);

//Está comentado por lo que vamos a usar subrutas
//app.get("/tasks", tasks.home);

// let db = new sqlite3.Database("proyecto-backend");

{
    /**
                  const sequelize = new Sequelize("proyecto-backend", null, null, {
                      dialect: "sqlite",
                      storage: "./proyecto-backend",
                  });
                   */
}

{
    /**
     * db.run("CREATE TABLE tasks(id int AUTO_INCREMENT, description varchar(255))");
     */
}

//Está comentado por lo que vamos a usar subrutas
{
    /** 
//Para no permitir una inyección en sql debemos hacer un sanetize, para evitar ataques

app.post("/pendientes", function(req, res) {
    // Si lo dejamos así estamos abiertos a ataques
    // db.run(`INSERT INTO tasks(description) VALUES('${req.body.description}')`);
    // Con el siguiente codigo si hacemos una limpieza, haciendo un argumento por cada ?
    // siempre investigar como hacer limpieza de inyección a la base de datos

    //No usamos db run por el driver
    //db.run(`INSERT INTO tasks(description) VALUES(?)`, req.body.description);
    res.send("Insercción finalizada");
});
*/
}
app.listen(3000);

//Ya no me tengo que desconectar de la base de datos gracias al driver.
{
    /** 
                  //cada que ejecutemos nuestro programa, se ejecuta un nuevo proceso, este se encarga del control del codigo
                  //es
                  process.on("SIGINT", function() {
                      console.log("Adios <3");
                      db.close();
                      process.exit();
                  });

                  */
}