exports.is500 = (error, req, res, next) =>{
  res.status(error.status || 500);
  res.json({
    mensaje: error.message,
  });
  }
  
exports.is404 = (req, res, next) => {
    const error = new Error('No exite el path');
    error.status = 404;
    next(error);
  };

