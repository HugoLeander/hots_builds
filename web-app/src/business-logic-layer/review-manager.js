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
		},

		getReviewById: function(reviewId, callback){
            reviewRepository.getReviewById(reviewId, callback)
        },

        updateReview: function (newInfo, callback) {
            reviewValidator.updateReview(newInfo, callback)
        },

        deleteReviewById: function (id, callback) {
			reviewRepository.deleteReviewById(id, callback)
		}
	}
}