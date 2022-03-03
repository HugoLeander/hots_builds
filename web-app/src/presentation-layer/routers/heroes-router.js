const express = require('express')
const router = express.Router()
const heroesTalents = require('heroes-talents')

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

module.exports = router