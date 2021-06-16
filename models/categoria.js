const qy = require("../dataBase/mysqlConnect");

class Categoria {
  static async lista() {
    const query = "SELECT * FROM categoria";
    let respuesta = await qy(query);
    return respuesta;
  }

  static async eliminar(id) {
    const query = "DELETE FROM categoria WHERE categoria_id = ?";
    let respuesta = await qy(query, [id]);
    return respuesta;
  }

  static buscarNombre(nombre) {
    const query = "SELECT nombre FROM categoria WHERE nombre = ?";
    let respuesta = qy(query, [nombre]);
    return respuesta;
  }

  static async buscarCategoriaLibro(id) {
    const query = "SELECT categoria_id FROM libro WHERE categoria_id = ?";
    let respuesta = await qy(query, [id]);
    return respuesta;
  }

  static async buscar(id) {
    const query = "SELECT * FROM categoria WHERE categoria_id = ?";
    let respuesta = await qy(query, [id]);
    return respuesta;
  }

  static async agregar(categoria) {
    const query = "INSERT INTO categoria (nombre) VALUE (?)";
    let respuesta = await qy(query, [categoria]);
    return respuesta;
  }
}

module.exports = Categoria;
