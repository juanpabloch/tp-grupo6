const express = require("express");
const router = express.Router();

//crear rutas
//get('/') - get('/:id') - delete('/:id') - post('/') - put('/:id') - put('/prestar/:id') - put('/devolver/:id')

//importamos controlador
const controlador = require("../controllers/libroController");

router.get("/", (req, res) => {
  res.send("Bienvenidos al Home").status(200);
});

router.delete("/:id", controlador.libro_borrar);
router.put("/devolver/:id", controlador.libro_devolver);
router.put("/:id", controlador.libro_descripcion);
module.exports = router;
