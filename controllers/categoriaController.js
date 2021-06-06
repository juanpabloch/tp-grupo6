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

        
        respuesta = await categoria.categoriaLibro(id);
        if(respuesta.length > 0)throw new Error('categoria con libros asociados, no se puede eliminar') 

        respuesta = await categoria.eliminar(id);

        res.status(200).json({
            mensaje: 'se borro correctamente'
        });

    } catch (err) {
        if(err.code === undefined){
            res.status(413).json({
                error: err.message
            })
        }else{
            next(err)
        }
    }
}

module.exports = {
    lista,
    eliminar
}