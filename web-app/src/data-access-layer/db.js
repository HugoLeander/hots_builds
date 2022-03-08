const mysql = require('mysql')

module.exports = function({}) {
    return {
        dbConnection: mysql.createConnection({
            host: "database",
            port: 3306,
            user: "root",
            password: "abc123",
            database: "my-platform"
        })
    }
}
