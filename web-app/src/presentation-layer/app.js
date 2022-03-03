const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const redis = require('redis')
const expressSession = require('express-session')
const connectRedis = require('connect-redis')
const redisStore = connectRedis(expressSession)

const variousRouter = require('./routers/various-router')
const accountRouter = require('./routers/account-router')
const heroesRouter = require('./routers/heroes-router')
const heroRouter = require('./routers/hero-router')

const app = express()

const redisClient = redis.createClient({
	host: 'session-redis',
	port: 6379,
	ttl: 60*60*10,
})


redisClient.on('error', function(err) {
	console.log("Could not establish a connection with redis. " + err)
})

redisClient.on('connect', function(err){
	console.log("Connected successfully")
})

const oneHour = 1000 * 60 * 60;
app.use(expressSession({
	store: new redisStore({ client: redisClient }),
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
app.use('/heroes', heroesRouter)
app.use('/hero', heroRouter)


app.listen(8080, function(){
    console.log("Running on port 8080!")
})

