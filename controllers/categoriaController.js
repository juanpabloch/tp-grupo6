const { libro, persona, categoria } = require("../models");

const lista = async (req, res, next) => {
  try {
    let respuesta = await categoria.lista();
    if (respuesta.length === 0)
      throw new Error("no hay categorias para mostrar");
    res.status(200).json(respuesta);
  } catch (err) {
    next(err);
  }
};

const buscar = async (req, res, next) => {
  try {
    const { id } = req.params;
    let respuesta = await categoria.buscar(id);
    if (respuesta.length === 0) throw new Error("categoria no encontrada");
    res.status(200).json(respuesta);
  } catch (err) {
    next(err);
  }
};

const agregar = async (req, res, next) => {
  try {
    const nombre = req.body.nombre.toUpperCase();
    let respuesta = await categoria.buscarNombre(nombre);
    if (respuesta.length > 0)
      throw new Error("Ese nombre de categoria ya existe");

    respuesta = await categoria.agregar(nombre);

    respuesta = await categoria.buscar(respuesta.insertId);

    res.status(200).json(respuesta);
  } catch (err) {
    next(err);
  }
};

const eliminar = async (req, res, next) => {
  try {
    const { id } = req.params;
    let respuesta = await categoria.buscar(id);
    if (respuesta.length === 0)
      throw new Error("no existe la categoria indicada");

    respuesta = await categoria.buscarCategoriaLibro(id);
    if (respuesta.length > 0)
      throw new Error("categoria con libros asociados, no se puede eliminar");

    respuesta = await categoria.eliminar(id);

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
