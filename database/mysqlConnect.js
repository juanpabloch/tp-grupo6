const mysql = require('mysql');
const util = require('util');

const mysqlOptions = {
    user: 'ba0c55bd7019ab',
    password: '69a07376',
    host: 'us-cdbr-east-04.cleardb.com',
    database: 'heroku_48eb104884121ab'
}
const connection = mysql.createPool(mysqlOptions)


// connection.connect((err)=>{
//     if(err)throw new Error('Error al conectar a la base de datos');
//     console.log('base de datos mysql conectada')
// })

const qy = util.promisify(connection.query).bind(connection)

module.exports = qy;
