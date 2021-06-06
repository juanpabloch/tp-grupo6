const express = require('express');
const router = express.Router();

//crear las rutas 
// get('/') - get('/:id') - delete('/:id') - post('/')


//importamos controlador
const {  librosCtrl  ,personasCtrl   ,categoriasCtrl   } = require("../controllers");
//importamos las validaciones
 const { validar } = require('../middleware');


router.get('/', categoriasCtrl.lista);
router.delete('/:id', validar.idCorrecto ,categoriasCtrl.eliminar);

module.exports = router;