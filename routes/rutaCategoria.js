const express = require("express");
const router = express.Router();

//importamos controlador
const { librosCtrl, personasCtrl, categoriasCtrl } = require("../controllers");
//importamos las validaciones
const { validar } = require("../middleware");

router.get("/", categoriasCtrl.lista);

router.post("/", validar.bodyCategoria, categoriasCtrl.agregar);

router.get("/:id", validar.params, categoriasCtrl.buscar);

router.delete("/:id", validar.params, categoriasCtrl.eliminar);

module.exports = router;
