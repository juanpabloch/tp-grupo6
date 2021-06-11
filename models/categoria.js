/*
ejemplo

const qy = require('../dataBase/mysqlConnect'); //importamos para crear queries

class categoria {

    static lista() {
        const query = 'SELECT * FROM generos'
        const response = qy(query);
        return response //retorna la lista de categorias
    }
}

module.exports = categoria;
*/
//crear: lista, detalles, eliminar, nueva

//Buscar
//Eliminar
//Modificar
//Agregar
//Verificar



const qy = require('../dataBase/mysqlConnect');

class Categoria{

    static async lista(){
        const query = 'SELECT * FROM categoria';
        const respuesta = await qy(query);
        return respuesta
    }

    static async eliminar(id){
        const query = 'DELETE FROM categoria WHERE categoria_id = ?';
        const respuesta = await qy(query, [id]);
        return respuesta
    };

    static async buscarCategoriaLibro(id){
        const query = 'SELECT categoria_id FROM libro WHERE categoria_id = ?';
        const respuesta = await qy(query, [id]);
        return respuesta
    }

    static async buscar(id){
        const query = "SELECT * FROM categoria WHERE categoria_id = ?";
        const respuesta = await qy(query, [id]);
        return respuesta
    }

}

module.exports = Categoria
