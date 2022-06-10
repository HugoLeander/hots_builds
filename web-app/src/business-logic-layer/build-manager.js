module.exports = function({buildRepository}){
	return {
        getBuildsByHeroName: function(hero_name, callback) {
            buildRepository.getBuildsByHeroName(hero_name, callback)
        },
        createBuild: function(request, newBuild, callback) {
            if (request.body.userInfo.is_admin) {
				buildRepository.createBuild(newBuild, function(error, build) {
					callback(error, build, true)
				})
			} else {
				callback(['Unauthorized'], null, false)
			}

            
        }
	}
}