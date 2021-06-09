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

const qy = require('../dataBase/mysqlConnect');

class Categoria{

    static lista(){
        const query = 'SELECT * FROM categoria';
        const respuesta = qy(query);
        return respuesta
    }

    static eliminar(id){
        const query = 'DELETE FROM categoria WHERE categoria_id = ?';
        const respuesta = qy(query, [id]);
        return respuesta
    };

    static categoriaLibro(id){
        const query = 'SELECT categoria_id FROM libro WHERE categoria_id = ?';
        const respuesta = qy(query, [id]);
        return respuesta
    }

}

module.exports = Categoria
