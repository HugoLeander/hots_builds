const Sequelize = require('sequelize');

module.exports = function({db}) {
    return {
        account: db.dbConnection.define('account', {
            account_id: {
              type: Sequelize.INTEGER,
              autoIncrement: true,
              allowNull: false,
              primaryKey: true,
            },
            username: {
              type: Sequelize.STRING,
              allowNull: false,
              unique: true,
            },
            password: {
              type: Sequelize.STRING,
              allowNull: false,
            }
          }, {
            tablename: "accounts",
            timestamps: false
          }),
        review: db.dbConnection.define('review', {
            review_id: {
              type: Sequelize.INTEGER,
              autoIncrement: true,
              allowNull: false,
              primaryKey: true,
            },
            hero_name: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            name: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            rating: {
                type: Sequelize.INTEGER,
                allowNull: false,
              },
            description: {
            type: Sequelize.STRING,
            allowNull: false,
            }
          }, {
            tablename: "reviews",
            timestamps: false
          })
    }
}