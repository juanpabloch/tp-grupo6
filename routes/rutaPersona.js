const express = require('express');
const router = express.Router();

//rutas a crear
// get('/') - get('/:id') - delete('/:id') - post('/') - put('/:id')

//importamos controlador
const controlador = require('../controllers/personaController');

//importamos las validaciones
const validacion = require('../validaciones/validaciones');

//rutas a crear
// get('/') - get('/:id') - delete('/:id') - post('/') - put('/:id')

router.get('/', controlador.persona_lista);
router.get("/:id",controlador.persona_buscar);
router.post('/',controlador.persona_registro);



module.exports = router;