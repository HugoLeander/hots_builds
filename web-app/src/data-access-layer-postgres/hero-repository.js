const heroesTalents = require('heroes-talents')

function countArray(arr) {
    let count = 0
    for(const i of arr) {
        count++
    }
    return count
}

module.exports = function ({models}) {
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
        },

        createBuild: async function(newBuild, callback) {
            
            try {
                const heroes = await heroesTalents.loadHeroJSONFiles()
                if(heroes.hasOwnProperty(newBuild.hero_name)) {
                    
                }
                const heroId = heroes[newBuild.hero_name].id
                const heroTalents = heroes[newBuild.hero_name]["talents"]
    
                if(countArray(newBuild.talents) != 7) {
                    //WRONG, BREAK 
                }

				const build = await models.build.create({
					build_name: newBuild.build_name,
                    description: newBuild.build_description,
                    hero_id: heroId,
                    "talentTreeId_level_1": heroTalents["1"].find(element => element.sort == newBuild.talents[0]).talentTreeId,
                    "talentTreeId_level_4": heroTalents["4"].find(element => element.sort == newBuild.talents[1]).talentTreeId,
                    "talentTreeId_level_7": heroTalents["7"].find(element => element.sort == newBuild.talents[2]).talentTreeId,
                    "talentTreeId_level_10": heroTalents["10"].find(element => element.sort == newBuild.talents[3]).talentTreeId,
                    "talentTreeId_level_13": heroTalents["13"].find(element => element.sort == newBuild.talents[4]).talentTreeId,
                    "talentTreeId_level_16": heroTalents["16"].find(element => element.sort == newBuild.talents[5]).talentTreeId,
                    "talentTreeId_level_20": heroTalents["20"].find(element => element.sort == newBuild.talents[6]).talentTreeId
				})
				callback([], build)
			} catch (error) {
				// TODO: Look for usernameUnique violation.
				console.log(error)
				callback(['databaseError'], null)
			}
        },

        getBuildsByHeroName: async function(hero_name, callback) {

			try {
                const heroes = await heroesTalents.loadHeroJSONFiles()
                const hero = heroes[hero_name]
                const heroId = hero.id
                const talents = hero["talents"]

                const talentLevels = ["1","4","7","10","13","16","20"]

				const builds = await models.build.findAll({
					where: {
						hero_id: heroId
					}
				});

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

			} catch (error) {
				callback(['databaseError'], null)
			}
        }
	}
}