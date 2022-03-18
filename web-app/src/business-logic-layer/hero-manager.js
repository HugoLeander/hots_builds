module.exports = function({heroRepository}){
	return {
		getAllHeroes: function(callback) {
            heroRepository.getAllHeroes(callback)
        },
        getHeroByName: function(hero_name, callback) {
            heroRepository.getHeroByName(hero_name, callback)
        },
        getBuildsByHeroName: function(hero_name, callback) {
            heroRepository.getBuildsByHeroName(hero_name, callback)
        },
        createBuild: function(hero_name, talents, buildName, buildDescription, callback) {
            heroRepository.createBuild(hero_name, talents, buildName, buildDescription, callback)
        }
	}
}