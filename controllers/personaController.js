const qy = require('../dataBase/mysqlConnect');

const Modulo = require('../models/personaModulo');

const validacion = require('../validaciones/validaciones');

const persona_lista = async(req, res, next)=>{
    try {   
        const respuesta = await Modulo.lista();
        if(respuesta.length === 0)throw new Error('no hay personas para mostrar');
        res.status(200).json(respuesta);
        
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

const persona_buscar = async(req,res,next)=>{
    try {
        const respuesta = await Modulo.busca_id(req.params.id);
        res.status(200).json(respuesta);
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

const persona_registro = async(req,res,next)=>{
    try{
        validaciones.validarPersona(req.body);

        let respuesta = await Modulo.existe(req.body);
        if (respuesta.length > 0){
            throw new Error('La persona ya existe');
        }
        respuesta = await Modulo.guarda(req.body);
        console.log(respuesta);
        res.status(200).json(respuesta); 
        
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
    persona_lista, persona_registro, persona_buscar
}

