const awilix = require('awilix')
const app = require("./app")

const container = awilix.createContainer()

//data-access-layer
// container.register("accountRepository", awilix.asFunction(require('../data-access-layer/account-repository')))
// container.register("db", awilix.asFunction(require('../data-access-layer/db')))
// container.register("reviewRepository", awilix.asFunction(require('../data-access-layer/review-repository')))

//data-access-layer-postgres
container.register("accountRepository", awilix.asFunction(require('../data-access-layer-postgres/account-repository')))
container.register("db", awilix.asFunction(require('../data-access-layer-postgres/db')))
container.register("reviewRepository", awilix.asFunction(require('../data-access-layer-postgres/review-repository')))
container.register("models", awilix.asFunction(require("../data-access-layer-postgres/models")))

//business-logic-layer
container.register("accountManager", awilix.asFunction(require('../business-logic-layer/account-manager')))
container.register("accountValidator", awilix.asFunction(require('../business-logic-layer/account-validator')))
container.register("reviewManager", awilix.asFunction(require('../business-logic-layer/review-manager')))
container.register("reviewValidator", awilix.asFunction(require('../business-logic-layer/review-validator')))

//presentation-layer
container.register("variousRouter", awilix.asFunction(require('./routers/various-router')))
container.register("accountRouter", awilix.asFunction(require('./routers/account-router')))
container.register("heroesRouter", awilix.asFunction(require('./routers/heroes-router')))
container.register("heroRouter", awilix.asFunction(require('./routers/hero-router')))
container.register("app", awilix.asFunction(app))


//resolve the dependencies and run the app
const theApp = container.resolve("app")
theApp.start()