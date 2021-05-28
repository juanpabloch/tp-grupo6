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

const Modelo = require('../models/categoriaModelo');

const categoria_lista = async(req, res, next)=>{
    try {   
        const respuesta = await Modelo.lista();
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

module.exports = {
    categoria_lista
}