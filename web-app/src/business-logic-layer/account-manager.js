module.exports = function({accountRepository, accountValidator}){
	return {
		getAllAccounts: function(callback) {
			accountRepository.getAllAccounts(callback)
		},

		getAccountByUsername: function(user, callback){
			accountRepository.getAccountByUsername(user, callback)
		},
		
		createAccount: function(newUser, callback){
			accountValidator.getErrorsNewAccount(newUser, callback)	
		}
	}
}