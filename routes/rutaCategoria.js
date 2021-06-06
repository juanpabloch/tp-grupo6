const express = require('express');
const router = express.Router();

//crear las rutas 
// get('/') - get('/:id') - delete('/:id') - post('/')


//importamos controlador
const {  libroControl ,personaControl  ,categoriaControl   } = require("../controllers");
//importamos las validaciones
const validacion = require('../validaciones/validaciones');


router.get('/', categoriaControl.categoria_lista);

module.exports = router;