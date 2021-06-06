const qy = require("../dataBase/mysqlConnect");

class Libro {

  static estado(id) {
    const query =
      "SELECT persona_id FROM libro WHERE persona_id IS  NULL AND libro_id = ?";
    let respuesta = qy(query, [id]);
    return respuesta;
  };

  static existe(id) {
    const query = "SELECT * FROM libro WHERE libro_id = ?";
    let respuesta = qy(query, [id]);
    return respuesta;
  };

  static eliminar(id) {
    const query = "DELETE FROM `libro` WHERE libro_id=?";
    let respuesta = qy(query, [id]);
    return respuesta;
  };

  static devolver(id) {
    const query = "UPDATE libro SET persona_id = NULL WHERE libro_id = ?";
    let respuesta = qy(query, [id]);
    return respuesta;
  };

  static verificar(nombre, persona, categoria, id) {
    if (persona === null) {
      let query =
        "SELECT * FROM libro WHERE nombre = ?   AND persona_id  IS NULL  AND categoria_id  = ? AND libro_id  = ?  ";
      let respuesta = qy(query, [nombre, categoria, id]);
      return respuesta;
    } else {
      const query =
        "SELECT * FROM libro WHERE nombre = ?   AND persona_id  = ?  AND categoria_id  = ? AND libro_id  = ?  ";
      let respuesta = qy(query, [nombre, persona, categoria, id]);
      return respuesta;
    }
  };

  static modificar(nombre, descripcion, persona, categoria, id) {
    const query =
      "UPDATE libro SET nombre = ?, descripcion = ?,persona_id  = ?, categoria_id = ? WHERE libro_id = ?";
    let respuesta = qy(query, [nombre, descripcion, persona, categoria, id]);
    return respuesta;
  };

  static agregar(nombre, descripcion, categoria_id, persona_id){
    const query = 'INSERT INTO libro(nombre, descripcion, categoria_id, persona_id) VALUES(?, ?, ?, ?)';
    const respuesta = qy(query, [ nombre, descripcion, categoria_id, persona_id ]);
    return respuesta;
  };

  static existeNombre(nombre){
      let query = 'SELECT nombre FROM libro WHERE nombre = ?'
      let respuesta = qy(query, [nombre])
      return respuesta
  };

}

module.exports = Libro;
