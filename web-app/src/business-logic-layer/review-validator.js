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
			if(!newReview.hasOwnProperty("heroesName")){
				errors.push("heroes name is Missing")
			}
			if(newReview.heroesName.length < MIN_NAME_LENGTH){
				errors.push("username is Too Short")
				console.log("error min length")
			}
			if(MAX_NAME_LENGTH < newReview.heroesName.length){
				errors.push("username is Too Long")
				console.log("error max length")
			}
			reviewRepository.createReview(newReview, function(error, newReview){
		
				if(errors.length > 0){
					console.log(errors)
					console.log("crashar i validator")
				}
				else {
					callback(errors, newReview)
					console.log("skickade till repository")
				}
			})
		}
	}
}