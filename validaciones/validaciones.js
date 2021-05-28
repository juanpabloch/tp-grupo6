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

const idCorrecto = (req, res, next)=>{
    const { id } = req.params;
    if(Number(id)){
        console.log('id correcto');
        next();
    }else{
        const error = new Error('id invalido');
        res.status(413).json({
            error: error.message
        })
    }
}



module.exports = {
    idCorrecto,
}