// anatagligen inte använda den gamla accountRepository

module.exports = function({accountRepository, accountValidator}){
	return {
		getAllAccounts: function(callback) {
			accountRepository.getAllAccounts(callback)
		},


		getAccountByUsername: function(user, callback){
			accountRepository.getAccountByUsername(user, callback)
		},

		getAccountById: function(user, callback){
			accountRepository.getAccountById(user, callback)
		},
		

		createAccount: function(newUser, callback){
			accountValidator.getErrorsNewAccount(newUser, callback)	
		},

		deleteAccountById: function(id, callback){
			accountRepository.deleteAccountById(id, callback)
		},

		updateAccountInformation: function(newUser, callback){
			accountValidator.getErrorsNewInfo(newUser, callback)
		}
	}
}