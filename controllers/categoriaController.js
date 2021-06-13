// ejemplo

// //importamos base de datos para poder hacer los query
// const qy = require('../dataBase/mysqlConnect');

//creamos el controlador este puede ser para la ruta get('/')
// const categoria_lista = async(req, res, next)=>{
//     try {
        
//         aca colocamos toda la logica para llamar los datos de la base de datos

//     } catch (err) {
        
//         capturamos los errores y los mostramos en pantalla {error: error que capturamos}

//     }
// }

const {  libro, persona, categoria  } = require("../models");

const lista = async(req, res, next)=>{
    try {   
        const respuesta = await categoria.lista();
        if(respuesta.length === 0)throw new Error('no hay categorias para mostrar');
        res.status(200).json(respuesta);
    } catch (err) {
        next(err);
    }
}

const detalles = async(req, res, next)=> {
    try {
        const respuesta = await  categoria.detalles();
        if(respuesta.length === 0)throw new Error('categoria no encontrada');
        res.status(200).json(respuesta);
    }
    catch (err) {
        if(err.code === undefined){
            res.status(413).json({
                error: err.message
            })
        }else{
            next(err);
        }
}
}

const nueva = async (req, res, next)=> {
    try{
        
        const respuesta = await categoria.nueva();
        
        if (respuesta.length > 0) {
            throw new Error ('Ese nombre de categoria ya existe')
        }

        query = 'INSERT INTO categoria (nombre) value (?)'

        respuesta = await qy(query, [nombre]);
        
        res.send({'respuesta': respuesta.insertId});

        
        res.status(200).json(respuesta );

    }

    catch (err) {
        if(err.code === undefined){
            res.status(413).json({
                error: err.message
            })
        }else{
            next(err);
        }
    
}
}

const eliminar = async(req, res, next)=>{
    try {
        const { id } = req.params;
        let query = 'SELECT nombre FROM categoria WHERE categoria_id = ?';
        let respuesta = await qy(query, [id]);
        if(respuesta.length === 0)throw new Error('no existe la categoria indicada');

        
        respuesta = await categoria.buscarCategoriaLibro(id);
        if(respuesta.length > 0)throw new Error('categoria con libros asociados, no se puede eliminar') 

        respuesta = await categoria.eliminar(id);

        res.status(200).json({
            mensaje: 'se borro correctamente'
        });

    } catch (err) {
        next(err);
    }
}

module.exports = {
    lista,
    eliminar,
    detalles,
    nueva
};
