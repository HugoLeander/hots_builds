const { response } = require('express')

const MIN_USERNAME_LENGTH = 3
const MAX_USERNAME_LENGTH = 10

module.exports = function({accountRepository}) {

	return {
		getErrorsNewAccount: function(newUser, callback){
			const errors = []
			console.log(newUser)
			if(!newUser.hasOwnProperty("username")){
				errors.push("username is Missing")
			}
			if(newUser.username.length < MIN_USERNAME_LENGTH){
				errors.push("username needs to be minimum 3 characters")
			}
			else if(MAX_USERNAME_LENGTH < newUser.username.length){    
				errors.push("username needs to be less than 10 characters") 	
			}
			if(newUser.password != newUser.confirm_password){
				errors.push("Passwords don't match")
			}
			if(errors.length > 0) {
				callback(errors, newUser)
			} else {
				callback(null, newUser)
			}
		},

		getErrorsNewInfo: function(newInfo, callback){
			const errors = []
			if(!newInfo.hasOwnProperty("username")){ 
				errors.push("username is Missing")
			}
			if(newInfo.username.length < MIN_USERNAME_LENGTH){
				errors.push("username is Too Short, min length is 3 characters")
				console.log("error min length")
			}
			else if(MAX_USERNAME_LENGTH < newInfo.username.length){
				errors.push("username is Too Long, max length is 10 characters")
				console.log("error max length")
			}
			if(newInfo.password != newInfo.confirm_password){
				errors.push("Passwords don't match")
				console.log("passwords dont match")
			}
			if(errors.length > 0) { 
				callback(errors, newInfo)
			} else {
				callback(null, newInfo)
			}	
		}
	}
}