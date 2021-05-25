const qy = require('../dataBase/mysqlConnect');

class Libro{

    static estado(id){
        const query = 'SELECT persona_id FROM libro WHERE persona_id IS  NULL AND libro_id=?';
        const respuesta = qy(query,[id]);
        return respuesta
    }
    static existe(id){
        const query = 'SELECT * FROM libro WHERE libro_id =?';
        const respuesta = qy(query,[id]);
        return respuesta
    }
    static eliminar(id){
        const query = 'DELETE FROM libro WHERE libro_id=?';
        const respuesta = qy(query,[id]);
        return respuesta
    }
    static devolver(id){
        const query = 'UPDATE libro SET persona_id = NULL WHERE libro_id = ?';
        const respuesta = qy(query,[id]);
        return respuesta
    }
}

module.exports = Libro;
