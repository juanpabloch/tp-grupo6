const { libro, persona, categoria } = require("../models");
const qy = require("../dataBase/mysqlConnect");

const cambiar_descripcion = async (req, res, next) => {
  try {
    const { nombre, persona_id, categoria_id, descripcion } = req.body;
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
    respuesta = await libro.buscar(req.params.id);
    res.status(200).json(respuesta);
  } catch (err) {
      next(err);
    }
};
const devolver = async (req, res, next) => {
  try {
    let respuesta = await libro.buscar(req.params.id);
    if (respuesta.length === 0) throw new Error("no se encuentra ese libro");
    respuesta = await libro.estado(req.params.id);
    if (respuesta.length > 0) throw new Error("ese libro no estaba prestado!");
    respuesta = await libro.devolver(req.params.id);
    res.status(200).json("se realizo la devolución correctamente");
  }  catch (err) {
    next(err);
  }
};

//Prestar un libro
const prestar = async (req, res, next) => {
  try {
    //no funciona el error cuando los parametros no se envian
    let respuesta = await libro.existe(req.params.id);
    if (respuesta.length === 0) throw new Error("No se encuentra el libro");
    respuesta = await libro.estado(req.params.id);
    if (respuesta.length === 0) throw new Error('El libro con id: ' +req.params.id + ' ya se encuentra prestado, no se puede prestar hasta que no se devuelva');
    respuesta = await persona.busca_id(req.body.persona_id);
    if (respuesta.length === 0) throw new Error('No se encontro la persona con id:' + req.body.persona_id + ' a la que se le quiere prestar el libro');
    respuesta = await libro.prestarl(req.body.persona_id, req.params.id);
    res.status(200).json("El libro se presto correctamente");
  } catch (err) {
        next(err);
  }
};

const borrar = async (req, res, next) => {
  try {
    let respuesta = await libro.buscar(req.params.id);
    if (respuesta.length === 0) throw new Error("no se encuentra ese libro");
    respuesta = await libro.estado(req.params.id);
    if (respuesta.length === 0)
      throw new Error("ese libro esta prestado no se puede borrar");
    respuesta = await libro.eliminar(req.params.id);
    res.status(200).json("se borro correctamente");
  } catch (err) {
    next(err);
  }
};

//Consultar todos los libros
const todosl = async(req, res, next)=>{
  try {
      const respuesta = await libro.listalibros();
      if (respuesta.length === 0) throw new Error('No tenemos ningun libro en la biblioteca');
      res.status(200).json(respuesta);
    } catch (err) {
      next(err);
    }
};


const detalle = async (req, res, next) => {
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
    let { nombre, descripcion, categoria_id, persona_id } = req.body;

    if (persona_id === "") {
      persona_id = null;
    }

    let respuesta = await libro.existeNombre(nombre);
    if (respuesta.length) throw new Error("ese libro ya existe");

    //Placeholder, esperando codigo de categorias y persona.
    query = "SELECT * FROM categoria WHERE categoria_id = ?";
    respuesta = await qy(query, [categoria_id]);
    if (respuesta.length === 0)
      throw new Error("no existe la categoria indicada");

    if (persona_id) {
      query = "SELECT * FROM persona WHERE persona_id = ?";
      respuesta = await qy(query, [persona_id]);
      if (respuesta.length === 0)
        throw new Error("no existe la persona indicada");
    }

    respuesta = await libro.agregar(
      nombre,
      descripcion,
      categoria_id,
      persona_id
    );
      console.log('entro a agregar');
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
  todosl,
  detalle,
  agregar,
};
