const heroesTalents = require('heroes-talents')

module.exports = function ({}) {
	return {
		getAllHeroes: async function(callback) {
            console.log("all")
            try {
                const heroes = await heroesTalents.loadHeroJSONFiles()
                callback([], heroes)
            } catch {
                callback(['heroDatabaseError'], null)
            }
        },

        getHeroByName: async function(hero_name, callback) {
            console.log(hero_name)
            try {
                const heroes = await heroesTalents.loadHeroJSONFiles()
                const hero = heroes[hero_name]
                callback([], hero)
            } catch {
                callback(['heroDatabaseError'], null)
            }
        }
	}
}



