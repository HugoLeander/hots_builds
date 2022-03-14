module.exports = function({db, models}) {
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
        }
    }
}