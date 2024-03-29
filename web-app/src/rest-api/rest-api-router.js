const express = require('express')
const bodyParser = require('body-parser')
const jwt = require("jsonwebtoken")

const secretKey = 'kattunge' // måste vara samma secret key för encrypt och decrypt därav en constant 

module.exports = function ({ accountManager, heroManager, reviewManager, buildManager }) {

    //verifyToken middleware function
    function verifyToken(request, response, next) {
        //Get auth header value
        const bearerHeader = request.headers['authorization']
        //Kollar om bearer är undefined
        if (typeof bearerHeader != 'undefined') {
            //Split at the space, the string looks like this "Bearer XXX" where XXX is the token
            const bearer = bearerHeader.split(' ')
            //hämta token ifrån split Arrayen, "Bearer" blir på [0], XXX på [1]
            const bearerToken = bearer[1]
            //Verify the token
            jwt.verify(bearerToken, secretKey, function (error, authData) { // här skickas token och secretKey med och kollar så det stämmer.
                if (error) {
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

        if (request.method == "OPTIONS") {
            return response.status(200).end()
        }

        next()
    })

    router.get("/accounts", verifyToken, function (request, response) {
        if (request.body.userInfo.is_admin) {
            accountManager.getAllAccounts(function (errors, accounts) {
                if (errors.length > 0) {
                    response.status(400).json({ error: "An error occured when trying to get all accounts"})
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

        accountManager.createAccount(newAccount, function (errors, account) {
            if (errors.length > 0) {
                response.status(400).json({ error: "An error occured when trying to create the account"})
            } else {
                response.setHeader("Location", "/" + account)
                response.status(201).json("account was created")
            }
        })
    })

    router.get("/heroes", function (request, response) {

        heroManager.getAllHeroes(function (errors, heroes) {
            if (errors.lenght > 0) {
                response.status(400).json({ error: "An error occured when trying to fetch all heroes"})

            } else {
                response.status(200).json(heroes)
            }
        })
    })

    router.get('/hero/:hero_name', async function (request, response) {

        const name = request.params.hero_name

        heroManager.getHeroByName(name, function (errors, hero) {
            if (errors.length > 0) {
                response.status(400).json({ error: "An error occured when trying to fetch the hero"})
            } else {
                response.status(200).json(hero)
            }
        })
    })


    router.get('/build/:hero_name', async function (request, response) {

        const name = request.params.hero_name

        buildManager.getBuildsByHeroName(name, function (errors, foundBuilds) {
            if (errors.length > 0) {
                response.status(400).json({ error: "An error occured when trying to get all builds for hero"})
            } else {
                //returns the talents of the first build of a hero
                const build = []

                for (const talent of foundBuilds[0].talents) {
                    build.push(talent)
                }

                response.status(200).json(build)
            }
        })
    })

    router.post('/createBuild', verifyToken, async function (request, response) {
        const newBuild = {
            hero_name: request.body.hero_name,
            talents: request.body.talents,
            build_name: request.body.build_name,
            build_description: request.body.build_description
        }

        buildManager.createBuild(request, newBuild, async function (errors, build, authorized) {
            if (!authorized) {
                response.sendStatus(403)
            }
            else if (errors.length > 0) {
                response.status(400).json({ error: "An error occured when trying to create the build"})
            } else {
                response.status(200).json(build)
            }
        })
    })

    router.put("/:id", verifyToken, function (request, response) {

        if (request.body.userInfo.id == request.params.id || request.body.userInfo.is_admin) {
            const newInfo = {
                id: request.params.id,
                username: request.body.username,
                password: request.body.password,
                confirm_password: request.body.confirm_password
            }

            accountManager.updateAccountInformation(newInfo, function (errors, account) {
                if (!account) {
                    response.status(404).end()
                } else {
                    if (errors.lenght > 0) {
                        response.status(401).json({ error: "An error occured when trying to update the account"})
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

        if (grant_type == "password") {

            const user = {
                username: request.body.username,
                password: request.body.password
            }

            accountManager.loginAccount(user, function (error, userGotBack) {
                if (userGotBack) {
                    const payload = {
                        id: userGotBack.id,
                        username: userGotBack.username,
                        is_admin: userGotBack.is_admin,
                        is_logged_in: true
                    }

                    jwt.sign(payload, secretKey, function (error, token) { // här blir man tilldelad en token
                        if (error) {
                            console.log({ error: "An error occured when trying to login"})
                            response.status(401).json("Invalid client error")
                        } else {
                            response.status(200).json({
                                "access_token": token,
                                id: userGotBack.id,
                                is_admin: userGotBack.is_admin
                            })
                        }
                    })
                }
                else {
                    response.status(401).json(error)
                }
            })
        }
        else {
            response.status(400).json({ error: "unspported_grant_type" })
        }
    })

    router.get("/:id", verifyToken, function (request, response) {

        const id = request.params.id

        if (request.body.userInfo.id == id || request.body.userInfo.is_admin) {

            accountManager.getAllAccounts(function (errors, accounts) {
                if (errors.length > 0) {
                    response.status(400).json({ error: "An error occured when trying to get the account by id"})
                } else {
                    const account = accounts.find(a => a.id == id)

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

        const id = request.params.id

        accountManager.deleteAccountById(request, id, function (errors, authorized) {
            if (!authorized) {
                response.sendStatus(403)
            }
            else if (errors.length > 0) {
                response.status(400).json({ error: "An error occured when trying to delete the account"})
            } else {
                response.status(204).end()
            }
        })
    })


    const reviewController = require('./review-controller')({ reviewManager });

    router.post('/review', verifyToken, reviewController.createReview);

    router.get('/review/:id', reviewController.getReviewById);

    router.get('/reviews/:id', reviewController.getReviewsByHeroId);

    router.put('/review/:id', verifyToken, reviewController.updateReview);

    router.delete('/review/:id', verifyToken, reviewController.deleteReviewById);


return router
}