module.exports = function({reviewRepository, reviewValidator}) {

	return {
		getAllReviews: function(callback){
			reviewRepository.getAllReviews(callback)
		},
		
		getAllReviewsByName: function(name, callback){
			reviewRepository.getAllReviewsByName(name, callback)
		},
		
		createReview: function(request, newReview, callback){
			if(request.session.isLoggedIn) {
				reviewValidator.getErrorsNewReview(newReview, function(error, review) {
					callback(error, review, true)
				})	
			} else {
				callback(['Unauthorized'], null, false)
			}
		},

		getReviewById: function(reviewId, callback){
            reviewRepository.getReviewById(reviewId, callback)
        },

		getAllReviewsByAuthorId: function(authorId, callback) {
			reviewRepository.getAllReviewsByAuthorId(authorId, callback)
		},

        updateReview: function (request, newInfo, callback) {
			reviewRepository.getReviewById(request.params.id, function(error, review) {
				if(error) {
					callback(error, null, false)
				} else {
					if(request.session.user_id == review.authorId || request.body.userInfo.is_admin) {
						reviewValidator.getErrorsNewInfo(newInfo, function(errors) {
							if(errors.length > 0) {

							} else {
								accountRepository.updateReview(newInfo, function(error, newInfo){ 
									if(error){
										console.log(error)
										callback(error, null, true)
									} else {
										console.log("skickade till repo")
										callback([], newInfo, true)
									}
								})
							}
						}) 
					} else {
						callback(['Unauthorized'], null, false)
					}
				}
			})
        },

        deleteReviewById: function (id, callback) {
			reviewRepository.deleteReviewById(id, callback)
		}
	}
}