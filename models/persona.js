const qy = require('../dataBase/mysqlConnect');

class Persona{

    static lista(){
        const query = 'SELECT * FROM persona';
        const respuesta = qy(query);
        return respuesta
    }

    static existe(pers){
        const query = 'SELECT * FROM persona WHERE nombre = ? AND apellido = ? AND alias = ? AND email = ?';
        const respuesta = qy(query, [pers.nombre, pers.apellido, pers.alias, pers.email]);
        return respuesta
    }

    static guarda(pers){
        const query = 'INSERT INTO persona (nombre, apellido, alias, email) VALUE (?, ?, ?, ?)';
        const respuesta = qy(query, [pers.nombre, pers.apellido, pers.alias, pers.email]);
        return respuesta
    }

    static busca_id(id){
        const query = 'SELECT * FROM persona WHERE persona_id = ?';
        const respuesta = qy(query, [id]);
        return respuesta
    }

}

module.exports = Persona
