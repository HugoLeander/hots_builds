module.exports = function({db}) {
    return {
        getAllReviews: function(callback){
            const query = "SELECT * FROM reviews"
            const values = []
        
            db.dbConnection.query(query, values, function(error, reviews){
                if(error) {
                    callback(['databaseError'], null)
                } else {
                    callback([], reviews)
                }
            })
        },
        
        getAllReviewsByName: function(hero_name, callback){
            const query = "SELECT * FROM reviews WHERE hero_name = ?"
            const values = [hero_name]
            db.dbConnection.query(query, values, function(error, reviews){
                if(error) {
                    callback(['databaseError'], null)
                } else {
                    callback([], reviews)
                }
            })
        },
        
        createReview: function (newReview, callback) {
        
            const query = `INSERT INTO reviews (hero_name, name, rating, description) VALUES (?, ?, ?, ?)`
            const values = [newReview.hero_name, newReview.name, newReview.rating, newReview.description]
        
            db.dbConnection.query(query, values, function (error, newReview) {
                if (error) {
                    // TODO: Look for usernameUnique violation.
                    callback(['databaseError'], null)
                } else {
                    callback([], newReview)
                }
            })
        },

        getReviewById: function(review_id, callback){
            const query = "SELECT * FROM reviews WHERE review_id = ? LIMIT 1"
            const values = [review_id]
            db.dbConnection.query(query, values, function(error, review){
                if(error) {
                    callback(['databaseError'], null)
                } else {
                    callback([], review)
                }
            })
        },
        updateReview: function (newInfo, callback) {
            const query = `UPDATE reviews SET hero_name = ?, name = ?, rating = ?, description = ? WHERE review_id = ?`
            const values = [newInfo.hero_name, newInfo.name, newInfo.rating, newInfo.description, newInfo.review_id]
        
            db.dbConnection.query(query, values, function (error, newInfo) {
                if (error) {
                    console.log("error i databasen")
                    callback(['databaseError'], null)
                } else {
                    console.log("Uppdaterade!")
                    callback([], newInfo)
                }
            })
        },
        deleteReviewById: function (id, callback) {
        
            const query = `DELETE FROM reviews WHERE review_id = ? LIMIT 1`
            const values = id
        
            db.dbConnection.query(query, values, function (error, review) {
                if (error) {
                    // TODO: Look for usernameUnique violation.
                    callback(['databaseError'])
                } else {
                    callback([])
                }
            })
        }

    }
}