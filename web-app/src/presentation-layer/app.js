const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const expressSession = require('express-session')


const variousRouter = require('./routers/various-router')
const accountRouter = require('./routers/account-router')
const RangedAssassinsRouter = require('./routers/rangedAssassins-router')
const tanksRouter = require('./routers/tanks-router')
const meleeAssassinsRouter = require('./routers/meleeAssassins-router')
const supportsRouter = require('./routers/supports-router')
const healersRouter = require('./routers/healers-router')
const bruisersRouter = require('./routers/bruisers-router')

const app = express()

const oneHour = 1000 * 60 * 60;
app.use(expressSession({
	secret: "dhjikwedgh",
	saveUninitialized: true,
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


app.listen(8080, function(){
    console.log("Running on port 8080!")
})

