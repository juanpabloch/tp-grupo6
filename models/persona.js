const qy = require("../database/mysqlConnect");

class Persona {
  static async lista() {
    const query = "SELECT * FROM persona";
    let respuesta = await qy(query);
    return respuesta.rows;
  }

  static async buscarEmail(mail) {
    // const query = "SELECT * FROM persona WHERE email = ?";
    const query = "SELECT * FROM persona WHERE email = $1";
    let respuesta = await qy(query, [mail]);
    return respuesta.rows;
  }

  static async agregar(nombre, apellido, alias, email) {
    const query =
      // "INSERT INTO persona (nombre, apellido, alias, email) VALUE (?, ?, ?, ?)";
      "INSERT INTO persona(nombre, apellido, alias, email) VALUES($1, $2, $3, $4) RETURNING persona_id";
    let respuesta = await qy(query, [nombre, apellido, alias, email]);
    return respuesta.rows;
  }

  static async buscar(id) {
    // const query = "SELECT * FROM persona WHERE persona_id = ?";
    const query = "SELECT * FROM persona WHERE persona_id = $1";
    let respuesta = await qy(query, [id]);
    return respuesta.rows;
  }

  static async eliminar(id) {
    // const query = "DELETE FROM persona WHERE persona_id = ?";
    const query = "DELETE FROM persona WHERE persona_id = $1";
    let respuesta = await qy(query, [id]);
    return respuesta.rows;
  }

  static async buscarPersonaEnLibro(id) {
    // const query = "SELECT persona_id FROM libro where persona_id = ?";
    const query = "SELECT persona_id FROM libro where persona_id = $1";
    let respuesta = await qy(query, [id]);
    return respuesta.rows;
  }

  static async verificar(email, id) {
    // const query = "SELECT * FROM persona WHERE persona_id = ? AND email = ?";
    const query = "SELECT * FROM persona WHERE persona_id = $1 AND email = $2";
    let respuesta = await qy(query, [id, email]);
    return respuesta.rows;
  }

  static async modificar(nombre, apellido, alias, id) {
    const query =
      // "UPDATE persona SET nombre = ?, apellido = ?,alias  = ? WHERE persona_id = ?";
      "UPDATE persona SET nombre=$1, apellido=$2, alias=$3 WHERE persona_id=$4";
    let respuesta = await qy(query, [nombre, apellido, alias, id]);
    return respuesta.rows;
  }
}

module.exports = Persona;
