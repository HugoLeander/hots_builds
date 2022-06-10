const heroesTalents = require('heroes-talents')

const numberOFTalentLevels = 7

module.exports = function ({models}) {
	return {
        createBuild: async function(newBuild, callback) {
            
            try {
                const heroes = await heroesTalents.loadHeroJSONFiles()
                const heroId = heroes[newBuild.hero_name].id
                const heroTalents = heroes[newBuild.hero_name]["talents"]
    
                if(newBuild.talents.length != numberOFTalentLevels) {
                    callback(['internalHeroDbError'], null)
                }

				const build = await models.build.create({
					build_name: newBuild.build_name,
                    description: newBuild.build_description,
                    hero_id: heroId,
                    "level_1_talentTreeId": heroTalents["1"].find(element => element.sort == newBuild.talents[0]).talentTreeId,
                    "level_4_talentTreeId": heroTalents["4"].find(element => element.sort == newBuild.talents[1]).talentTreeId,
                    "level_7_talentTreeId": heroTalents["7"].find(element => element.sort == newBuild.talents[2]).talentTreeId,
                    "level_10_talentTreeId": heroTalents["10"].find(element => element.sort == newBuild.talents[3]).talentTreeId,
                    "level_13_talentTreeId": heroTalents["13"].find(element => element.sort == newBuild.talents[4]).talentTreeId,
                    "level_16_talentTreeId": heroTalents["16"].find(element => element.sort == newBuild.talents[5]).talentTreeId,
                    "level_20_talentTreeId": heroTalents["20"].find(element => element.sort == newBuild.talents[6]).talentTreeId
				})
				callback([], build)
			} catch (error) {
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