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


const validarNombre = (req, res, next) => {
  const { nombre } = req.body;
  try {
    if (!nombre) throw new Error("Falta enviar datos");
    if (nombre.length < 3)
      throw new Error("el nombre debe tener al menos 3 letras");
    next();
  } catch (error) {
    next(error);
  }
};

const validarRegistro = (req, res, next) => {
  let { nombre, apellido, alias, email } = req.body;
  try {
    if (!nombre || !apellido || !alias || !email)
      throw new Error("Falta enviar datos");
    if (nombre.length < 3)
      throw new Error("el nombre debe tener al menos 3 letras");
    if (!/^[a-z]+$/i.test(nombre))
      throw new Error("el nombre debe contener solo caracteres de la a-z");
    if (apellido.length < 3)
      throw new Error("el apellido debe tener al menos 3 letras");
    if (!/^[a-z]+$/i.test(apellido))
      throw new Error("el apellido debe contener solo caracteres de la a-z");
    if (alias.length < 3)
      throw new Error("el alias debe tener al menos 5 caracteres");
    if (!/^[a-z0-9_.]+$/i.test(alias))
      throw new Error("el alias debe contener solo caracteres de la a-z");
    if (!/^[a-z0-9_.]+@[a-z0-9]+\.[a-z0-9_.]+$/i.test(email))
      throw new Error("el email debe ser valido");
    next();
  } catch (err) {
    next(err);
  }
};

const bodyLibro = (req, res, next) => {
  try {
    if (!req.body.nombre || !req.body.categoria_id)
      throw new Error("nombre y categoría son datos obligatorios");

    let { nombre, descripcion } = req.body;

    nombre = nombre.replace(/  +/gi, " ");
    nombre = nombre.trim();

    if (!/^[A-Z]{2,}\s?(([A-Z]{1,}\s?){1,15})/gi.test(nombre))
      throw new Error(
        "el nombre debe contener solo caracteres alfabeticos y como minimo 3"
      );

    descripcion = descripcion.trim();
    req.body.descripcion = descripcion.replace(/  +/gi, " ");

    if (descripcion.length > 200)
      throw new Error("la descripción no debe tener mas de 200 caracteres");

    next();
  } catch (err) {
    next(err);
  }
};

const personaok = (req, res, next) => {
  try {
    if (!req.body.persona_id)
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
  validarRegistro,
  bodyLibro,
  personaok,
  validarNombre,
};
