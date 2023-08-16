const qy = require("../database/mysqlConnect");

class Categoria {
  static async lista() {
    const query = "SELECT * FROM categoria";
    let respuesta = await qy(query);
    return respuesta;
  }

  static async eliminar(id) {
    // const query = "DELETE FROM categoria WHERE categoria_id = ?";
    const query = "DELETE FROM categoria WHERE categoria_id=$1";
    let respuesta = await qy(query, [id]);
    return respuesta;
  }

  static buscarNombre(nombre) {
    // const query = "SELECT nombre FROM categoria WHERE nombre = ?";
    const query = "SELECT nombre FROM categoria WHERE nombre=$1";
    let respuesta = qy(query, [nombre]);
    return respuesta;
  }

  static async buscarCategoriaLibro(id) {
    // const query = "SELECT categoria_id FROM libro WHERE categoria_id = ?";
    const query = "SELECT categoria_id FROM libro WHERE categoria_id=$1";
    let respuesta = await qy(query, [id]);
    return respuesta;
  }

  static async buscar(id) {
    // const query = "SELECT * FROM categoria WHERE categoria_id = ?";
    const query = "SELECT * FROM categoria WHERE categoria_id=$1";
    let respuesta = await qy(query, [id]);
    return respuesta;
  }

  static async agregar(categoria) {
    const query = "INSERT INTO categoria(nombre) VALUES($1)";
    let respuesta = await qy(query, [categoria]);
    return respuesta;
  }
}
// syntax error at or near \"VALUE\""
module.exports = Categoria;
