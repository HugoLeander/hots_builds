const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const expressSession = require('express-session')
let redisStore = require("connect-redis")(expressSession)

const variousRouter = require('./routers/various-router')
const accountRouter = require('./routers/account-router')
const RangedAssassinsRouter = require('./routers/rangedAssassins-router')
const tanksRouter = require('./routers/tanks-router')
const meleeAssassinsRouter = require('./routers/meleeAssassins-router')
const supportsRouter = require('./routers/supports-router')
const healersRouter = require('./routers/healers-router')
const bruisersRouter = require('./routers/bruisers-router')
const reviewRouter = require('./routers/review-router')

const app = express()

// redis v4
// const { createClient } = require("redis")
// let redisClient = createClient({ legacyMode: true })
// redisClient.connect().catch(console.error)

const oneHour = 1000 * 60 * 60;
app.use(expressSession({
	//store: new redisStore({ client: redisClient }),
	secret: "dhjikwedgh",
	saveUninitialized: false,
	resave: false,
	cookie: {maxAge: oneHour},
}));

app.use(function (request, response, next) {
	//Makes the session available to all views.
	response.locals.session = request.session
	next()
})

app.set('views', path.join(__dirname, "views"))

app.engine('hbs', expressHandlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main.hbs',
    layoutsDir: path.join(__dirname, 'layouts')
}))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', variousRouter)
app.use('/accounts', accountRouter)
app.use('/rangedAssassins', RangedAssassinsRouter)
app.use('/tanks', tanksRouter)
app.use('/meleeAssassins', meleeAssassinsRouter)
app.use('/bruisers', bruisersRouter)
app.use('/healers', healersRouter)
app.use('/supports', supportsRouter)
app.use('/reviews', reviewRouter)

app.listen(8080, function(){
    console.log("Running on port 8080!")
})

