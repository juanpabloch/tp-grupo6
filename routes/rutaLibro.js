const express = require("express");
const router = express.Router();

//crear rutas
//get('/') - get('/:id') - delete('/:id') - post('/') - put('/:id') - put('/prestar/:id') - put('/devolver/:id')

//importamos controlador
const {  librosCtrl  ,personasCtrl   ,categoriasCtrl   } = require("../controllers");

//importamos las validaciones
const { validar } = require('../middleware');



router.post('/', validar.agregarLibro, librosCtrl.agregar);

router.put("/devolver/:id", validar.idCorrecto, librosCtrl.devolver);

router.put("/:id", validar.idCorrecto,validar.agregarLibro, librosCtrl.cambiar_descripcion);

router.get('/:id', validar.idCorrecto, librosCtrl.detalle);

router.delete("/:id", validar.idCorrecto, librosCtrl.borrar);


module.exports = router;
