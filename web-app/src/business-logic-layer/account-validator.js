const accountRepository = require('../data-access-layer/account-repository')

const MIN_USERNAME_LENGTH = 3
const MAX_USERNAME_LENGTH = 10

exports.getErrorsNewAccount = function(newUser, callback){
	
	const errors = []
	

	console.log(newUser)
	// Validate username.
	if(!newUser.hasOwnProperty("username")){
		errors.push("username is Missing")
	}
	if(newUser.username.length < MIN_USERNAME_LENGTH){
		errors.push("username is Too Short")
		console.log("error min length")
	}
	if(MAX_USERNAME_LENGTH < newUser.username.length){
		errors.push("username is Too Long")
		console.log("error max length")
	}
	if(newUser.password != newUser.confirm_password){
		errors.push("Passwords don't match")
		console.log("passwords dont match")
	}
	accountRepository.createAccount(newUser, function(errors, newUser){

		if(errors.length > 0){
			console.log(errors)
		}
		else {
			callback(errors, newUser)
		}
	})
	console.log("skickade till repository")	
}