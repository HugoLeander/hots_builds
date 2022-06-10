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
				errors.push("name is Too Short, min is 3 characters")
				console.log("error min length")
			}
			else if(MAX_NAME_LENGTH < newReview.name.length){
				errors.push("name is Too Long, max is 20 characters")
				console.log("error max length")
			}

			if(errors.length > 0) {
				callback(errors, null)
			} else {
				reviewRepository.createReview(newReview, function(error, newReview){
		
					if(error){
						console.log(error)
						callback(error, null)
					}
					else {
						console.log("skickade till repository")
						callback([], newReview)
					}
				})
			}
			
		},
		getErrorsNewInfo: function(newInfo, callback){
			const errors = []
			if(!newInfo.hasOwnProperty("name")){
				errors.push("name is Missing")
			}
			if(!newInfo.hasOwnProperty("heroesName")){
				errors.push("heroes name is Missing")
			}
			if(newInfo.name.length < MIN_NAME_LENGTH){
				errors.push("name is Too Short, min is 3 characters")
				console.log("error min length")
			}
			else if(MAX_NAME_LENGTH < newInfo.name.length){
				errors.push("name is Too Long, max is 20 characters")
				console.log("error max length")
			}
			
			console.log(errors)
			callback(errors)
		}
	}
}