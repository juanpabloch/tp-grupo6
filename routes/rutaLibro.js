const express = require('express');
const router = express.Router();

//crear rutas
//get('/') - get('/:id') - delete('/:id') - post('/') - put('/:id') - put('/prestar/:id') - put('/devolver/:id')


//importamos controlador
const controlador = require('../controllers/libroController')

router.get('/',(req,res)=>{
    res.send('Bienvenidos al Home');
 });

 router.delete("/:id",controlador.libro_borrar);

module.exports = router;