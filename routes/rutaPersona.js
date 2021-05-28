const express = require('express');
const router = express.Router();

//rutas a crear
// get('/') - get('/:id') - delete('/:id') - post('/') - put('/:id')

//importamos controlador
const controlador = require('../controllers/personaController');

//importamos las validaciones
const validacion = require('../validaciones/validaciones');


module.exports = router;