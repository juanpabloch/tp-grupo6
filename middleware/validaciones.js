const params = (req, res, next) => {
  const { id } = req.params;
  try {
    if (!Number(id)) {
      throw new Error("id inválida");
    }
    next();
  } catch (error) {
    next(error);
  }
};

const bodyCategoria = (req, res, next) => {
  let { nombre } = req.body;
  try {
    if (!nombre)
    throw new Error("Falta enviar datos");
    nombre = nombre.replace(/  +/gi, " ");
    nombre = nombre.trim();
    if (!/^([^0-9_@./#&+*-?!><]*)$/gi.test(nombre))
      throw new Error("el nombre debe contener caracteres alfabeticos ");
    if (nombre.length < 3)
      throw new Error("el nombre debe contener solo caracteres 3 como minimo");
    if (nombre.length > 70)
      throw new Error("el nombre no debe tener mas de 70 caracteres");
    req.body.nombre = nombre;
    next();
  } catch (error) {
    next(error);
  }
};

const bodyPersona = (req, res, next) => {
  let { nombre, apellido, alias, email } = req.body;
  try {
    if (!nombre || !apellido || !alias || !email)
      throw new Error("Falta enviar datos");
    nombre = nombre.replace(/  +/gi, " ");
    apellido = apellido.replace(/  +/gi, " ");
    alias = alias.replace(/  +/gi, " ");
    email = email.replace(/  +/gi, " ");
    nombre = nombre.trim();
    apellido = apellido.trim();
    alias = alias.trim();
    email = email.trim();
    if (!/^([^0-9_@./#&+*-?!><]*)$/gi.test(nombre))
      throw new Error("el nombre debe contener caracteres alfabeticos ");
    if (nombre.length < 3)
      throw new Error("el nombre debe contener solo caracteres 3 como minimo");
    if (nombre.length > 70)
      throw new Error("el nombre no debe tener mas de 70 caracteres");
    if (!/^([^0-9_@./#&+*-?!><]*)$/gi.test(apellido))
      throw new Error("el nombre debe contener caracteres alfabeticos ");
    if (apellido.length < 3)
      throw new Error("el nombre debe contener solo caracteres 3 como minimo");
    if (apellido.length > 70)
      throw new Error("el apellido no debe tener mas de 70 caracteres");
    if (alias.length < 3)
      throw new Error("el alias debe tener al menos 5 caracteres");
    if (!/^[a-z0-9_.]+$/i.test(alias))
      throw new Error("el alias debe contener solo caracteres de la a-z");
    if (!/^[a-z0-9_.]+@[a-z0-9]+\.[a-z0-9_.]+$/i.test(email))
      throw new Error("el email debe ser valido");
    req.body.nombre = nombre;
    req.body.apellido = apellido;
    req.body.alias = alias;
    req.body.email = email;
    next();
  } catch (err) {
    next(err);
  }
};

const bodyLibroLong = (req, res, next) => {
  try {
    if (!req.body.nombre || !req.body.categoria_id)
      throw new Error("nombre y categoría son datos obligatorios");
    let { nombre, descripcion } = req.body;
    nombre = nombre.replace(/  +/gi, " ");
    nombre = nombre.trim();
    if (!/^([^0-9_@./#&+*-?!><]*)$/gi.test(nombre))
      throw new Error("el nombre debe contener caracteres alfabeticos ");
    if (nombre.length < 3)
      throw new Error("el nombre debe contener solo caracteres 3 como minimo");
    if (nombre.length > 70)
      throw new Error("el nombre no debe tener mas de 70 caracteres");
    descripcion = descripcion.trim();
    descripcion = descripcion.replace(/  +/gi, " ");
    if (descripcion.length > 200)
      throw new Error("la descripción no debe tener mas de 200 caracteres");
    req.body.descripcion = descripcion;
    req.body.nombre = nombre;
    next();
  } catch (err) {
    next(err);
  }
};

const bodyLibroShort = (req, res, next) => {
  try {
    const { persona_id } = req.body;
    if (!persona_id)
      throw new Error(
        "El id de la persona a prestar el libro es un dato obligatorio"
      );
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  params,
  bodyPersona,
  bodyLibroLong,
  bodyLibroShort,
  bodyCategoria,
};
