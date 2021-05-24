/*
ejemplo

const qy = require('../dataBase/mysqlConnect'); //importamos para crear queries

class libro {

    static lista() {
        const query = 'SELECT * FROM libro'
        const response = qy(query);
        return response //retorna la lista de libros
    }
}

module.exports = categoria;
*/
//crear: nueva, lista, detalles, actualizar, eliminar