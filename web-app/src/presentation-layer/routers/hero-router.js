const express = require('express')
const router = express.Router()
const reviewManager = require('../../business-logic-layer/review-manager')
const heroesTalents = require('heroes-talents')
router.use(express.urlencoded({ extended: false}))

router.get('/:heroName', async function(request, response){

    const name = request.params.heroName

    try {
        const heroes = await heroesTalents.loadHeroJSONFiles()
        const hero = heroes[name]
        reviewManager.getAllReviewsByName(name, function(errors, reviews){
            const model = {
                hero,
                errors: errors,
                reviews: reviews
            }
            response.render('hero.hbs', model)
        })
        
    } catch {
        //TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        response.render('bruisers.hbs')
    }
})

router.get('/:heroName/review', function(request, response){
    //TODO add validation so that the hero exists
    //TODO add errors

    const name = request.params.heroName

    const model = {
        heroName: name
    }
    response.render("create-review.hbs", model)
})

module.exports = router


router.get("/", function(request, response){
	response.render("create-review.hbs")
})

router.post("/:heroName/review", function(request, response){
	
    //TODO add validation so that the hero exists
    //TODO fix how we use the name of the hero when creating reviews

    const name = request.params.heroName

	const newReview = {
		heroesName: name,
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
			response.redirect("/hero/" + name)
		}
	})
})
