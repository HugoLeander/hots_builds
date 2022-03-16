const express = require('express')
const bodyParser = require('body-parser')

module.exports = function ({ accountManager }) {

    const router = express.Router()

    router.use(function (request, response, next) {
        console.log(request.method, request.url)
        next()
    })

    router.use(bodyParser.json())

    router.get("/", function (request, response) {
        accountManager.getAllAccounts(function(errors, accounts){
            if(errors.length > 0) {
                response.status(400).json(errors)
            } else {
                response.status(200).json(accounts)
            }
        })
    })

    router.get("/:id", function (request, response) {

        const id = request.params.id 

        accountManager.getAllAccounts(function(errors, accounts){
            if(errors.length > 0) {
                response.status(400).json(errors)
            } else {
                const account = accounts.find(a => a.account_id == id)

                if(account) {
                    response.status(200).json(account)
                } else {
                    response.status(404).end()
                }
            }
        })
    })

    router.post("/", function (request, response) {

        const newAccount = {
            username: request.body.username,
            password: request.body.password,
            confirm_password: request.body.confirm_password
        }

        accountManager.createAccount(newAccount, function (errors, account) {
            if(errors.length > 0){
                response.status(400).json(errors)
            } else {
                response.setHeader("Location", "/"+ account)
                response.status(201).json({
                    account
                })
            }
        })
    })

    router.delete("/:id", function (request, response) {

        const id = request.params.id
        
        accountManager.deleteAccountById(id, function(errors, deletedUser){
            if(errors > 0){
                response.status(400).json(errors)
            } else {
                response.status(204).end()
            }
        })
    })

    router.put("/:id", function (request, response) {

        const newInfo = {
            id: request.params.id,
            username: request.body.username,
            password: request.body.password,
            confirm_password: request.body.confirm_password
        }

        accountManager.updateAccountInformation(newInfo, function(errors, account) {
            if(!account) {
                response.status(404).end()
            } else {
                if(errors.length > 0) {
                    response.status(400).json(errors)
                } else {
                    response.status(204).end()
                }
            }
        })
    })

    return router
}
