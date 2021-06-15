const express = require('express');
const router = express.Router();

//importamos controlador
const {  librosCtrl  ,personasCtrl   ,categoriasCtrl   } = require("../controllers");

//importamos las validaciones
const { validar } = require('../middleware');

router.get('/', personasCtrl.lista);

router.post('/', validar.validarRegistro, personasCtrl.registrar);

router.get("/:id", validar.params, personasCtrl.buscar);

 router.delete('/:id', personasCtrl.eliminar);

 router.put('/:id', validar.params, personasCtrl.modificar);

module.exports = router;
