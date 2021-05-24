const mysql = require('mysql');
const util = require('util');

const mysqlOptions = {
    host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port:process.env.DB_PORT,
      database: process.env.DB_NAME
}

const connection = mysql.createConnection(mysqlOptions)
connection.connect((err)=>{
    if(err)throw new Error('Error al conectar a la base de datos');
    console.log('base de datos mysql conectada')
})

const qy = util.promisify(connection.query).bind(connection)

module.exports = qy;
