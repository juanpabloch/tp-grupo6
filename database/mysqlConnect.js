const mysql = require('mysql');
const util = require('util');

const mysqlOptions = {
    host: 'localhost',  
    user: 'root',  
    password:'',  
    port: 3306,  
    database: 'tp-grupal' 
}

const connection = mysql.createConnection(mysqlOptions)
connection.connect((err)=>{
    if(err)throw new Error('Error al conectar a la base de datos');
    console.log('base de datos mysql conectada')
})

const qy = util.promisify(connection.query).bind(connection)

module.exports = qy;
