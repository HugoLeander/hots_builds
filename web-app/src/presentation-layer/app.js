const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')


const variousRouter = require('./routers/various-router')
const accountRouter = require('./routers/account-router')
const RangedAssassinsRouter = require('./routers/rangedAssassins-router')

const app = express()

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

app.listen(8080, function(){
    console.log("Running on port 8080!")
})