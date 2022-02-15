const MIN_USERNAME_LENGTH = 3
const MAX_USERNAME_LENGTH = 10

exports.getErrorsNewAccount = function(account){
	
	const errors = []
	
	// Validate username.
	if(!account.hasOwnProperty("username")){
		errors.push("username is Missing")
	}else if(account.username.length < MIN_USERNAME_LENGTH){
		errors.push("username is Too Short")
	}else if(MAX_USERNAME_LENGTH < account.username.length){
		errors.push("username is Too Long")
	}
	
	return errors
	
}