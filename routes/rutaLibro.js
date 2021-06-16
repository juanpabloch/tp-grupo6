const express = require("express");
const router = express.Router();

//importamos controlador
const {  librosCtrl, personasCtrl, categoriasCtrl   } = require("../controllers");

//importamos las validaciones
const { validar } = require('../middleware');

router.get('/', librosCtrl.lista);

router.post('/', validar.bodyLibroLong, librosCtrl.agregar);

router.put("/prestar/:id", validar.params, validar.bodyLibroShort, librosCtrl.prestar);

router.put("/devolver/:id", validar.params, librosCtrl.devolver);

router.put("/:id", validar.params,validar.bodyLibroLong, librosCtrl.cambiar_descripcion);

router.get('/:id', validar.params, librosCtrl.buscar);

router.delete("/:id", validar.params, librosCtrl.borrar);


module.exports = router;
