const express = require('express')

module.exports = function({accountManager}){
	const router = express.Router()
router.use(express.urlencoded({ extended: false}))

router.get("/sign-in", function(request, response){
	response.render("accounts-sign-in.hbs")
})

router.get("/", function(request, response){
	accountManager.getAllAccounts(function(errors, accounts){
		const model = {
			errors: errors,
			accounts: accounts
		}
		response.render("accounts-list-all.hbs", model)
	})
})

router.post("/sign-in", function(request, response){
	const user = {
		username: request.body.username,
		password: request.body.password
	}

	accountManager.loginAccount(user, function(error, loggedInUser) {
		const model = {
			errors: error
		}
		if(error) {
			response.render("accounts-sign-up.hbs", model)
			console.log("could not login")
		} else {
			request.session.isLoggedIn = true
			console.log("logged in user is:")
			console.log(loggedInUser)
			console.log("logged in user id is:")
			console.log(loggedInUser.id)
			request.session.user_id = loggedInUser.id
			response.redirect('/')
			console.log("Successfull login")
		}
	}) 
})

router.get("/sign-up", function(request, response){
	response.render("accounts-sign-up.hbs")
})

router.post("/sign-up", function(request, response){
	
	const newUser = {
		username: request.body.username,
		password: request.body.password,
		confirm_password: request.body.confirm_password
	}
	
	accountManager.createAccount(newUser, function(errors, user){
		
		const model = {
			errors: errors
		}

		if(errors.lenght > 0){
			console.log(errors)
			response.render('accounts-sign-up.hbs', model)
		} else {
			console.log(user)
			response.redirect("/accounts/sign-in")
		}
	})
})


router.get('/:username', function(request, response){
	
	const username = request.params.username
	
	accountManager.getAccountByUsername(username, function(errors, account){
		const model = {
			errors: errors,
			account: account
		}
		response.render("accounts-show-one.hbs", model)
	})
})

router.post('/log-out', async function(request, response){
	request.session.isLoggedIn = false
	response.redirect('/')
    console.log("Logged out")
})

	return router
}