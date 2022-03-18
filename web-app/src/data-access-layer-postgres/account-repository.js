const { Sequelize, DataTypes } = require('sequelize');

module.exports = function ({ db, models }) {
	return {
		/*
		Retrieves all accounts ordered by username.
		Possible errors: databaseError
		Success value: The fetched accounts in an array.
		*/
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

		/*
		Retrieves the account with the given username.
		Possible errors: databaseError
		Success value: The fetched account, or null if no account has that username.
		*/
		getAccountByUsername: async function (user, callback) {
			console.log(user.username)
			try {

				const result = await models.account.findAll({
					where: {
						username: user.username
					},
					limit: 1
				});
				const foundUser = result[0].dataValues

				callback([], foundUser)
			} catch (error) {
				callback(['databaseError'], null)
			}
		},

		getAccountById: async function (user, callback) {
			
			console.log(user.account_id)
			try {
				const result = await models.account.findAll({
					where: {
						account_id: user.account_id
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
				// TODO: Look for usernameUnique violation.
				callback(['databaseError'], null)
			}
		},

		deleteAccountById: async function(id, callback) {

			try {
				await models.account.destroy({
					where: {
						account_id :id
					}
				})
				callback([])
			} catch (error) {
				callback(['databaseError'], null)
			}
		},

		updateAccountInformation: async function(newInfo, callback) {
	
			try {
				await models.account.update({ 
					username: newInfo.username,
					password: newInfo.password}, {
					where: {
					account_id: newInfo.account_id
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



