module.exports = function({reviewRepository, reviewValidator}) {

	return {
		getAllReviews: function(callback){
			reviewRepository.getAllReviews(callback)
		},
		
		getAllReviewsByName: function(name, callback){
			reviewRepository.getAllReviewsByName(name, callback)
		},
		
		createReview: function(newReview, callback){
			reviewValidator.getErrorsNewReview(newReview, callback)	
		}
	}
}