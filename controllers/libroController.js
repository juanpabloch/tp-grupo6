const Modulo = require('../models/libroModulo');

const libro_borrar = async(req, res, next)=>{
    try {   
        console.log(req.query.id);
        const exitenciaLibro = await Modulo.exite(req.params.id);
        if(exitenciaLibro.length === 0)throw new Error('no se encuentra ese libro');
        const estadoLibro = await Modulo.estado(req.params.id);
        if(estadoLibro.length === 0)throw new Error('ese libro esta prestado no se puede borrar');
        const borrarLibro = await Modulo.delete(req.params.id);
        res.status(200).json('Se borro perfectamente el libro');
    } catch (err) {
        if(err.code === undefined){
            res.status(413).json({
                error: err.message
            })
        }else{
            next(err);
        }
    }
}

module.exports = {
    libro_borrar
}