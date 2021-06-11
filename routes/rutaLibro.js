const express = require("express");
const router = express.Router();

//crear rutas
//get('/') - get('/:id') - delete('/:id') - post('/') - put('/:id') - put('/prestar/:id') - put('/devolver/:id')

//importamos controlador
const {  librosCtrl, personasCtrl, categoriasCtrl   } = require("../controllers");

//importamos las validaciones
const { validar } = require('../middleware');

router.get('/', librosCtrl.todos);

router.post('/', validar.bodyLibro, librosCtrl.agregar);

router.put("/prestar/:id", validar.params, validar.personaok, librosCtrl.prestar);

router.put("/devolver/:id", validar.params, librosCtrl.devolver);

router.put("/:id", validar.params,validar.bodyLibro, librosCtrl.cambiar_descripcion);

router.get('/:id', validar.params, librosCtrl.detalle);

router.delete("/:id", validar.params, librosCtrl.borrar);


module.exports = router;
