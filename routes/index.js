const express = require('express');
const router = express.Router();

const categoriaRouter = require('./rutaCategoria');
const personaRouter = require('./rutaPersona');
const libroRouter = require('./rutaLibro');

router.get('/', (req, res)=>{
    res.json({
        mensaje: 'Bienvenido'
    }).status(200);
})

router.use('/categoria', categoriaRouter);
router.use('/persona', personaRouter);
router.use('/libro', libroRouter);


module.exports = router;
