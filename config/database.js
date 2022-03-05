const mysql = require("mysql2")
const {dbHost,dbName, dbPort, dbUser, dbPassword} = require('./index');

const connection = mysql.createConnection({
    host:dbHost,
    port:dbPort,
    user:dbUser,
    password:dbPassword,
    database:dbName
});