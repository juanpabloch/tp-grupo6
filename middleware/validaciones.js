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

const bodyPersona = (req, res, next) => {
  const { nombre, apellido, alias, email } = req.body;
  try {
    if (!nombre || !apellido || !alias || !email)
      throw new Error("Falta enviar datos");
      if (!/^[a-zA-ZÀ-ÿ]{2,}\s?(([a-zA-ZÀ-ÿ]{1,}\s?){1,3})/gi.test(nombre))
      throw new Error(
        "el nombre debe contener solo caracteres 3 como minimo y deben ser alfabeticos "
      );
      if (!/^[a-zA-ZÀ-ÿ]{2,}\s?(([a-zA-ZÀ-ÿ]{1,}\s?){1,3})/gi.test(apellido))
      throw new Error(
        "el nombre debe contener solo caracteres 3 como minimo y deben ser alfabeticos "
      );
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

const bodyLibroLong = (req, res, next) => {
  try {
    if (!req.body.nombre || !req.body.categoria_id)
      throw new Error("nombre y categoría son datos obligatorios");

    let { nombre, descripcion } = req.body;

    nombre = nombre.replace(/  +/gi, " ");
    nombre = nombre.trim();

    if (!/^[a-zA-ZÀ-ÿ]{2,}\s?(([a-zA-ZÀ-ÿ]{1,}\s?){1,15})/gi.test(nombre))
      throw new Error(
        "el nombre debe contener solo caracteres 3 como minimo y deben ser alfabeticos "
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
