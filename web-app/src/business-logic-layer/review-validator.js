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
				errors.push("Name is Missing")
			}
			if(!newReview.hasOwnProperty("hero_name")){
				errors.push("Heroes name is Missing")
			}
			if(newReview.name.length < MIN_NAME_LENGTH){
				errors.push("Name is Too Short, min is 3 characters")
				console.log("error min length")
			}
			else if(MAX_NAME_LENGTH < newReview.name.length){
				errors.push("Name is Too Long, max is 20 characters")
				console.log("error max length")
			}

			callback(errors, null);
			
		},
		getErrorsNewInfo: function(newInfo, callback){
			const errors = []
			if(!newInfo.hasOwnProperty("name")){
				errors.push("Name is Missing")
			}
			if(!newInfo.hasOwnProperty("heroesName")){
				errors.push("Heroes name is Missing")
			}
			if(newInfo.name.length < MIN_NAME_LENGTH){
				errors.push("Name is Too Short, min is 3 characters")
				console.log("error min length")
			}
			else if(MAX_NAME_LENGTH < newInfo.name.length){
				errors.push("Name is Too Long, max is 20 characters")
				console.log("error max length")
			}
			
			console.log(errors)
			callback(errors)
		}
	}
}