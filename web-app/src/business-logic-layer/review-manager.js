module.exports = function({reviewRepository, reviewValidator}) {

	return {
		getAllReviews: function(callback){
			reviewRepository.getAllReviews(callback)
		},
		
		getAllReviewsByHeroName: function(name, callback){
			reviewRepository.getAllReviewsByHeroName(name, callback)
		},
		
		createReview: function(request, newReview, callback){
			if(request.session.isLoggedIn) {
				reviewValidator.getErrorsNewReview(newReview, function(error, review) {
					if(error) {
						console.log(`Error creating review: ${error}`);
						callback(['An error occured when creating a review'], null);
					} else {
						
						callback([], review, true)
					}
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
					if((request.session.user_id == review.authorId || request.body.userInfo.is_admin) && request.session.isLoggedIn) {
						reviewValidator.getErrorsNewInfo(newInfo, function(errors) {
							if(errors.length > 0) {
								callback(['An error occured in review validator when updating a review'], null, false);
							} else {
								accountRepository.updateReview(newInfo, function(error, newInfo){ 
									if(error){
										console.log(`Error updating review: ${error}`);
										callback(['An error occured when updating a review'], null);
									} else {
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