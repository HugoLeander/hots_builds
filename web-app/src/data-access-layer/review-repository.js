const db = require('./db')

exports.getAllReviews = function(callback){
    const query = "SELECT * FROM reviews"
    const values = []

    db.query(query, values, function(error, reviews){
        if(error) {
            callback(['databaseError'], null)
        } else {
            callback([], reviews)
        }
    })
}

exports.getAllReviewsByName = function(heroesName, callback){
    const query = "SELECT * FROM reviews WHERE heroesName = ?"
    const values = [heroesName]

    db.query(query, values, function(error, reviews){
        if(error) {
            callback(['databaseError'], null)
        } else {
            callback([], reviews)
        }
    })
}

exports.createReview = function (newReview, callback) {

	const query = `INSERT INTO reviews (heroesName, name, rating, description) VALUES (?, ?, ?, ?)`
	const values = [newReview.heroesName, newReview.name, newReview.rating, newReview.description]

	db.query(query, values, function (error, newReview) {
		if (error) {
			// TODO: Look for usernameUnique violation.
			callback(['databaseError'], null)
		} else {
			callback([], newReview)
		}
	})
}