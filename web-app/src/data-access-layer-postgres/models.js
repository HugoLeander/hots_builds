const Sequelize = require('sequelize');

module.exports = function({db}) {
    return {
        account: db.dbConnection.define('account', {
            id: {
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
            },
            is_admin: {
              type: Sequelize.BOOLEAN,
              defaultValue: false,
            }
          }, {
            tablename: "accounts",
            timestamps: false
          }),
        review: db.dbConnection.define('review', {
            id: {
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
            },
            author_account_id: {
              type: Sequelize.INTEGER,
              allowNull: false,
            }
          }, {
            tablename: "reviews",
            timestamps: false
          }),
        build: db.dbConnection.define('build', {
          id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          description: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          hero_id: {
              type: Sequelize.INTEGER,
              allowNull: false,
          },
          level_1_talentTreeId: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          level_4_talentTreeId: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          level_7_talentTreeId: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          level_10_talentTreeId: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          level_13_talentTreeId: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          level_16_talentTreeId: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          level_20_talentTreeId: {
              type: Sequelize.STRING,
              allowNull: false,
          }
        }, {
          tablename: "builds",
          timestamps: false
        })
    }
}