const mysql = require('mysql');
const util = require('util');

const mysqlOptions = {
    host: 'TU-HOST',
    user: 'TU-USER',
    password: 'TU-PASSWORD',
    port:3306,
    database: 'TU-DB'
}
const connection = mysql.createConnection(mysqlOptions)
connection.connect((err)=>{
    if(err)throw new Error('Error al conectar a la base de datos');
    console.log('base de datos mysql conectada')
})

const qy = util.promisify(connection.query).bind(connection)

module.exports = qy;
