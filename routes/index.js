const express = require('express');
const router = express.Router();

//requerimos las rutas
const categoria = require('./rutaCategoria');
const persona = require('./rutaPersona');
const libro = require('./rutaLibro');

router.get('/', (req, res)=>{
    res.json({
        mensaje: 'Bienvenido'
    }).status(200);
})

router.use('/categoria', categoria);
router.use('/persona', persona);
router.use('/libro', libro);


module.exports = router;