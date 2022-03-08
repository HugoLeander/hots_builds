const express = require('express')
const heroesTalents = require('heroes-talents')

module.exports = function({}) {
    const router = express.Router()

    router.get('/', async function(request,response){

        try {
            const heroes = await heroesTalents.loadHeroJSONFiles()
            const model = {heroes,
            loadedHeroes: true}
            response.render('heroes.hbs', model)
        } catch {
            const model = {loadedHeroes: false}
            response.render('heroes.hbs', model)
        }
    })

    return router
}