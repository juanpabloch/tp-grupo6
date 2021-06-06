const express = require('express');
const router = express.Router();

//rutas a crear
// get('/') - get('/:id') - delete('/:id') - post('/') - put('/:id')

//importamos controlador
const {  librosControl ,personasControl  ,categoriasControl   } = require("../controllers");

//importamos las validaciones
const validacion = require('../validaciones/validaciones');

//rutas a crear
// get('/') - get('/:id') - delete('/:id') - post('/') - put('/:id')

router.get('/', personasControl.persona_lista);
router.get("/:id",personasControl.persona_buscar);
router.post('/',personasControl.persona_registro);



module.exports = router;