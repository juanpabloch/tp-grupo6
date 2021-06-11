const qy = require("../dataBase/mysqlConnect");

class Persona {

  static async lista() {
    const query = "SELECT * FROM persona";
    const respuesta = await qy(query);
    return respuesta;
  }

  static async buscarEmail(mail) {
    const query = "SELECT * FROM persona WHERE email = ?";
    const respuesta = await qy(query, [mail]);
    return respuesta;
  }

  static async agregar(persona) {
    const query =
      "INSERT INTO persona (nombre, apellido, alias, email) VALUE (?, ?, ?, ?)";
    const respuesta = await qy(query, [
      persona.nombre,
      persona.apellido,
      persona.alias,
      persona.email,
    ]);
    return respuesta;
  }

  static async buscar(id) {
    const query = "SELECT * FROM persona WHERE persona_id = ?";
    const respuesta = await qy(query, [id]);
    return respuesta;
  }

}

module.exports = Persona;
