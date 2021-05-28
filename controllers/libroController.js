const Modelo = require("../models/libroModelo");

const libro_descripcion = async (req, res, next) => {
  try {
    if (!req.body.nombre || !req.body.categoria_id) {
      throw new Error("No enviaste los datos obligatorios");
    }
    let respuesta = await Modelo.verificar(
      req.body.nombre.toUpperCase(),
      req.body.persona_id,
      req.body.categoria_id,
      req.params.id
    );
    if (respuesta.length === 0) {
      throw new Error("Solo puedes cambiar la descripcion");
    }
    let descripcion = "";
    if (req.body.descripcion) {
      descripcion = req.body.descripcion.toUpperCase();
    }
    respuesta = await Modelo.cambio_descripcion(
      req.body.nombre,
      descripcion,
      req.body.persona_id,
      req.body.categoria_id,
      req.params.id
    );
    const modificado = req.body;
    res.status(200).json({modificado});
  } catch (err) {
    if (err.code === undefined) {
      res.status(413).json({
        error: err.message,
      });
    } else {
      next(err);
    }
  }
};
const libro_devolver = async (req, res, next) => {
  try {
    let respuesta = await Modelo.existe(req.params.id);
    if (respuesta.length === 0) throw new Error("no se encuentra ese libro");
    respuesta = await Modelo.estado(req.params.id);
    if (respuesta.length > 0) throw new Error("ese libro no estaba prestado!");
    respuesta = await Modelo.devolver(req.params.id);
    res.status(200).json("se realizo la devolución correctamente");
  } catch (err) {
    if (err.code === undefined) {
      res.status(413).json({
        error: err.message,
      });
    } else {
      next(err);
    }
  }
};
const libro_borrar = async (req, res, next) => {
  try {
    let respuesta = await Modelo.existe(req.params.id);
    if (respuesta.length === 0) throw new Error("no se encuentra ese libro");
    respuesta = await Modelo.estado(req.params.id);
    if (respuesta.length === 0)
      throw new Error("ese libro esta prestado no se puede borrar");
    respuesta = await Modelo.eliminar(req.params.id);
    res.status(200).json("Se borro perfectamente el libro");
  } catch (err) {
    if (err.code === undefined) {
      res.status(413).json({
        error: err.message,
      });
    } else {
      next(err);
    }
  }
};

module.exports = {
  libro_borrar,
  libro_devolver,
  libro_descripcion,
};
