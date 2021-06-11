//vamos a colocar todas la validaciones en este archivo

// ej:
// const <nombre funcion> = (req, res, next)=>{
//     traemos los parametros a validar, con req.params o req.body
//     realizamos la consulta con if()
//     if(true){
//         next()
//     }else{
//         error
//     }
// }

// o tambien:
// const <nombre funcion> = (req, res, next)=>{
//     if(true){
//        return next()
//     }
//
//     error
// }

//por ultimo exportamos la funcion

const params = (req, res, next)=>{
    const { id } = req.params;
    if(Number(id)){
        next();
    }else{
        const error = new Error('id invalido');
        res.status(413).json({
            error: error.message
        })
    }
}

// Validaciones de Persona

const validarRegistro = (req, res, next)=>{
    let {nombre, apellido, alias, email} = req.body;
    try {
        if (!nombre || !apellido || !alias || !email)throw new Error ('Falta enviar datos');
        if (nombre.length < 3)throw new Error ('el nombre debe tener al menos 3 letras');
        if (!/^[a-z]+$/i.test(nombre))throw new Error ('el nombre debe contener solo caracteres de la a-z');
        if (apellido.length < 3)throw new Error ('el apellido debe tener al menos 3 letras');
        if (!/^[a-z]+$/i.test(apellido))throw new Error ('el apellido debe contener solo caracteres de la a-z');
        if (alias.length < 3)throw new Error ('el alias debe tener al menos 5 caracteres');
        if (!/^[a-z0-9_.]+$/i.test(alias))throw new Error ('el alias debe contener solo caracteres de la a-z');
        if (!/^[a-z0-9_.]+@[a-z0-9]+\.[a-z0-9_.]+$/i.test(email))throw new Error ('el email debe ser valido');
        next();
    } catch (err) {
        if(err){
            res.status(413).json({
                error : err.message})
        }
    }
}

//validaciones libro

const bodyLibro = (req, res, next)=>{
    try {
        if( !req.body.nombre || !req.body.categoria_id ) throw new Error('nombre y categoría son datos obligatorios');

        let { nombre, descripcion } = req.body;
        nombre = nombre.toUpperCase();
        nombre = nombre.replace(/  +/ig,' ');
        nombre = nombre.trim();
        
        req.body.nombre  = nombre.match(/^[A-Z]{3,}\s?(([A-Z]{1,}\s?){1,15})/ig);
   
        if( req.body.nombre === null ) throw new Error('el nombre debe tener mas de 3 caracteres');

        descripcion = descripcion.toUpperCase();
        descripcion = descripcion.trim();
        req.body.descripcion = descripcion.replace(/  +/ig,' ');
        
        if( descripcion.length > 200 ) throw new Error('la descripción no debe tener mas de 200 caracteres');
        
        next()
        
    } catch (err) {
        if(err){
            res.status(413).json({
                error: err.message
            })
        }
    }
}


const personaok = (req, res, next)=>{
    try {
        if( !req.body.persona_id) throw new Error('El id de la persona a prestar el libro es un dato obligatorio');
        next()
        
    } catch (err) {
        if(err){
            res.status(413).json({
                error: err.message
            })
        }
    }
}

module.exports = {
    params, 
    validarRegistro,
    bodyLibro,
    personaok
}
