exports.handler = (error, req, res, next) => {
  if (error.code === undefined) {
    error.status = 413;
  }
  res.status(error.status || 500);
  res.statusCode === 404 || res.statusCode === 413
    ? res.json({
        mensaje: error.message,
      })
    : res.json({
        mensaje: `error inesperado: ${error.message}`,
      });
};

exports.is404 = (req, res, next) => {
  const error = new Error("Ooops...  La pagina que busca no existe.");
  error.status = 404;
  next(error);
};
