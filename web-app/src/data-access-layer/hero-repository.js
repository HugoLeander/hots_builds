const heroesTalents = require('heroes-talents')

function countArray(arr) {
    let count = 0
    for(const i of arr) {
        count++
    }
    return count
}

module.exports = function ({db}) {
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
            console.log("name")
            try {
                const heroes = await heroesTalents.loadHeroJSONFiles()
                const hero = heroes[hero_name]
                callback([], hero)
            } catch {
                callback(['heroDatabaseError'], null)
            }
        },

        createBuild: async function(newBuild, callback) {

            const heroes = await heroesTalents.loadHeroJSONFiles()
            const heroId = heroes[newBuild.hero_name].id
            const heroTalents = heroes[newBuild.hero_name]["talents"]

            if(countArray(newBuild.talents) != 7) {
                //WRONG, BREAK 
            }
            
            const query = `INSERT INTO builds (build_name, description, hero_id, talentTreeId_level_1, talentTreeId_level_4, talentTreeId_level_7, talentTreeId_level_10, talentTreeId_level_13, talentTreeId_level_16, talentTreeId_level_20) VALUES (?)`
			const values = [newBuild.build_name, newBuild.build_description, heroId, heroTalents["1"].find(element => element.sort == newBuild.talents[0]).talentTreeId, heroTalents["4"].find(element => element.sort == newBuild.talents[1]).talentTreeId, heroTalents["7"].find(element => element.sort == newBuild.talents[2]).talentTreeId, heroTalents["10"].find(element => element.sort == newBuild.talents[3]).talentTreeId, heroTalents["13"].find(element => element.sort == newBuild.talents[4]).talentTreeId, heroTalents["16"].find(element => element.sort == newBuild.talents[5]).talentTreeId, heroTalents["20"].find(element => element.sort == newBuild.talents[6]).talentTreeId]
			
            db.dbConnection.query(query, [values], function (error, build) {
				if (error) {
                    console.log(error)
					callback(['databaseError'], null)
				} else {
					callback([], build)
				}
			})
        },

        getBuildsByHeroName: async function(hero_name, callback) {
            try {
                const heroes = await heroesTalents.loadHeroJSONFiles()
                const hero = heroes[hero_name]
                const hero_id = hero.id
                const talents = hero["talents"]

                const talentLevels = ["1","4","7","10","13","16","20"]

                const query = `SELECT * FROM builds WHERE hero_id = ?`
			    const values = [hero_id]

                db.dbConnection.query(query, values, function (error, builds) {
                    if (error) {
                        callback(['databaseError'], null)
                    } else {
                        const hero_builds = []

                        builds.forEach(iterBuilds => {
                            const hero_build = []
                            for (const lvl of talentLevels) {
                                const selectedTalent = talents[lvl].find(element => element.talentTreeId == iterBuilds["talentTreeId_level_"+ lvl])
                                
                                const talentsAtThisLevel = countArray(talents[lvl])
                                const talentTierVisual = []
                                for (let i = 1; i <= talentsAtThisLevel; i++) {
                                    if(i == selectedTalent.sort) {
                                        talentTierVisual.push({isTrue: true})
                                    }
                                    else {
                                        talentTierVisual.push({isTrue: false})
                                    }
                                  }

                                const talent = {
                                name: selectedTalent.name,
                                available_at: "Level " + lvl,
                                description: selectedTalent.description,
                                icon: "/images/talents/" + selectedTalent.icon,
                                type: selectedTalent.type,
                                talent_tier_visual: talentTierVisual
                                }

                                hero_build.push(talent)
                            }
                            const selected_build = {
                                build_name: iterBuilds.build_name,
                                description: iterBuilds.description,
                                talents: hero_build
                            }
                            hero_builds.push(selected_build)
                        });
                        
                        callback([], hero_builds)
                    }
                })
            } catch {
                callback(['heroDatabaseError'], null)
            }
        }
	}
}