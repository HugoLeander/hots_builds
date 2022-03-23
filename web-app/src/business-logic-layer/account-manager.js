// anatagligen inte använda den gamla accountRepository

module.exports = function({accountRepository, accountValidator, encryptionManager}){
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
			accountValidator.getErrorsNewAccount(newUser, function(error, validatedUser) {
				if(error) {
					console.log(error)
					callback(error, null)
				} else {
					encryptionManager.encryptPassword(validatedUser.password, function(hashedPassword) {

						validatedUser.password = hashedPassword
						
						accountRepository.createAccount(validatedUser, function(error, validatedUser){
							if(error){
								console.log(error)
								callback(error, null)
							} else { 
								callback(error, validatedUser)
							}
						})
					})
				}
			})	
		},

		deleteAccountById: function(id, callback){
			accountRepository.deleteAccountById(id, callback)
		},

		updateAccountInformation: function(newInfo, callback){
			accountValidator.getErrorsNewInfo(newInfo, function(error, validatedInfo) {
				if(error) {
					console.log(error)
					callback(error, null)    
				} else {
					encryptionManager.encryptPassword(validatedInfo.password, function(hashedPassword) {
						validatedInfo.password = hashedPassword
						console.log(validatedInfo)
						accountRepository.updateAccountInformation(validatedInfo, function(error, validatedInfo){
							if(error){
								console.log(error)
								callback(error, null)
							} else { 
								callback(error, validatedInfo)
								console.log("skickade till repo")
							}
						}) 
					}) 
				}
			})
		},

		loginAccount: function(user, callback) {    
			console.log("user")  
			console.log(user)
			accountRepository.getAccountByUsername(user.username, function(error, userGotBack) {
				console.log("got back")
				console.log(userGotBack)
				if(error) {
					console.log(error)
				} else {
					encryptionManager.validateEncryptedPassword(user.password, userGotBack.password, function(isValid) {
						if(isValid) {
							callback(null, userGotBack)
						} else {
							callback(error, null)
						}
					})
				}
			})
		}
	}
}