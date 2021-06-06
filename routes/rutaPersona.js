const express = require('express');
const router = express.Router();

//rutas a crear
// get('/') - get('/:id') - delete('/:id') - post('/') - put('/:id')

//importamos controlador
const {  libroControl ,personaControl  ,categoriaControl   } = require("../controllers");

//importamos las validaciones
const validacion = require('../validaciones/validaciones');

//rutas a crear
// get('/') - get('/:id') - delete('/:id') - post('/') - put('/:id')

router.get('/', personaControl.persona_lista);
router.get("/:id",personaControl.persona_buscar);
router.post('/',personaControl.persona_registro);



module.exports = router;