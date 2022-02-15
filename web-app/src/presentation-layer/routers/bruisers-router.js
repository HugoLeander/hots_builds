const express = require('express')
const router = express.Router()

router.get('/', function(request,response){
	response.render('bruisers.hbs')
})

module.exports = router