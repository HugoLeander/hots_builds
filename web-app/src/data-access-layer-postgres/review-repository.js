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
                    hero_name: newReview.heroesName,
                    name: newReview.name,
                    rating: newReview.rating,
                    description: newReview.description
                })
                callback([], newReview)
			} catch (error) {
				// TODO: Look for usernameUnique violation.
                callback(['databaseError'], null)
			}
        },
        getReviewById: function(reviewId, callback){
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
        updateReview: function (newInfo, callback) {
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

				console.log("Uppdaterade!")
                callback([], newInfo)
			} catch (error) {
				console.log("error i databasen")
                callback(['databaseError'], null)
			}
        },
        deleteReviewById: function (id, callback) {
            try {
                await models.reveiw.destroy({
                    where: {
                        review_id: id
                    }
                })
                callback([])
            } catch (error) {
                callback(['databaseError'], null)
            }
        }
    }
}