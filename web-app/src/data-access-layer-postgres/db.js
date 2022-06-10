const Sequelize = require('sequelize');

module.exports = function({}) {
    const sequelizeInstance = new Sequelize(
      "root",
      "root",
      "abc123",
      {
        host: "postgresql",
        dialect: 'postgres'
      }
    )
    sequelizeInstance.authenticate().then( () => {
      console.log("connected to postgress")
    })
    return {
        dbConnection: sequelizeInstance
    }
}