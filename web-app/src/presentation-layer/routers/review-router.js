const express = require('express')
const router = express.Router()
const reviewManager = require('../../business-logic-layer/review-manager')
router.use(express.urlencoded({ extended: false}))

router.get("/", function(request, response){
	response.render("create-review.hbs")
})

router.post("/", function(request, response){
	
	const newReview = {
		heroesName: request.body.heroesName,
		name: request.body.name,
		rating: request.body.rating,
		description: request.body.description 
	};
	

	reviewManager.createReview(newReview, function(errors, review){
		
		const model = {
			errors: errors
		}
		if(errors.lenght > 0){
			console.log(errors)
			response.render('create-review.hbs', model)
		} else {
			console.log(review)
			response.redirect("/")
		}
	})
})


module.exports = router