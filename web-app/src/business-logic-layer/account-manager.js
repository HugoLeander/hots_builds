module.exports = function({accountRepository, accountValidator, encryptionManager}){
	return {
		getAllAccounts: function(callback) {
			accountRepository.getAllAccounts(callback)
		},

		getAccountByUsername: function(user, callback){
			accountRepository.getAccountByUsername(user, callback)
		},

		getAccountById: function(id, callback){
			accountRepository.getAccountById(id, callback)
		},
		
		createAccount: function(newUser, callback){
			accountValidator.getErrorsNewAccount(newUser, function(error, validatedUser) {
				if(error) {
					console.log(error)
					callback(error, null)
				} else {
					encryptionManager.encryptPassword(validatedUser.password, function(error, hashedPassword) {

						if(error){
							console.log(error)
							callback(error, null)
						} else { 
							validatedUser.password = hashedPassword
						
							accountRepository.createAccount(validatedUser, function(error, validatedUser){
								if(error){
									console.log(error)
									callback(error, null)
								} else { 
									callback(error, validatedUser)
								}
							})
						}
					})
				}
			})	
		},

		deleteAccountById: function(request, id, callback){
			if (request.body.userInfo.id == id || request.body.userInfo.is_admin) {
				accountRepository.deleteAccountById(id, function(error) {
					callback(error, true)
				})
			} else {
				callback(['Unauthorized'], false)
			}
		},

		updateAccountInformation: function(request, newInfo, callback){
			if (request.body.userInfo.id == id || request.body.userInfo.is_admin) {
				accountValidator.getErrorsNewInfo(newInfo, function(errors, validatedInfo) {
					if(errors) {
						console.log(errors)
						callback(errors, null, true)    
					} else {
						encryptionManager.encryptPassword(validatedInfo.password, function(error, hashedPassword) {
							if(error){
								console.log(error)
								callback(error, null, true)
							} else { 
								validatedInfo.password = hashedPassword
								console.log(validatedInfo)
								accountRepository.updateAccountInformation(validatedInfo, function(error, validatedInfo){
									if(error){
										console.log(error)
										callback(error, null, true)
									} else { 
										callback(error, validatedInfo, true)
										console.log("skickade till repo")
									}
								}) 
							}
						}) 
					}
				})
			} else {
				callback(['Unauthorized'], null, false)
			}
			
		},

		loginAccount: function(user, callback) {    
			console.log("user")  
			console.log(user)
			accountRepository.getAccountByUsername(user.username, function(error, accountGotBack) {
				console.log("got back")
				console.log(accountGotBack)
				if(error) {
					console.log(error)
				} else {
					encryptionManager.validateEncryptedPassword(user.password, accountGotBack.password, function(error, isValid) {
						if(isValid) {
							console.log("still got back")
							console.log(accountGotBack)
							callback(null, accountGotBack)
						} else {
							callback(error, null)
						}
					})
				}
			})
		}
	}
}