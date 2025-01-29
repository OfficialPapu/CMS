const mysql = require('mysql2/promise');  
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cms',
});

db.getConnection()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection error: ', err));

module.exports = db;
