const express = require('express')
const heroesTalents = require('heroes-talents')

module.exports = function({heroManager}) {
    const router = express.Router()

    router.get('/', async function(request,response){

        heroManager.getAllHeroes(function(errors, heroes){
            if(errors.lenght > 0){
                const model = {loadedHeroes: false}
                response.render('heroes.hbs', model)
            } else {
                const model = {
                    heroes,
                    loadedHeroes: true
                }
                response.render('heroes.hbs', model)
            }
        })
    })

    return router
}