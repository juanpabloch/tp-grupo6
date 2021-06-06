const express = require("express");
const router = express.Router();

//crear rutas
//get('/') - get('/:id') - delete('/:id') - post('/') - put('/:id') - put('/prestar/:id') - put('/devolver/:id')

//importamos controlador
const {  libroControl ,personaControl  ,categoriaControl   } = require("../controllers");

//importamos las validaciones
const validacion = require('../validaciones/validaciones');


router.get("/", (req, res) => {
  res.send("Bienvenidos al Home").status(200);
});

router.delete("/:id", libroControl.borrar);
router.put("/devolver/:id", libroControl.devolver);
router.put("/:id", libroControl.cambiar_descripcion);

module.exports = router;
