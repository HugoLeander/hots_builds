const { response } = require('express')

const MIN_USERNAME_LENGTH = 3
const MAX_USERNAME_LENGTH = 10

module.exports = function({accountRepository}) {

	return {
		getErrorsNewAccount: function(newUser, callback){
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
			if(errors.length > 0) {
				console.log(errors)
			} else {
				accountRepository.createAccount(newUser, function(error, newUser){
					if(error){
						console.log(error)
					} else {
						callback(error, newUser)
						console.log("skickade till repo")
					}
				})
			}
		},


		getErrorsNewInfo: function(newInfo, callback){
			const errors = []
			//console.log(newInfo)
			// Validate username.
			if(!newInfo.hasOwnProperty("username")){
				errors.push("username is Missing")
			}
			if(newInfo.username.length < MIN_USERNAME_LENGTH){
				errors.push("username is Too Short")
				console.log("error min length")
			}
			if(MAX_USERNAME_LENGTH < newInfo.username.length){
				errors.push("username is Too Long")
				console.log("error max length")
			}
			if(newInfo.password != newInfo.confirm_password){
				errors.push("Passwords don't match")
				console.log("passwords dont match")
			}

			if(errors.length > 0) {
				console.log(errors)
			} else {
				accountRepository.updateAccountInformation(newInfo, function(error, newInfo){
					if(error){
						callback(error)
					} else {
						callback(error, newInfo)
						console.log("skickade till repo")
					}
				})
			}
		}
	}
}