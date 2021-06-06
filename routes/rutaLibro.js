const express = require("express");
const router = express.Router();

//crear rutas
//get('/') - get('/:id') - delete('/:id') - post('/') - put('/:id') - put('/prestar/:id') - put('/devolver/:id')

//importamos controlador
const {  librosCtrl  ,personasCtrl   ,categoriasCtrl   } = require("../controllers");

//importamos las validaciones
const validacion = require('../validaciones/validaciones');


router.get("/", (req, res) => {
  res.send("Bienvenidos al Home").status(200);
});

router.delete("/:id", librosCtrl.borrar);
router.put("/devolver/:id", librosCtrl.devolver);
router.put("/:id", librosCtrl.cambiar_descripcion);

module.exports = router;
