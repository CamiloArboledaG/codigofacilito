const express = require("express");
//Objeto json que puede manejar peticiones por http
let TasksController = require("../controllers/tasks");

let router = express.Router();

router.route("/tasks").get(TasksController.index).post(TasksController.create);

router.get("/tasks/new", TasksController.new);

//la siguiente ruta va en esta posición para no afectar a tasks/new y no lo tome como una ruta diferente

//plural wildcards, comodín, todo lo que recibamos será manejado por esas funciones
router
    .route("/tasks/:id")
    .get(TasksController.show)
    .put(TasksController.update);

module.exports = router;