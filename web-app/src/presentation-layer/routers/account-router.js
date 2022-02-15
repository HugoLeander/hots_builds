const express = require('express')
const accountManager = require('../../business-logic-layer/account-manager')
const dbConnection = require('../../data-access-layer/db')

const router = express.Router()



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
	
	const username = request.params.username
	const password = request.params.password

	accountManager.createAccount(username, password, function(account, errors){
		const model = {
			errors: errors,
			account: account
		}
		response.render("accounts-sign-up.hbs", model)
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