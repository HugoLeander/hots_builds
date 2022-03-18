const express = require('express')
const bodyParser = require('body-parser')
const jwt = require("jsonwebtoken")

const secretKey = 'kattunge' // måste vara samma secret key för encrypt och decrypt därav en constant 

module.exports = function ({ accountManager, heroManager}) {

    //verifyToken middleware function
    function verifyToken(request, response, next) {
        //Get auth header value
        const bearerHeader = request.headers['authorization']
        //Kollar om bearer är undefined
        if(typeof bearerHeader != 'undefined') {
            //Split at the space, the string looks like this "Bearer XXX" where XXX is the token
            const bearer = bearerHeader.split(' ')
            //hämta token ifrån split Arrayen, "Bearer" blir på [0], XXX på [1]
            const bearerToken = bearer[1]
            //Verify the token
            jwt.verify(bearerToken, secretKey, function (error, authData) { // här skickas token och secretKey med och kollar så det stämmer.
                if(error) {
                    response.sendStatus(403)
                } else {
                    next()
                }
            })
        } else {
            // Forbidden
            response.sendStatus(403)
        }
    }

    const router = express.Router()

    router.use(bodyParser.json())

    router.use(function (request, response, next) {
        console.log(request.method, request.url)
        next()
    })

    router.get("/", function (request, response) {
        accountManager.getAllAccounts(function (errors, accounts) {
            if (errors.length > 0) {
                response.status(400).json(errors)
            } else {
                response.status(200).json(accounts)
            }
        })
    })

    router.post("/", function (request, response) {

        const newAccount = {
            account_id: request.params.id,
            username: request.body.username,
            password: request.body.password,
            confirm_password: request.body.confirm_password
        }

        accountManager.createAccount(newAccount, function(errors, account) {
            if (errors.length > 0) {
                response.status(400).json(errors)
            } else {
                response.setHeader("Location", "/" + account)
                response.status(200).json({account})
            }
        })
    })

    router.get("/heroes", function (request, response) {

        heroManager.getAllHeroes(function(errors, heroes){
            if(errors.lenght > 0){
                response.status(400).json(errors)

            } else {
                response.status(200).json(heroes)
            }
        })
    })

    router.get('/hero/:hero_name', async function(request, response){

        const name = request.params.hero_name

        heroManager.getHeroByName(name, function(errors, hero){
            if(errors.length > 0) {
                response.status(400).json(errors)
            } else {
                response.status(200).json(hero)
            }
        })
    })

    router.get('/build/:hero_name', async function(request, response){

        console.log(name)

        heroManager.getBuildsByHeroName(name, function(errors, hero){
            if(errors.length > 0) {
                response.status(400).json(errors)
            } else {
                response.status(200).json(hero)
            }
        })
    })

    router.post('/createBuild', async function(request, response){

        const newBuild = {
            hero_name: request.body.hero_name,
            talents: request.body.talents,
            build_name: request.body.build_name,
            build_description: request.body.build_description
        }

        heroManager.createBuild(newBuild, async function(errors, build){
            if(errors.length > 0) {
                response.status(400).json(errors)
            } else {
                response.status(200).json(build)
            }
        })
    })

    router.get("/login", verifyToken, function (request, response) {
        if(verifyToken) {
            response.status(200)
            response.json({
                message: "Welcome to login page",
            })
        } else {
            response.sendStatus(403)
        }
    })

    router.post("/login", function (request, response) {

        const user = {
            username: request.body.username,
            password: request.body.password
        }

        accountManager.getAccountByUsername(user, function (errors, userGotBack) {

            if (user.password == userGotBack.password) {
                const payload = {
                    isLoggedIn: true
                }
                jwt.sign({ user: userGotBack, payload }, secretKey, function (error, token) { // här blir man tilldelad en token
                    response.json({
                        token
                    })
                })
            } else {
                response.status(400).json("Wrong password")
            }
        })
    })

    router.get("/:id", verifyToken, function (request, response) { // verifyToken funktionen används som middleware

        if(verifyToken) { // om token = 
            response.status(200)
        } else {
            response.sendStatus(403)
        }

        const id = request.params.id

        accountManager.getAllAccounts(function (errors, accounts) {
            if (errors.length > 0) {
                response.status(400).json(errors)
            } else {
                const account = accounts.find(a => a.account_id == id)

                if (account) {
                    response.status(200).json(account)
                } else {
                    response.status(404).end()
                }
            }
        })
    })


    router.delete("/:id", verifyToken, function (request, response) {

        if(verifyToken) { // om token = 
            response.status(200)
        } else {
            response.sendStatus(403)
        }

        const account_id = request.params.id
        
        accountManager.deleteAccountById(account_id, function(errors){
            if(errors > 0){
                response.status(400).json(errors)
            } else {
                response.status(204).end()
            }
        })
    })

    router.put("/:id", verifyToken, function (request, response) {

        if(verifyToken) { // om token = 
            response.status(200)
        } else {
            response.sendStatus(403)
        }
        const newInfo = {
            account_id: request.params.id,
            username: request.body.username,
            password: request.body.password,
            confirm_password: request.body.confirm_password
        }

        accountManager.updateAccountInformation(newInfo, function (errors, account) {
            if (!account) {
                response.status(404).end()
            } else {
                if (errors.length > 0) {
                    response.status(400).json(errors)
                } else {
                    response.status(204).end()
                }
            }
        })
    })

    return router
}
