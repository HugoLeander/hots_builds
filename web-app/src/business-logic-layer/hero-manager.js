module.exports = function({heroRepository}){
	return {
		getAllHeroes: function(callback) {
            heroRepository.getAllHeroes(callback)
        },
        getHeroByName: function(hero_name, callback) {
            heroRepository.getHeroByName(hero_name, callback)
        }
	}
}