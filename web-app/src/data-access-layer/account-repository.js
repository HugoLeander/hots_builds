module.exports = function ({ db }) {
	return {
		getAllAccounts: function (callback) {

			const query = `SELECT * FROM accounts ORDER BY account_id`
			const values = []

			db.dbConnection.query(query, values, function (error, accounts) {
				if (error) {
					callback(['databaseError'], null)
				} else {
					callback([], accounts)
				}
			})
		},


		getAccountById: function (user, callback) {

			const query = `SELECT * FROM accounts WHERE account_id = ?`
			const values = [user.account_id]

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

		deleteAccountById: function (id, callback) {
			const query = `DELETE FROM accounts WHERE account_id = ? LIMIT 1`
			const values = id

			db.dbConnection.query(query, values, function (error, account) {
				if (error) {
					callback(error, null)
				} else {
					callback([], account)
				}
			})
		},


		createAccount: function (newUser, callback) {

			const query = `INSERT INTO accounts (username, password) VALUES (?, ?)`
			const values = [newUser.username, newUser.password]

			db.dbConnection.query(query, values, function (error, newUser) {
				if (error) {
					// TODO: Look for usernameUnique violation.
					callback(error, null)
				} else {
					callback([], newUser)
				}
			})
		},

		updateAccountInformation: function (newInfo, callback) {

			const query = `UPDATE accounts SET username = ?, password = ? WHERE account_id = ?`
			const values = [newInfo.username, newInfo.password, newInfo.account_id]
			console.log(values)
			db.dbConnection.query(query, values, function (error, newInfo) {
				if (error) {
					console.log("Database error")
					callback(['databaseError'], null)
				} else {
					console.log("Updated!")
					callback([], newInfo)
				}
			})
		}

	}
}