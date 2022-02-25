const express = require('express')
const accountManager = require('../../business-logic-layer/account-manager')
const dbConnection = require('../../data-access-layer/db')

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
		
		if(0 < errors.lenght){
			console.log(errors)
		} else {
			console.log(user)
			response.redirect("/")
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

module.exports = router