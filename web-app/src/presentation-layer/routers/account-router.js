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

	accountManager.getAccountByUsername(user, function(errors, userGotBack){

		const model = {
			errors: errors
		}
		if(user.password == userGotBack.password){
			request.session.isLoggedIn = true
			response.redirect('/')
			console.log("Successfull login")
		} else {
			response.render("accounts-sign-up.hbs", model)
			console.log("could not login")
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
			response.redirect("/sign-in")
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