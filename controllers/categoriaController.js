const { libro, persona, categoria } = require("../models");

const lista = async (req, res, next) => {
  try {
    let response = await categoria.lista();
    if (response.rows.length === 0)
      throw new Error("no hay categorias para mostrar");
    res.status(200).json(response.rows);
  } catch (err) {
    next(err);
  }
};

const buscar = async (req, res, next) => {
  try {
    const { id } = req.params;
    let response = await categoria.buscar(id);
    if (response.rows.length === 0) throw new Error("categoria no encontrada");
    res.status(200).json(response.rows[0]);
  } catch (err) {
    next(err);
  }
};

const agregar = async (req, res, next) => {
  try {
    const nombre = req.body.nombre.toUpperCase();
    let response = await categoria.buscarNombre(nombre);
    if (response.rows.length > 0)
      throw new Error("Ese nombre de categoria ya existe");

    response = await categoria.agregar(nombre);

    // response = await categoria.buscar(response.insertId);
    response = await categoria.buscar(response.rows[0].categoria_id);

    res.status(200).json(response.rows[0]);
  } catch (err) {
    next(err);
  }
};

const eliminar = async (req, res, next) => {
  try {
    const { id } = req.params;
    let response = await categoria.buscar(id);
    if (response.rows.length === 0)
      throw new Error("no existe la categoria indicada");

    response = await categoria.buscarCategoriaLibro(id);
    if (response.rows.length > 0)
      throw new Error("categoria con libros asociados, no se puede eliminar");

    response = await categoria.eliminar(id);

    res.status(200).json({
      mensaje: "se borro correctamente",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  lista,
  eliminar,
  buscar,
  agregar,
};
