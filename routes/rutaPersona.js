const express = require('express');
const router = express.Router();

//rutas a crear
// get('/') - get('/:id') - delete('/:id') - post('/') - put('/:id')

//importamos controlador
const {  librosCtrl  ,personasCtrl   ,categoriasCtrl   } = require("../controllers");

//importamos las validaciones
const { validar } = require('../middleware');

//rutas a crear
// get('/') - get('/:id') - delete('/:id') - post('/') - put('/:id')

router.get('/', personasCtrl.lista);
router.get("/:id",validar.params,personasCtrl.buscar);
router.post('/',validar.validarRegistro ,personasCtrl.registrar);



module.exports = router;