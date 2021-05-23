const mysql = require('mysql');
const util = require('util');

const mysqlOptions = {
    host: "freedb.tech",
    user: "freedbtech_agustin",
    password: "12345678a",
    port: 3306,
    database: "freedbtech_testeando"
}

const connection = mysql.createConnection(mysqlOptions)
connection.connect((err)=>{
    if(err)throw new Error('Error al conectar a la base de datos');
    console.log('base de datos mysql conectada')
})

const qy = util.promisify(connection.query).bind(connection)

module.exports = qy;
