const qy = require("../dataBase/mysqlConnect");

class Libro {

  static async estado(id) {
    const query =
      "SELECT persona_id FROM libro WHERE persona_id IS  NULL AND libro_id = ?";
    let respuesta = await qy(query, [id]);
    return respuesta;
  };

  static async buscar(id) {
    const query = "SELECT * FROM libro WHERE libro_id = ?";
    let respuesta = await qy(query, [id]);
    return respuesta;
  };

  static  async eliminar(id) {
    const query = "DELETE FROM libro WHERE libro_id=?";
    let respuesta = await qy(query, [id]);
    return respuesta;
  };

  static async devolver(id) {
    const query = "UPDATE libro SET persona_id = NULL WHERE libro_id = ?";
    let respuesta = await qy(query, [id]);
    return respuesta;
  };

  static async verificar(nombre, persona, categoria, id) {
    if (persona === null) {
      let query =
        "SELECT * FROM libro WHERE nombre = ?   AND persona_id  IS NULL  AND categoria_id  = ? AND libro_id  = ?  ";
      let respuesta = await qy(query, [nombre, categoria, id]);
      return respuesta;
    } else {
      const query =
        "SELECT * FROM libro WHERE nombre = ?   AND persona_id  = ?  AND categoria_id  = ? AND libro_id  = ?  ";
      let respuesta = await qy(query, [nombre, persona, categoria, id]);
      return respuesta;
    }
  };

  static async modificar(nombre, descripcion, persona, categoria, id) {
    const query =
      "UPDATE libro SET nombre = ?, descripcion = ?,persona_id  = ?, categoria_id = ? WHERE libro_id = ?";
    let respuesta = await qy(query, [nombre, descripcion, persona, categoria, id]);
    return respuesta;
  };

  static async agregar(nombre, descripcion, categoria_id, persona_id){
    const query = 'INSERT INTO libro(nombre, descripcion, categoria_id, persona_id) VALUES(?, ?, ?, ?)';
    const respuesta = await qy(query, [ nombre, descripcion, categoria_id, persona_id ]);
    return respuesta;
  };

  static async existeNombre(nombre){
      let query = 'SELECT nombre FROM libro WHERE nombre = ?'
      let respuesta = await qy(query, [nombre])
      return respuesta
  };

}

module.exports = Libro;
