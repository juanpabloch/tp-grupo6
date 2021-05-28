const express = require('express');
const router = express.Router();

//crear las rutas 
// get('/') - get('/:id') - delete('/:id') - post('/')


//importamos controlador
const controlador = require('../controllers/categoriaController')
//importamos las validaciones
const validacion = require('../validaciones/validaciones');


router.get('/', controlador.categoria_lista);

module.exports = router;