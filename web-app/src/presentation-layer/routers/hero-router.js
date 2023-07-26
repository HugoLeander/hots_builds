const express = require('express')

module.exports = function({reviewManager, heroManager, buildManager}) {
    const router = express.Router()
    
    router.use(express.urlencoded({ extended: false}))

    router.get('/:hero_name', async function(request, response){

        const name = request.params.hero_name

        heroManager.getHeroByName(name, function(hero_errors, hero){
            buildManager.getBuildsByHeroName(name, function(build_errors, builds){
                reviewManager.getAllReviewsByHeroName(name, function(review_errors, reviews) {
                    const errors = hero_errors
                    errors.push(review_errors)
                    errors.push(build_errors)
    
                    const model = {
                        hero,
                        builds,
                        reviews,
                        errors: errors
                    }
                    
                    if(errors.lenght > 0){
                        console.log(errors)
                        response.redirect("/heroes")
                    } else {
                        response.render('hero.hbs', model)
                    }
                })
            })
        })
    })

    router.get('/:hero_name/review', function(request, response){

        const name = request.params.hero_name

        const model = {
            heroName: name
        }
        response.render("create-review.hbs", model)
    })

    router.post("/:hero_name/review", function(request, response){

        if(!request.session.isLoggedIn) {
            response.redirect("/hero/" + name)
        }
        
        const name = request.params.hero_name
        console.log("logged in user id is:")
        console.log(request.session.user_id)

        const newReview = {
            hero_name: name,
            name: request.body.name,
            rating: request.body.rating,
            description: request.body.description,
            author_account_id: request.session.user_id
        };
        
        reviewManager.createReview(request, newReview, function(errors, review, authorized){
            const model = {
                errors: errors
            }
            if(!authorized) {
                console.log("Unauthorized")
                response.redirect("/sign-in")
            }
            else if(errors.lenght > 0){
                console.log(errors)
                response.render('create-review.hbs', model)
            } else {
                console.log(review)
                response.redirect("/hero/" + name)
            }
        })
    })

    return router
}