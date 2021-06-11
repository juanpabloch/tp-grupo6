const qy = require('../dataBase/mysqlConnect');

const {  libro, persona, categoria  } = require("../models");

const { validar } = require('../middleware');

const lista = async(req, res, next)=>{
    try {   
        const respuesta = await persona.lista();
        if(respuesta.length === 0)throw new Error('no hay personas para mostrar');
        res.status(200).json(respuesta);
        
    } catch (err) {
        next(err);
    }
}

const buscar = async(req, res, next)=>{
    try {
        const respuesta = await persona.buscar(req.params.id);
        res.status(200).json(respuesta);
    } catch (err) {
        next(err);
    }
}

const registrar = async(req ,res ,next)=>{
    try{
        validar.validarPersona(req.body);

        let respuesta = await persona.buscarEmail(req.body.email);
        if (respuesta.length > 0){
            throw new Error('La persona ya existe');
        }
        
        respuesta = await persona.agregar(req.body);
        res.status(200).json(respuesta); 
        
    } catch (err) {
        next(err);
    }
}


module.exports = {
    lista, 
    registrar, 
    buscar
}

