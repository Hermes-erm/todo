const mysql = require('mysql2');

var Connection = mysql.createConnection({
    host: "localhost",
    user : "root",
    password: "3621",
    database: "todo",
    connectTimeout : 20000
});

Connection.connect(err => {
    if (err) console.log(err);
    else console.log('connected successfully!');
})

module.exports = Connection;