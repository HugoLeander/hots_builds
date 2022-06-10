const awilix = require('awilix')
const app = require("./app")

const usePostgres = true

const container = awilix.createContainer()

if(usePostgres) {
    //data-access-layer-postgres
    console.log("postgres is used")
    container.register("accountRepository", awilix.asFunction(require('../data-access-layer-postgres/account-repository')))
    container.register("db", awilix.asFunction(require('../data-access-layer-postgres/db')))
    container.register("reviewRepository", awilix.asFunction(require('../data-access-layer-postgres/review-repository')))
    container.register("models", awilix.asFunction(require("../data-access-layer-postgres/models")))
    container.register("heroRepository", awilix.asFunction(require('../data-access-layer-postgres/hero-repository')))
    container.register("buildRepository", awilix.asFunction(require('../data-access-layer-postgres/build-repository')))
} else {
    //data-access-layer
    console.log("mySQL is used")
    container.register("accountRepository", awilix.asFunction(require('../data-access-layer/account-repository')))
    container.register("db", awilix.asFunction(require('../data-access-layer/db')))
    container.register("reviewRepository", awilix.asFunction(require('../data-access-layer/review-repository')))
    container.register("heroRepository", awilix.asFunction(require('../data-access-layer/hero-repository')))
    container.register("buildRepository", awilix.asFunction(require('../data-access-layer/build-repository')))
}

//business-logic-layer
container.register("accountManager", awilix.asFunction(require('../business-logic-layer/account-manager')))
container.register("accountValidator", awilix.asFunction(require('../business-logic-layer/account-validator')))
container.register("reviewManager", awilix.asFunction(require('../business-logic-layer/review-manager')))
container.register("reviewValidator", awilix.asFunction(require('../business-logic-layer/review-validator')))
container.register("heroManager", awilix.asFunction(require('../business-logic-layer/hero-manager')))
container.register("buildManager", awilix.asFunction(require('../business-logic-layer/build-manager')))
container.register("encryptionManager", awilix.asFunction(require('../business-logic-layer/encryption-manager')))

//presentation-layer
container.register("variousRouter", awilix.asFunction(require('./routers/various-router')))
container.register("accountRouter", awilix.asFunction(require('./routers/account-router')))
container.register("heroesRouter", awilix.asFunction(require('./routers/heroes-router')))
container.register("heroRouter", awilix.asFunction(require('./routers/hero-router')))
container.register("restApi", awilix.asFunction(require('../rest-api/rest-api-router')))
container.register("app", awilix.asFunction(app))

//resolve the dependencies and run the app
const theApp = container.resolve("app")
theApp.start()