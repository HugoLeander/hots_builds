module.exports = function ({ reviewRepository, reviewValidator }) {

	return {
		getAllReviews: function (callback) {
			reviewRepository.getAllReviews(callback)
		},

		getAllReviewsByHeroName: function (name, callback) {
			reviewRepository.getAllReviewsByHeroName(name, callback)
		},

		createReview: function (isLoggedIn, newReview, callback) {
			if (isLoggedIn) {
				reviewValidator.getErrorsNewReview(newReview, function (errors, review) {
					if (errors.length > 0) {
						console.log(`Error creating review: ${errors}`);
						callback([errors], null);
					} else {
						reviewRepository.createReview(newReview, function (errors, createdReview) {
							if (errors.length > 0) {
								callback([errors], null);
							} else {
								callback([], createdReview, true);
							}
						});
					}
				});
			} else {
				callback(['Unauthorized'], null, false);
			}
		},

		getReviewById: function (reviewId, callback) {
			reviewRepository.getReviewById(reviewId, callback)
		},

		getAllReviewsByAuthorId: function (authorId, callback) {
			reviewRepository.getAllReviewsByAuthorId(authorId, callback)
		},

		updateReview: function (request, newInfo, callback) {
			reviewRepository.getReviewById(request.params.id, function (errors, review) {
				if (errors.length > 0) {
					callback(errors, null, false)
				} else {
					if ((request.session.user_id == review.authorId || request.body.userInfo.is_admin) && request.session.isLoggedIn) {
						reviewValidator.getErrorsNewInfo(newInfo, function (errors) {
							if (errors.length > 0) {
								callback(['An error occured in review validator when updating a review'], null, false);
							} else {
								accountRepository.updateReview(newInfo, function (errors, newInfo) {
									if (errors.length > 0) {
										console.log(`Error updating review: ${errors}`);
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