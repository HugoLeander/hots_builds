const Sequelize = require('sequelize');

module.exports = function({}) {
    const sequelizeInstance = new Sequelize(
        "postgres",
        "postgres",
        "postgres",
        {
          host: "postgresql",
          dialect: 'postgres',
        },
      )
    sequelizeInstance.authenticate().then( () => {
      console.log("connected to postgress")
    })
    return {
        dbConnection: sequelizeInstance
    }
}
