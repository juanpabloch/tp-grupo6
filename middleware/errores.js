function errores(err, req, res, next){
    if(err){
      return res.status(err.status || 500).json({
          mensaje: 'Error inesperado'
        })
    }
  }

  module.exports = errores;