const qy = require("../dataBase/mysqlConnect");

class Persona {
  static async lista() {
    const query = "SELECT * FROM persona";
    let respuesta = await qy(query);
    return respuesta;
  }

  static async buscarEmail(mail) {
    const query = "SELECT * FROM persona WHERE email = ?";
    let respuesta = await qy(query, [mail]);
    return respuesta;
  }

  static async agregar(nombre, apellido, alias, email) {
    const query =
      "INSERT INTO persona (nombre, apellido, alias, email) VALUE (?, ?, ?, ?)";
    let respuesta = await qy(query, [nombre, apellido, alias, email]);
    return respuesta;
  }

  static async buscar(id) {
    const query = "SELECT * FROM persona WHERE persona_id = ?";
    let respuesta = await qy(query, [id]);
    return respuesta;
  }

  static async eliminar(id) {
    const query = "DELETE FROM persona WHERE persona_id = ?";
    let respuesta = await qy(query, [id]);
    return respuesta;
  }

  static async buscarPersonaEnLibro(id) {
    const query = "SELECT persona_id FROM libro where persona_id = ?";
    let respuesta = await qy(query, [id]);
    return respuesta;
  }

  static async verificar(email, id) {
    const query = "SELECT * FROM persona WHERE persona_id = ? AND email = ?";
    let respuesta = await qy(query, [id, email]);
    return respuesta;
  }

  static async modificar(nombre, apellido, alias, id) {
    const query =
      "UPDATE persona SET nombre = ?, apellido = ?,alias  = ? WHERE persona_id = ?";
    let respuesta = await qy(query, [nombre, apellido, alias, id]);
    return respuesta;
  }
}

module.exports = Persona;
