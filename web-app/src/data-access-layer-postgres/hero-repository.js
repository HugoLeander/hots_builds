const heroesTalents = require('heroes-talents')

module.exports = function () {
	return {
		getAllHeroes: async function(callback) {
            try {
                const result = await heroesTalents.loadHeroJSONFiles()

                let heroes = []

                Object.entries(result).forEach(([key, eachHero]) => {

                    let hero = {
                        id: eachHero.id,
                        shortName: eachHero.shortName,
                        name: eachHero.name,
                        icon: eachHero.icon,
                        role: eachHero.role,
                        expandedRole: eachHero.expandedRole,
                        type: eachHero.type
                    }
                    heroes.push(hero)
                })

                callback([], heroes)
            } catch (error) {
                console.log(error)
                callback(['heroDatabaseError'], null)
            }
        },
 
        getHeroByName: async function(hero_name, callback) {
            try {
                const heroes = await heroesTalents.loadHeroJSONFiles()
                const selectedHero = heroes[hero_name]
                const hero = {
                        id: selectedHero.id,
                        shortName: selectedHero.shortName,
                        name: selectedHero.name,
                        icon: selectedHero.icon,
                        role: selectedHero.role,
                        expandedRole: selectedHero.expandedRole,
                        type: selectedHero.type
                }
                callback([], hero)
            } catch {
                callback(['heroDatabaseError'], null)
            }
        }
	}
}