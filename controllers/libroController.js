const {  libro, persona, categoria  } = require("../models");
const qy = require("../dataBase/mysqlConnect");
const cambiar_descripcion = async (req, res, next) => {
  try {
    const {nombre,persona_id,categoria_id,descripcion} = req.body;
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
    const modificado = req.body;
    res.status(200).json({modificado});
  } catch (err) {
    if (err.code === undefined) {
      res.status(413).json({
        error: err.message,
      });
    } else {
      next(err);
    }
  }
};
const devolver = async (req, res, next) => {
  try {
    let respuesta = await libro.existe(req.params.id);
    if (respuesta.length === 0) throw new Error("no se encuentra ese libro");
    respuesta = await libro.estado(req.params.id);
    if (respuesta.length > 0) throw new Error("ese libro no estaba prestado!");
    respuesta = await libro.devolver(req.params.id);
    res.status(200).json("se realizo la devolución correctamente");
  } catch (err) {
    if (err.code === undefined) {
      res.status(413).json({
        error: err.message,
      });
    } else {
      next(err);
    }
  }
};
const borrar = async (req, res, next) => {
  try {
    let respuesta = await libro.existe(req.params.id);
    if (respuesta.length === 0) throw new Error("no se encuentra ese libro");
    respuesta = await libro.estado(req.params.id);
    if (respuesta.length === 0)
      throw new Error("ese libro esta prestado no se puede borrar");
    respuesta = await libro.eliminar(req.params.id);
    res.status(200).json("se borro correctamente");
  } catch (err) {
    if (err.code === undefined) {
      res.status(413).json({
        error: err.message,
      });
    } else {
      next(err);
    }
  }
};

const detalle = async(req, res, next)=>{
  try {
      const { id } = req.params;
      const respuesta = await libro.existe(id);
      if(respuesta.length === 0)throw new Error('no se encuentra ese libro');

      res.status(200).json(respuesta);

  } catch (err) {
      if(err.code === undefined){
          res.status(413).json({
              error: err.message
          })
      }else{
          res.status(err.status || 500).json({
              error: 'error inesperado'
          })
      }
  }
};

const agregar = async(req, res, next)=>{
  try {
      let { nombre, descripcion, categoria_id, persona_id } = req.body
      
      if(persona_id === ""){
          persona_id = null;
      }
      
      let respuesta = await libro.existeNombre(nombre.toUpperCase())
      if(respuesta.length)throw new Error('ese libro ya existe');

      //Placeholder, esperando codigo de categorias y persona.
      query = 'SELECT * FROM categoria WHERE categoria_id = ?'
      respuesta = await qy(query, [categoria_id])
      if(respuesta.length === 0)throw new Error('no existe la categoria indicada');

      if(persona_id){
          query = 'SELECT * FROM persona WHERE persona_id = ?'
          respuesta = await qy(query, [persona_id])
          if(respuesta.length === 0)throw new Error('no existe la persona indicada');
      }

      
      respuesta = await libro.agregar(nombre.toUpperCase(), descripcion.toUpperCase(), categoria_id, persona_id);
      
      const id =  respuesta.insertId;
      respuesta = await libro.existe(id);

      res.status(200).json(respuesta);

  } catch (err) {
      if(err.code === undefined){
          res.status(413).json({
              error: err.message
          })
      }else{
          res.status(err.status || 500).json({
              error: 'error inesperado'
          })
      }
  }
};


module.exports = {
  borrar,
  devolver,
  cambiar_descripcion,
  detalle,
  agregar
}
