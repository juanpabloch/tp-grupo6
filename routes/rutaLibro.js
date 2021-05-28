const express = require('express');
const router = express.Router();

//crear rutas
//get('/') - get('/:id') - delete('/:id') - post('/') - put('/:id') - put('/prestar/:id') - put('/devolver/:id')


//importamos controlador
const controlador = require('../controllers/libroController');

//importamos las validaciones
const validacion = require('../validaciones/validaciones');


router.get('/',(req,res)=>{
    res.send('Bienvenidos al Home');
 });

 router.delete("/:id",controlador.libro_borrar);
 router.put("/:id",controlador.libro_devolver);
module.exports = router;