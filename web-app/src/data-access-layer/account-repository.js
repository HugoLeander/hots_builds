module.exports = function({db}){
	return {
		/*
		Retrieves all accounts ordered by username.
		Possible errors: databaseError
		Success value: The fetched accounts in an array.
		*/
		getAllAccounts: function (callback) {

			const query = `SELECT * FROM accounts ORDER BY username`
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
		getAccountByUsername: function (user, callback) {

			const query = `SELECT * FROM accounts WHERE username = ? LIMIT 1`
			const values = [user.username]

			db.dbConnection.query(query, values, function (error, accounts) {
				if (error) {
					callback(['databaseError'], null)
				} else {
					callback([], accounts[0])
				}
			})
		}
	}
}