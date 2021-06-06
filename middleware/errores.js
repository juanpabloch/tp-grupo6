exports.is500 = (error, req, res, next) => {
  res.status(error.status || 500);
  res.statusCode === 404
    ? res.json({
        mensaje: error.message,
      })
    : res.json({
        mensaje: "error inesperado",
      });
};

exports.is404 = (req, res, next) => {
  const error = new Error("No exite esa ruta");
  error.status = 404;
  next(error);
};
