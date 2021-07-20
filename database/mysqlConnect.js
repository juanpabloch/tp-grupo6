const mysql = require('mysql');
const util = require('util');

const mysqlOptions = {
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'be222c4f1fd189',
    password: 'b28eaa35',
    database: 'heroku_bad93729dbe0353'
}
const connection = mysql.createPool(mysqlOptions)


// connection.connect((err)=>{
//     if(err)throw new Error('Error al conectar a la base de datos');
//     console.log('base de datos mysql conectada')
// })

const qy = util.promisify(connection.query).bind(connection)

module.exports = qy;


// mysql://be222c4f1fd189:b28eaa35@us-cdbr-east-04.cleardb.com/heroku_bad93729dbe0353?reconnect=true