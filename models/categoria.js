const qy = require("../database/mysqlConnect");

class Categoria {
  static async lista() {
    const query = "SELECT * FROM categoria";
    let respuesta = await qy(query);
    return respuesta.rows;
  }

  static async eliminar(id) {
    // const query = "DELETE FROM categoria WHERE categoria_id = ?";
    const query = "DELETE FROM categoria WHERE categoria_id=$1";
    let respuesta = await qy(query, [id]);
    return respuesta.rows;
  }

  static async buscarNombre(nombre) {
    // const query = "SELECT nombre FROM categoria WHERE nombre = ?";
    const query = "SELECT nombre FROM categoria WHERE nombre=$1";
    let respuesta = await qy(query, [nombre]);
    return respuesta.rows;
  }

  static async buscarCategoriaLibro(id) {
    // const query = "SELECT categoria_id FROM libro WHERE categoria_id = ?";
    const query = "SELECT categoria_id FROM libro WHERE categoria_id=$1";
    let respuesta = await qy(query, [id]);
    return respuesta.rows;
  }

  static async buscar(id) {
    // const query = "SELECT * FROM categoria WHERE categoria_id = ?";
    const query = "SELECT * FROM categoria WHERE categoria_id=$1";
    let respuesta = await qy(query, [id]);
    return respuesta.rows;
  }

  static async agregar(categoria) {
    const query = "INSERT INTO categoria(nombre) VALUES($1) RETURNING categoria_id";
    let respuesta = await qy(query, [categoria]);
    return respuesta.rows;
  }
}
// syntax error at or near \"VALUE\""
module.exports = Categoria;
