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
          build_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
          },
          build_name: {
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
          talentTreeId_level_1: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          talentTreeId_level_4: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          talentTreeId_level_7: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          talentTreeId_level_10: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          talentTreeId_level_13: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          talentTreeId_level_16: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          talentTreeId_level_20: {
              type: Sequelize.STRING,
              allowNull: false,
          }
        }, {
          tablename: "builds",
          timestamps: false
        })
    }
}