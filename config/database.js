const mysql = require("mysql2")
const {dbHost,dbName, dbPort, dbUser, dbPassword} = require('./index');

const connection = mysql.createConnection({
    host:dbHost,
    port:dbPort,
    user:dbUser,
    password:dbPassword,
    database:dbName
});

function query(sql, data) {
    return new Promise((resolve, reject) => {
        connection.query(sql, data, (error, result) => {
            if (error) {
                if (error.errno === 1062) {
                    const dataError = error.sqlMessage.split("'")[1]
                    const fieldError = error.sqlMessage.split("'")[3]
                    const message = `El ${fieldError} '${dataError}' ya está registrado.`
                    reject(message)
                }
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

async function checkLogin(data) {
    try {
        let dataUser = await query(`SELECT * FROM users WHERE nombreusuario = ? and password = ?`,[data.nombreusuario, data.password])
        return dataUser
    } catch (error) {
        return error
    }
}

async function insert(tableName, data) {
    try {
        let result = await query(`INSERT INTO ${tableName}(??) VALUES (?)`, [Object.keys(data), Object.values(data)])
        return {data: result, success: true}
    } catch (error) {
        return {error, success: false}
    }
}

module.exports = { insert, checkLogin }