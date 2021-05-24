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

}

module.exports = Categoria