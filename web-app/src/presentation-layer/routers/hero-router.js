const express = require('express')
const router = express.Router()
const reviewManager = require('../../business-logic-layer/review-manager')
const heroesTalents = require('heroes-talents')

router.get('/:heroName', async function(request, response){

    const name = request.params.heroName

    try {
        const heroes = await heroesTalents.loadHeroJSONFiles()
        const hero = heroes[name]
        console.log(hero)

        const model = {
            hero
        }
        response.render('hero.hbs', model)

    } catch {
        //TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }
})


// TO BE REMOVED
router.get('/azmodan', function(request, response){
    const heroesName = "Azmodan"
    reviewManager.getAllReviewsByName(heroesName, function(errors, reviews){
		const model = {
			errors: errors,
			reviews: reviews
		}
        response.render('azmodan.hbs', model)
	})
})

module.exports = router