const express = require('express');
const router = express.Router();

//crear las rutas 
// get('/') - get('/:id') - delete('/:id') - post('/')


//importamos controlador
const {  librosCtrl  ,personasCtrl   ,categoriasCtrl   } = require("../controllers");
//importamos las validaciones
const validacion = require('../validaciones/validaciones');


router.get('/', categoriasCtrl.categoria_lista);

module.exports = router;