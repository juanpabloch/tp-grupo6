const {  libro ,persona ,categoria  } = require("../models");

const cambiar_descripcion = async (req, res, next) => {
  try {
    const {nombre,persona_id,categoria_id,descripcion} = req.body;
    let respuesta = await libro.verificar(
      nombre.toUpperCase(),
     persona_id,
      categoria_id,
      req.params.id
    );
    if (respuesta.length === 0) {
      throw new Error("Solo puedes cambiar la descripcion");
    }
    let descripcion_aux = "";
    if (descripcion) {
      descripcion_aux = descripcion.toUpperCase();
    }
    respuesta = await libro.modificar(
      nombre,
      descripcion_aux,
      persona_id,
      categoria_id,
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
const devolver = async (req, res, next) => {
  try {
    let respuesta = await libro.existe(req.params.id);
    if (respuesta.length === 0) throw new Error("no se encuentra ese libro");
    respuesta = await libro.estado(req.params.id);
    if (respuesta.length > 0) throw new Error("ese libro no estaba prestado!");
    respuesta = await libro.devolver(req.params.id);
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
const borrar = async (req, res, next) => {
  try {
    let respuesta = await libro.existe(req.params.id);
    if (respuesta.length === 0) throw new Error("no se encuentra ese libro");
    respuesta = await libro.estado(req.params.id);
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
  borrar,
  devolver,
  cambiar_descripcion,
};
