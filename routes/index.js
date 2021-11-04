const express = require('express')
const router = express.Router()


//Importing Routes
const countries = require('./countries')
const sendMail = require('./sendmail')




router.use('/time', countries)
router.use('/sendmail',sendMail)



module.exports = router;
