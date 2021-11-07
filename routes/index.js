const express = require('express')
const router = express.Router()


//Importing Routes
const countries = require('./countries')
const sendMail = require('./sendmail')
const products =require('./productRoutes')




router.use('/time', countries)
router.use('/sendmail',sendMail)
router.use('/products',products)



module.exports = router;
