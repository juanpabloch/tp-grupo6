const mysql = require('mysql');
const util = require('util');
require('dotenv').config()

const {Pool} = require('pg')

// const mysqlOptions = {
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     host: process.env.MYSQL_HOST,
//     database: process.env.MYSQL_DATABSE
// }
// const connection = mysql.createPool(mysqlOptions)

const connection = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
    // user: process.env.MYSQL_USER,
    // password: process.env.MYSQL_PASSWORD,
    // host: process.env.MYSQL_HOST,
    // database: process.env.MYSQL_DATABSE
})


connection.connect((err)=>{
    if(err)throw new Error('Error al conectar a la base de datos');
    console.log('base de datos conectada')
})

const qy = util.promisify(connection.query).bind(connection)

// module.exports = connection.query;
module.exports = qy;
