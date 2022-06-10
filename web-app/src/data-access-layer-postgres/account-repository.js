const { Sequelize, DataTypes } = require('sequelize');

module.exports = function ({models }) {
	return {
		getAllAccounts: async function (callback) {
			try {
				const result = await models.account.findAll()
				const accounts = []
				result.forEach(e => {
					accounts.push(e.dataValues)
				})

				callback([], accounts)

			} catch (error) {
				console.log('ERROR in getAll ' + 'USER:', error)
				callback(['databaseError'], null)
			}
		},
		getAccountByUsername: async function (username, callback) {
			try {
				const result = await models.account.findAll({
					where: {
						username: username
					},
					limit: 1
				});
				const foundUser = result[0].dataValues

				callback(null, foundUser)
			} catch (error) {
				callback(error, null)
			}
		},

		getAccountById: async function (id, callback) {
			
			try {
				const result = await models.account.findAll({
					where: {
						id: id
					},
					limit: 1
				});
				const foundUser = result[0].dataValues

				callback([], foundUser)
			} catch (error) {
				callback(['databaseError'], null)
			}
		},

		createAccount: async function (newUser, callback) {
			try {
				const account = await models.account.create({
					username: newUser.username,
					password: newUser.password,
				})
				callback([], newUser)
			} catch (error) {
				callback(error, null)
			}
		},

		deleteAccountById: async function(id, callback) {
			try {
				await models.account.destroy({
					where: {
						id :id
					}
				})
				callback(null)
			} catch (error) {
				callback(['databaseError'])
			}
		},

		updateAccountInformation: async function(newInfo, callback) {
	
			try {
				await models.account.update({ 
					username: newInfo.username,
					password: newInfo.password}, {
					where: {
					id: newInfo.id
					}
				})

				callback([], newInfo)
			} catch (error) {
				console.log(error)
				callback(['databaseError'], null)
			}
		}
	}
}



