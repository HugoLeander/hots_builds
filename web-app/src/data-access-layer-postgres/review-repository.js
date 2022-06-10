module.exports = function({models}) {
    return {
        getAllReviews: async function(callback){
            try {
                const result = await models.review.findAll();

                const reviews = []
                result.forEach(e => {
                    reviews.push(e.dataValues)
                });

                callback([], reviews)
            } catch (error) {
                callback(['databaseError'], null)
            }
        },
        getAllReviewsByName: async function(heroesName, callback){

            try {
                const result = await models.review.findAll({
					where: {
						hero_name: heroesName
					}
					});

                const reviews = []
                result.forEach(e => {
                    reviews.push(e.dataValues)
                });
                
                callback([], reviews)
            } catch (error) {
                callback(['databaseError'], null)
            }
        },
        createReview: async function (newReview, callback) {

            try {
				const review = await models.review.create({
                    hero_name: newReview.hero_name,
                    name: newReview.name,
                    rating: newReview.rating,
                    description: newReview.description,
                    author_account_id: newReview.author_account_id
                })
                callback([], review)
			} catch (error) {
                console.log("error", error)
                callback(['databaseError'], null)
			}
        },
        getReviewById: async function(reviewId, callback){
            try {
                const result = await models.review.findAll({
					where: {
						review_id: reviewId
					},
                    Limit: 1
					});

                const foundReview = result[0].dataValues
                
                callback([], foundReview)
            } catch (error) {
                callback(['databaseError'], null)
            }
        },
        updateReview: async function (newInfo, callback) {
            try {
				await models.review.update({ 
                    hero_name: newInfo.hero_name, 
                    name: newInfo.name, 
                    rating: newInfo.rating, 
                    description: newInfo.description}, {
					where: {
					review_id: newInfo.review_id
					}
				})

                callback([], newInfo)
			} catch (error) {
				console.log("error i databasen")
                callback(['databaseError'], null)
			}
        },
        deleteReviewById: async function (id, callback) {
            try {
                await models.review.destroy({
                    where: {
                        review_id: id
                    }
                })
                callback([])
            } catch (error) {
                console.log(error)
                callback(error, null)
            }
        },
        getAllReviewsByAuthorId: async function(authorId, callback) {
            try {
                const results = await models.review.findAll({
					where: {
						author_account_id: authorId
					},
                    Limit: 1
					});

                const foundReviews = []
                results.forEach(e => {
                    foundReviews.push(e.dataValues)
                });
                
                callback([], foundReviews)
            } catch (error) {
                callback(error, null)
            }
        }
    }
}