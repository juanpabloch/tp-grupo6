const express = require('express');
const router = express.Router();

//crear las rutas 
// get('/') - get('/:id') - delete('/:id') - post('/')


//importamos controlador
const {  librosControl ,personasControl  ,categoriasControl   } = require("../controllers");
//importamos las validaciones
const validacion = require('../validaciones/validaciones');


router.get('/', categoriasControl.categoria_lista);

module.exports = router;