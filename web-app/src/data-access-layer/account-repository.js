module.exports = function({db}){
	return {
		/*
		Retrieves all accounts ordered by username.
		Possible errors: databaseError
		Success value: The fetched accounts in an array.
		*/
		getAllAccounts: function (callback) { // den finns

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
		
		/*
		Retrieves the account with the given username.
		Possible errors: databaseError
		Success value: The fetched account, or null if no account has that username.
		*/
		getAccountById: function (user, callback) {

			const query = `SELECT * FROM accounts WHERE account_id = ?`
			const values = [user.account_id]

			db.dbConnection.query(query, values, function (error, account) {
				if (error) {
					callback(['databaseError'], null)
				} else {
					callback([], account[0])
				}
			})
		},

		getAccountByUsername: function (user, callback) { // den finns

			const query = `SELECT * FROM accounts WHERE username = ? LIMIT 1`
			const values = [user.username]
		
			db.dbConnection.query(query, values, function (error, accounts) {
				if (error) {
					callback(['databaseError'], null)
				} else {
					callback([], accounts[0])
				}
			})
		},

		deleteAccountById: function(id, callback) {
			const query = `DELETE FROM accounts WHERE account_id = ? LIMIT 1`
			const values = id
			
			db.dbConnection.query(query, values, function(error, account) {
				if(error) {
					callback(['databaseError'], null)
				} else {
					callback([])
				}
			})
		},


		createAccount: function (newUser, callback) {

			const query = `INSERT INTO accounts (username, password) VALUES (?, ?)`
			const values = [newUser.username, newUser.password]
		
			db.dbConnection.query(query, values, function (error, newUser) {
				if (error) {
					// TODO: Look for usernameUnique violation.
					callback(['databaseError'], null)
				} else {
					callback([], newUser)
				}
			})
		},

		updateAccountInformation: function(newInfo, callback) {
			
			const query = `UPDATE accounts SET username = ?, password = ? WHERE account_id = ?`
			const values = [newInfo.username, newInfo.password, newInfo.account_id]
			console.log(values)
			db.dbConnection.query(query, values, function(error, newInfo) {
				if(error) {
					console.log("error i databasen")
					callback(['databaseError'], null)
				} else {
					console.log("Uppdaterade!")
					callback([], newInfo)
				}
			})
		}

	}
}