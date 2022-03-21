const express = require('express')
const bodyParser = require('body-parser')
const jwt = require("jsonwebtoken")

const secretKey = 'kattunge' // måste vara samma secret key för encrypt och decrypt därav en constant 

module.exports = function ({ accountManager, heroManager, reviewManager}) {

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
                    request.body.userInfo = authData 
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
    router.use(express.urlencoded({
        extended: false,
    }))

    router.use(function (request, response, next) {
        response.setHeader("Access-Control-Allow-Origin", "*")
	    response.setHeader("Access-Control-Allow-Methods", "*")
	    response.setHeader("Access-Control-Allow-Headers", "*")
	    response.setHeader("Access-Control-Expose-Headers", "*")

        if(request.method == "OPTIONS"){
            return response.status(200).end()
        }

        next()
    }) 

    router.get("/accounts", verifyToken, function (request, response) {
        if(request.body.userInfo.is_admin) {
            accountManager.getAllAccounts(function (errors, accounts) {
                if (errors.length > 0) {
                    response.status(400).json(errors)
                } else {
                    response.status(200).json(accounts)
                }
            })
        }
        else {
            response.sendStatus(403)
        }
    })


    router.post("/signUp", function (request, response) {

        const newAccount = {
            username: request.body.username,
            password: request.body.password,
            confirm_password: request.body.confirm_password
        }

        accountManager.createAccount(newAccount, function(errors, account) {
            if (errors.length > 0) {
                response.status(400).json(errors)
            } else {
                response.setHeader("Location", "/" + account)
                response.status(201).json()
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

        heroManager.getBuildsByHeroName(name, function(errors, hero){
            if(errors.length > 0) {
                response.status(400).json(errors)
            } else {
                response.status(200).json(hero)
            }
        })
    })

    router.post('/createBuild', verifyToken, async function(request, response){

        if (request.body.userInfo.is_admin) {
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
        } else {
            response.sendStatus(403)
        }
    })



//ONLY USED TO TEST TOKENS
    router.get("/login", verifyToken, function (request, response) {
        response.status(200)
            response.json({
                message: "Welcome to login page",
            })
    })


    router.put("/:id", verifyToken, function (request, response) {

        if (request.body.userInfo.account_id == request.params.id || request.body.userInfo.is_admin) {
            const newInfo = {
                account_id: request.params.id,
                username: request.body.username,
                password: request.body.password,
                confirm_password: request.body.confirm_password
            }
    
            accountManager.updateAccountInformation(newInfo, function (errors, account) {
                if(!account) {
                    response.status(404).end()
                } else {
                    if(errors.lenght > 0) {
                        response.status(401).json(errors)
                    } else {
                        response.status(204).end("account")
                    }
                }
            })
        } else {
            response.sendStatus(403)
        }
    })

    router.post("/login", function (request, response) {
        const grant_type = request.body.grant_type

        if(grant_type == "password") {

            const user = {
                username: request.body.username,
                password: request.body.password
            }

            accountManager.getAccountByUsername(user, function (errors, userGotBack) {

                if (user.password == userGotBack.password) {
                    const payload = {
                        account_id: userGotBack.account_id,
                        username: userGotBack.username,
                        is_admin: userGotBack.is_admin,
                        is_logged_in: true
                    }

                    jwt.sign(payload, secretKey, function (error, token) { // här blir man tilldelad en token
                        if(error){
                            console.log(error)
                            response.status(401).json("Invalid client error")
                        } else {
                            response.status(200).json({
                                "access_token": token
                            }) 
                        }
                    })
                }
                else {
                    response.status(401).json(errors)
                }
            })
        }
        else {
            response.status(400).json({ error: "unspported_grant_type"})
        }
    })

    router.get("/:id", verifyToken, function (request, response) { // verifyToken funktionen används som middleware

        const account_id = request.params.id

        if (request.body.userInfo.account_id == account_id || request.body.userInfo.is_admin) {

            accountManager.getAllAccounts(function (errors, accounts) {
                if (errors.length > 0) {
                    response.status(400).json(errors)
                } else {
                    const account = accounts.find(a => a.account_id == account_id)

                    if (account) {
                        response.status(200).json(account)
                    } else {
                        response.status(404).end()
                    }
                }
            })
        } else {
            response.sendStatus(403)
        }
    })

    router.delete("/:id", verifyToken, function (request, response) {

        const account_id = request.params.id

        if (request.body.userInfo.account_id == account_id || request.body.userInfo.is_admin) {
            accountManager.deleteAccountById(account_id, function(errors){
                if(errors > 0){
                    response.status(400).json(errors)
                } else {
                    response.status(204).end() // om det tas bort
                }
            })
        } else {
            response.sendStatus(403)
        }
    })

    
    router.post("/review", verifyToken, function(request, response) {

        const newReview = {
            hero_name: request.body.hero_name,
            name: request.body.name,
            rating: request.body.rating,
            description: request.body.description,
            author_account_id: request.body.userInfo.account_id
        }

        reviewManager.createReview(newReview, function(errors, review) {
            if(errors.length > 0) {
                response.status(400).json(errors)
            } else {
                response.status(200).json(review)
            }
        })
    })

    router.get("/review/:id", function(request, response) {

        const review_id = request.params.id

        reviewManager.getReviewById(review_id, function(errors, review) {
            if (errors.length > 0) {
                response.status(400).json(errors)
            } else {
                if (review) {
                    response.status(200).json(review)
                } else {
                    response.status(404).end()
                }
            }
        })
    })

    router.put("/review/:id", verifyToken, function(request, response) {

        const newInfo = {
            review_id: request.params.id,
            hero_name: request.body.hero_name,
            name: request.body.name,
            rating: request.body.rating,
            description: request.body.description
        }

        reviewManager.getReviewById(request.params.id, function(reviewErrors, review) {
            if (!review) {
                response.status(404).end()
            } else {
                if (reviewErrors.length > 0) {
                    response.status(400).json(reviewErrors)
                } else {
                    if (review.author_account_id == request.body.userInfo.account_id || request.body.userInfo.is_admin) {
                        reviewManager.updateReview(newInfo, function(errors, review) {
                            if (!review) {
                                response.status(404).end()
                            } else {
                                if (errors.length > 0) {
                                    response.status(400).json(errors)
                                } else {
                                    response.status(204).end()
                                }
                            }
                        })
                    } else{
                        response.sendStatus(403)
                    }
                }
            } 
        })   
    })
    

    router.delete("/review/:id", verifyToken, function(request, response) {

        const review_id = request.params.id

        reviewManager.getReviewById(review_id, function(errors, review) {

            if (!review) {
                response.status(404).end()
            } else {
                if (errors.length > 0) {
                    response.status(400).json(errors)
                } else {
                    if (request.body.userInfo.account_id == review_id || request.body.userInfo.is_admin) {
                        reviewManager.deleteReviewById(review_id, function(errors) {
                            if(errors > 0){
                                response.status(400).json(errors)
                            } else {
                                response.status(204).end()
                            }
                        })
                    } else {
                        response.sendStatus(403)
                    } 
                }
            }
        })
    })

    return router
}