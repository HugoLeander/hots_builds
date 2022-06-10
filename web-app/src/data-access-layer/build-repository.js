const heroesTalents = require('heroes-talents')

const numberOFTalentLevels = 7

module.exports = function ({db}) {
	return {
        createBuild: async function(newBuild, callback) {
            try {
                const heroes = await heroesTalents.loadHeroJSONFiles()
                const heroId = heroes[newBuild.hero_name].id
                const heroTalents = heroes[newBuild.hero_name]["talents"]

                if(newBuild.talents.length != numberOFTalentLevels) {
                    callback(['internalHeroDbError'], null) 
                    break
                }
                
                const query = `INSERT INTO builds (
                    name, 
                    description, 
                    hero_id, 
                    level_1_talentTreeId, 
                    level_4_talentTreeId, 
                    level_7_talentTreeId, 
                    level_10_talentTreeId, 
                    level_13_talentTreeId, 
                    level_16_talentTreeId, 
                    level_20_talentTreeId) VALUES (?)`
                const values = [
                    newBuild.name, 
                    newBuild.description, 
                    heroId, 
                    heroTalents["1"].find(element => element.sort == newBuild.talents[0]).talentTreeId, 
                    heroTalents["4"].find(element => element.sort == newBuild.talents[1]).talentTreeId, 
                    heroTalents["7"].find(element => element.sort == newBuild.talents[2]).talentTreeId, 
                    heroTalents["10"].find(element => element.sort == newBuild.talents[3]).talentTreeId, 
                    heroTalents["13"].find(element => element.sort == newBuild.talents[4]).talentTreeId, 
                    heroTalents["16"].find(element => element.sort == newBuild.talents[5]).talentTreeId, 
                    heroTalents["20"].find(element => element.sort == newBuild.talents[6]).talentTreeId]
                
                db.dbConnection.query(query, [values], function (error, build) {
                    if (error) {
                        console.log(error)
                        callback(['databaseError'], null)
                    } else {
                        callback([], build)
                    }
                })
            } catch (error) {
                callback(['buildCreationError'], null)
            }
        },

        getBuildsByHeroName: async function(name, callback) {
            try {
                const heroes = await heroesTalents.loadHeroJSONFiles()
                const hero = heroes[name]
                const id = hero.id
                const talents = hero.talents

                const talentLevels = ["1","4","7","10","13","16","20"]

                const query = `SELECT * FROM builds WHERE hero_id = ?`
			    const values = [id]

                db.dbConnection.query(query, values, function (error, builds) {
                    if (error) {
                        callback(['databaseError'], null)
                    } else {
                        const hero_builds = []

                        builds.forEach(iterBuilds => {
                            const hero_build = []
                            for (const lvl of talentLevels) {
                                const selectedTalent = talents[lvl].find(element => element.talentTreeId == iterBuilds["level_"+ lvl])
                                
                                const talentsAtThisLevel = talents[lvl].length
                                const talentTierVisual = []
                                for (let i = 1; i <= talentsAtThisLevel; i++) {
                                    if(i == selectedTalent.sort) {
                                        talentTierVisual.push({isVisible: true})
                                    }
                                    else {
                                        talentTierVisual.push({isVisible: false})
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
                                name: iterBuilds.name,
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