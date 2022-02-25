const accountRepository = require('../data-access-layer/account-repository')
const accountValidator = require('./account-validator')

exports.getAllAccounts = function(callback){
	accountRepository.getAllAccounts(callback)
}

exports.createAccount = function(newUser, callback){
	accountValidator.getErrorsNewAccount(newUser, callback)	
}

exports.getAccountByUsername = function(username, callback){
	accountRepository.getAccountByUsername(username, callback)
}