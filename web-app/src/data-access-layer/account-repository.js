module.exports = function ({ db }) {
	return {
		/*
		Returns all accounts as an array of account objects
		*/
		getAllAccounts: function (callback) {

			const query = `SELECT * FROM accounts ORDER BY id`
			const values = []

			db.dbConnection.query(query, values, function (error, accounts) {
				if (error) {
					callback(['databaseError'], null)
				} else {
					callback([], accounts)
				}
			})
		},
		
		getAccountById: function (id, callback) {

			const query = `SELECT * FROM accounts WHERE id = ?`
			const values = [id]

			db.dbConnection.query(query, values, function (error, account) {
				if (error) {
					callback(error, null)
				} else {
					callback([], account[0])
				}
			})
		},

		getAccountByUsername: function (username, callback) {

			const query = `SELECT * FROM accounts WHERE username = ? LIMIT 1`
			const values = [username]

			db.dbConnection.query(query, values, function (error, accounts) {
				if (error) {
					callback(error, null)
				} else {
					callback(error, accounts[0])
				}
			})
		},

		deleteAccountById: function(id, callback) {
			
			const query = `DELETE FROM accounts WHERE id = ?`
			const values = id
			
			db.dbConnection.query(query, values, function(error) {
				if(error) {
					callback(error)
				}
				else {
					callback(null)
				}
			})
		},


		createAccount: function (newAccount, callback) {

			const query = `INSERT INTO accounts (username, password) VALUES (?, ?)`
			const values = [newAccount.username, newAccount.password]
		
			db.dbConnection.query(query, values, function (error, newAccount) {
				if (error) {
					callback(error, null)
				} else {
					callback([], newAccount)
				}
			})
		},

		updateAccountInformation: function(newInfo, callback) {
			
			const query = `UPDATE accounts SET username = ?, password = ? WHERE id = ?`
			const values = [newInfo.username, newInfo.password, newInfo.id]
			console.log(values)
			db.dbConnection.query(query, values, function(error, newInfo) {
				if(error) {
					callback(['databaseError'], null)
				} else {
					console.log("Updated!")
					callback([], newInfo)
				}
			})
		}

	}
}