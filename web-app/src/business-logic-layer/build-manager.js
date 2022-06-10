module.exports = function({buildRepository}){
	return {
        getBuildsByHeroName: function(hero_name, callback) {
            buildRepository.getBuildsByHeroName(hero_name, callback)
        },
        createBuild: function(request, hero_name, talents, buildName, buildDescription, callback) {
            if (request.body.userInfo.is_admin) {
				buildRepository.createBuild(hero_name, talents, buildName, buildDescription, function(error, build) {
					callback(error, build, true)
				})
			} else {
				callback(['Unauthorized'], null, false)
			}

            
        }
	}
}