const { libro, persona, categoria } = require("../models");

const qy = require("../dataBase/mysqlConnect");

const cambiar_descripcion = async (req, res, next) => {
  try {
    const { nombre, persona_id, categoria_id, descripcion } = req.body;
    const { id } = req.params;
    let respuesta = await libro.verificar(
      nombre,
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
      id
    );

    respuesta = await libro.buscar(id);

    res.status(200).json(respuesta);
  } catch (err) {
    next(err);
  }
};

const devolver = async (req, res, next) => {
  try {
    const { id } = req.params;
    let respuesta = await libro.buscar(id);
    if (respuesta.length === 0) throw new Error("no se encuentra ese libro");

    respuesta = await libro.estado(id);
    if (respuesta.length > 0) throw new Error("ese libro no estaba prestado!");

    respuesta = await libro.devolver(id);
    res.status(200).json({ mensaje: "se realizo la devolución correctamente" });
  } catch (err) {
    next(err);
  }
};

const prestar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { persona_id } = req.body;
    let respuesta = await libro.buscar(id);
    if (respuesta.length === 0) throw new Error("No se encuentra el libro");

    respuesta = await libro.estado(id);
    if (respuesta.length === 0)
      throw new Error(
        "El libro con id: " +
          id +
          " ya se encuentra prestado, no se puede prestar hasta que no se devuelva"
      );

    respuesta = await persona.buscar(persona_id);
    if (respuesta.length === 0)
      throw new Error(
        "No se encontro la persona con id:" +
          persona_id +
          " a la que se le quiere prestar el libro"
      );

    respuesta = await libro.prestar(persona_id, id);

    res.status(200).json({ menasaje: "El libro se presto correctamente" });
  } catch (err) {
    next(err);
  }
};

const borrar = async (req, res, next) => {
  try {
    const { id } = req.params;
    let respuesta = await libro.buscar(id);
    if (respuesta.length === 0) throw new Error("no se encuentra ese libro");

    respuesta = await libro.estado(id);
    if (respuesta.length === 0)
      throw new Error("ese libro esta prestado no se puede borrar");

    respuesta = await libro.eliminar(id);
    res.status(200).json({ mensaje: "se borro correctamente" });
  } catch (err) {
    next(err);
  }
};

const lista = async (req, res, next) => {
  try {
    const respuesta = await libro.lista();
    if (respuesta.length === 0)
      throw new Error("No tenemos ningun libro en la biblioteca");
    res.status(200).json(respuesta);
  } catch (err) {
    next(err);
  }
};

const buscar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const respuesta = await libro.buscar(id);
    if (respuesta.length === 0) throw new Error("no se encuentra ese libro");

    res.status(200).json(respuesta);
  } catch (err) {
    next(err);
  }
};

const agregar = async (req, res, next) => {
  try {
    const { nombre, descripcion, categoria_id, persona_id } = req.body;

    if (persona_id === "") {
      persona_id = null;
    }
    let respuesta = await libro.buscarNombre(nombre.toUpperCase());
    if (respuesta.length) throw new Error("ese libro ya existe");
    respuesta = await categoria.buscar(categoria_id);
    if (respuesta.length === 0)
      throw new Error("no existe la categoria indicada");

    if (persona_id) {
      respuesta = await persona.buscar(persona_id);
      if (respuesta.length === 0)
        throw new Error("no existe la persona indicada");
    }

    respuesta = await libro.agregar(
      nombre.toUpperCase(),
      descripcion.toUpperCase(),
      categoria_id,
      persona_id
    );

    const id = respuesta.insertId;
    respuesta = await libro.buscar(id);

    res.status(200).json(respuesta);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  cambiar_descripcion,
  devolver,
  prestar,
  borrar,
  lista,
  buscar,
  agregar,
};
