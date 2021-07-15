const { libro, persona, categoria } = require("../models");

const lista = async (req, res, next) => {
  try {
    let respuesta = await persona.lista();
    //cambio de linea de codigo: if (respuesta.length === 0) throw new Error("no hay personas para mostrar");
    if (respuesta.length === 0) res.status(413).json([]);
    res.status(200).json(respuesta);
  } catch (err) {
    next(err);
  }
};

const buscar = async (req, res, next) => {
  try {
    const { id } = req.params;
    let respuesta = await persona.buscar(id);
    if (respuesta.length === 0) {
      throw new Error("no se encuentra esa persona");
    }
    res.status(200).json(respuesta);
  } catch (err) {
    next(err);
  }
};

const registrar = async (req, res, next) => {
  try {
    const { nombre, apellido, alias, email } = req.body;

    let respuesta = await persona.buscarEmail(email.toUpperCase());
    if (respuesta.length > 0) {
      throw new Error("El email ya se encuentra registrado");
    }

    respuesta = await persona.agregar(
      nombre.toUpperCase(),
      apellido.toUpperCase(),
      alias.toUpperCase(),
      email.toUpperCase()
    );

    //cambio de codigo para no realizar otra consulta a la base de datos
    //respuesta = await persona.buscarEmail(email);
    res.status(200).json({
      nombre,
      apellido,
      alias,
      email
    });

  } catch (err) {
    next(err);
  }
};

const eliminar = async (req, res, next) => {
  try {
    const { id } = req.params;

    let respuesta = await persona.buscar(id);
    if (respuesta.length === 0) throw new Error("no existe esa persona");

    respuesta = await persona.buscarPersonaEnLibro(id);
    if (respuesta.length > 0)
      throw new Error(
        "esa persona tiene libros asociados, no se puede eliminar"
      );

    respuesta = await persona.eliminar(id);

    res.status(200).json({
      mensaje: "se borro correctamente",
    });
  } catch (err) {
    next(err);
  }
};

const modificar = async (req, res, next) => {
  try {
    const { nombre, apellido, alias, email } = req.body;
    const { id } = req.params;

    let respuesta = await persona.buscar(id);
    if (respuesta.length === 0) throw new Error("no se encuentra esa persona");

    //cambio linea de codigo: no es necesario la comprobacion
    // respuesta = await persona.verificar(email.toUpperCase(), id);
    // if (respuesta.length === 0) throw new Error("No puedes cambiar el mail");

    respuesta = await persona.modificar(
      nombre.toUpperCase(),
      apellido.toUpperCase(),
      alias.toUpperCase(),
      id
    );

    respuesta = await persona.buscar(id);

    res.status(200).json(respuesta);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  lista,
  registrar,
  buscar,
  eliminar,
  modificar,
};
