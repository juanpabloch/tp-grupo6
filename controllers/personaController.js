const qy = require('../dataBase/mysqlConnect');


const {  libro, persona, categoria  } = require("../models");

const { validar } = require('../middleware');

const lista = async(req, res, next)=>{
    try {   
        const respuesta = await persona.lista();
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

const buscar = async(req,res,next)=>{
    try {
        const respuesta = await persona.busca_id(req.params.id);
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

const registro = async(req,res,next)=>{
    try{
        validar.validarPersona(req.body);
        let respuesta = await persona.existe(req.body.mail);
        if (respuesta.length > 0){
            throw new Error('La persona ya existe');
        }
        respuesta = await persona.guarda(req.body);
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
    lista, 
    registro, 
    buscar
}

