const reviewRepository = require('../data-access-layer/review-repository')
const reviewValidator = require('./review-validator')

exports.getAllReviews = function(callback){
	reviewRepository.getAllReviews(callback)
}

exports.getAllReviewsByName = function(name, callback){
	reviewRepository.getAllReviewsByName(name, callback)
}

exports.createReview = function(newReview, callback){
	reviewValidator.getErrorsNewReview(newReview, callback)	
}