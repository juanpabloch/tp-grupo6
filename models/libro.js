const qy = require("../database/mysqlConnect");

class Libro {
  static async estado(id) {
    // const query = "SELECT persona_id FROM libro WHERE persona_id IS  NULL AND libro_id = ?";
    const query = "SELECT persona_id FROM libro WHERE persona_id IS  NULL AND libro_id = $1";
    let respuesta = await qy(query, [id]);
    return respuesta.rows;
  }

  static async lista() {
    const query = "SELECT * FROM libro";
    let respuesta = await qy(query);
    return respuesta.rows;
  }

  static async buscar(id) {
    // const query = "SELECT * FROM libro WHERE libro_id = ?";
    const query = "SELECT * FROM libro WHERE libro_id = $1";
    let respuesta = await qy(query, [id]);
    return respuesta.rows;
  }

  static async eliminar(id) {
    // const query = "DELETE FROM libro WHERE libro_id=?";
    const query = "DELETE FROM libro WHERE libro_id=$1";
    let respuesta = await qy(query, [id]);
    return respuesta.rows;
  }

  static async prestar(id, libro) {
    const query =
      // "UPDATE libro SET persona_id = ? WHERE libro_id = ? AND persona_id IS NULL";
      "UPDATE libro SET persona_id = $1 WHERE libro_id = $2 AND persona_id IS NULL";
    let respuesta = await qy(query, [id, libro]);
    return respuesta.rows;
  }

  static async devolver(id) {
    // const query = "UPDATE libro SET persona_id = NULL WHERE libro_id = ?";
    const query = "UPDATE libro SET persona_id = NULL WHERE libro_id = $1";
    let respuesta = await qy(query, [id]);
    return respuesta.rows;
  }

  static async verificar(nombre, persona, categoria, id) {
    if (persona === null) {
      // const query = "SELECT * FROM libro WHERE nombre = ?   AND persona_id  IS NULL  AND categoria_id  = ? AND libro_id  = ?";
      const query = "SELECT * FROM libro WHERE nombre = $1   AND persona_id  IS NULL  AND categoria_id =$2 AND libro_id =$3";
      let respuesta = await qy(query, [nombre, categoria, id]);
      return respuesta.rows;
    } else {
      // const query = "SELECT * FROM libro WHERE nombre = ?   AND persona_id  = ?  AND categoria_id  = ? AND libro_id  = ?  ";
      const query = "SELECT * FROM libro WHERE nombre=$1 AND persona_id=$2 AND categoria_id=$3 AND libro_id=$4  ";
      let respuesta = await qy(query, [nombre, persona, categoria, id]);
      return respuesta.rows;
    }
  }

  static async modificar(nombre, descripcion, persona, categoria, id) {
    // const query = "UPDATE libro SET nombre = ?, descripcion = ?,persona_id  = ?, categoria_id = ? WHERE libro_id = ?";
    const query = "UPDATE libro SET nombre = $1, descripcion = $2,persona_id  = $3, categoria_id = $4 WHERE libro_id = $5";
    let respuesta = await qy(query, [
      nombre,
      descripcion,
      persona,
      categoria,
      id,
    ]);
    return respuesta.rows;
  }

  static async agregar(nombre, descripcion, categoria_id, persona_id) {
    // const query = "INSERT INTO libro(nombre, descripcion, categoria_id, persona_id) VALUES(?, ?, ?, ?)";
    const query = "INSERT INTO libro(nombre, descripcion, categoria_id, persona_id) VALUES($1, $2, $3, $4) RETURNING libro_id";
    let respuesta = await qy(query, [
      nombre,
      descripcion,
      categoria_id,
      persona_id,
    ]);

    return respuesta.rows;
  }

  static async buscarNombre(nombre) {
    // const query = "SELECT nombre FROM libro WHERE nombre = ?";
    const query = "SELECT nombre FROM libro WHERE nombre = $1";
    let respuesta = await qy(query, [nombre]);
    return respuesta.rows;
  }
}

module.exports = Libro;
