const express = require('express')

const router = express.Router()

var csrf = require('csurf')
va = csrf({ cookie: true})

router.get('/', function(request,response){
	response.render('rangedAssassins.hbs')
})

router.get('/azmodan', function(request,response){
	response.render('azmodan.hbs')
})

router.get('/cassia', function(request,response){
	response.render('cassia.hbs')
})

router.get('/chromie', function(request,response){
	response.render('chromie.hbs')
})

router.get('/falstad', function(request,response){
	response.render('falstad.hbs')
})

router.get('/fenix', function(request,response){
	response.render('fenix.hbs')
})

router.get('/gall', function(request,response){
    response.render('gall.hbs')
})

router.get('/genji', function(request,response){
    response.render('genji.hbs')
})

router.get('/greymane', function(request,response){
    response.render('greymane.hbs')
})

router.get('/guldan', function(request,response){
	response.render('guldan.hbs')
})

router.get('/hanzo', function(request,response){
    response.render('hanzo.hbs')
})

router.get('/jaina', function(request,response){
    response.render('jaina.hbs')
})

router.get('/junkrat', function(request,response){
    response.render('junkrat.hbs')
})

router.get('/kaelthas', function(request,response){
    response.render('kaelthas.hbs')
})

router.get('/kelthuzad', function(request,response){
    response.render('kelthuzad.hbs')
})

router.get('/liming', function(request,response){
    response.render('liming.hbs')
})

router.get('/lunara', function(request,response){
    response.render('lunara.hbs')
})

router.get('/mephisto', function(request,response){
    response.render('mephisto.hbs')
})

router.get('/nazeebo', function(request,response){
    response.render('nazeebo.hbs')
})

router.get('/nova', function(request,response){
    response.render('nova.hbs')
})

router.get('/orphea', function(request,response){
    response.render('orphea.hbs')
})

router.get('/probius', function(request,response){
    response.render('probius.hbs')
})

router.get('/raynor', function(request,response){
    response.render('raynor.hbs')
})

router.get('/sgthammer', function(request,response){
    response.render('sgthammer.hbs')
})

router.get('/sylvanas', function(request,response){
    response.render('sylvanas.hbs')
})

router.get('/tassadar', function(request,response){
	response.render('tassadar.hbs')
})

router.get('/tracer', function(request,response){
	response.render('tracer.hbs')
})

router.get('/tychus', function(request,response){
	response.render('tychus.hbs')
})

router.get('/valla', function(request,response){
	response.render('valla.hbs')
})

router.get('/zagara', function(request,response){
	response.render('zagara.hbs')
})

router.get('/zuljin', function(request,response){
	response.render('zuljin.hbs')
})

module.exports = router