module.exports = function({db}) {
    return {
        getAllReviews: function(callback){
            const query = "SELECT * FROM reviews"
            const values = []
        
            db.dbConnection.query(query, values, function(error, reviews){
                if(error) {
                    callback(['errorFetchingAllReviews'], null)
                } else {
                    callback([], reviews)
                }
            })
        },
        
        getAllReviewsByHeroName: function(hero_name, callback){
            const query = "SELECT * FROM reviews WHERE hero_name = ?"
            const values = [hero_name]
            db.dbConnection.query(query, values, function(error, reviews){
                if(error) {
                    callback(['errorGettingAllReviewsForSpecificHero'], null)
                } else {
                    callback([], reviews)
                }
            })
        },
        
        createReview: function (newReview, callback) {
        
            const query = `INSERT INTO reviews (hero_name, name, rating, description, author_id) VALUES (?, ?, ?, ?, ?)`
            const values = [newReview.hero_name, newReview.name, newReview.rating, newReview.description, newReview.author_account_id]
        
            db.dbConnection.query(query, values, function (error, newReview) {
                if (error) {
                    callback(['errorCreatingReview'], null)
                } else {
                    callback([], newReview)
                }
            })
        },

        getReviewById: function(id, callback){
            const query = "SELECT * FROM reviews WHERE id = ? LIMIT 1"
            const values = [id]
            db.dbConnection.query(query, values, function(error, review){
                if(error) {
                    callback(['errorFetchingReviewById'], null)
                } else {
                    callback([], review)
                }
            })
        },
        updateReview: function (newInfo, callback) {
            const query = `UPDATE reviews SET hero_name = ?, name = ?, rating = ?, description = ? WHERE id = ?`
            const values = [newInfo.hero_name, newInfo.name, newInfo.rating, newInfo.description, newInfo.id]
        
            db.dbConnection.query(query, values, function (error, newInfo) {
                if (error) {
                    callback(['errorUpdatingReview'], null)
                } else {
                    callback([], newInfo)
                }
            })
        },
        deleteReviewById: function (id, callback) {
        
            const query = `DELETE FROM reviews WHERE id = ? LIMIT 1`
            const values = id
        
            db.dbConnection.query(query, values, function (error, review) {
                if (error) {
                    callback(['errorDeletingReview'])
                } else {
                    callback([])
                }
            })
        },
        getAllReviewsByAuthorId: function(authorId, callback) {
            const query = "SELECT * FROM reviews WHERE author_account_id = ?"
            const values = [authorId]
            db.dbConnection.query(query, values, function(error, reviews){
                if(error) {
                    callback(error, null)
                } else {
                    callback([], reviews)
                }
            })
        }

    }
}