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
        }
    }
}