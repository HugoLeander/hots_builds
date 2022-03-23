const { response } = require('express')

const MIN_NAME_LENGTH = 3
const MAX_NAME_LENGTH = 20

module.exports = function({reviewRepository}) {
	return {
		getErrorsNewReview: function(newReview, callback){
	
			const errors = []
		
			console.log(newReview)
			// Validate username.  
			if(!newReview.hasOwnProperty("name")){
				errors.push("name is Missing")
			}
			if(!newReview.hasOwnProperty("hero_name")){
				errors.push("heroes name is Missing")
			}
			if(newReview.name.length < MIN_NAME_LENGTH){
				errors.push("name is Too Short")
				console.log("error min length")
			}
			if(MAX_NAME_LENGTH < newReview.name.length){
				errors.push("name is Too Long")
				console.log("error max length")
			}
			reviewRepository.createReview(newReview, function(error, newReview){
		
				if(errors.length > 0){
					console.log(errors)
					console.log("crashar i validator")
				}
				else {
					console.log("skickade till repository")
					callback(errors, newReview)
				}
			})
		},
		getErrorsNewInfo: function(newInfo, callback){
			const errors = []
			//console.log(newInfo)
			// Validate username.
			if(!newInfo.hasOwnProperty("name")){
				errors.push("name is Missing")
			}
			if(!newInfo.hasOwnProperty("heroesName")){
				errors.push("heroes name is Missing")
			}
			if(newInfo.name.length < MIN_NAME_LENGTH){
				errors.push("name is Too Short")
				console.log("error min length")
			}
			if(MAX_NAME_LENGTH < newInfo.name.length){
				errors.push("name is Too Long")
				console.log("error max length")
			}
			if(errors.length > 0) {
				console.log(errors)
			} else {
				accountRepository.updateReview(newInfo, function(error, newInfo){ 
					if(error){
						console.log(error)
						callback(error, null)
					} else {
						console.log("skickade till repo")
						callback(error, newInfo)
					}
				})
			}
		}
	}
}