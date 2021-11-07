const express = require('express')
const router = express.Router()


//Importing Routes
const countries = require('./countries')
const sendMail = require('./sendmail')
const products = require('./productRoutes')
const category = require('./categoryRoutes')
const posts = require('./postsRoutes')



router.use('/time', countries)
router.use('/sendmail',sendMail)
router.use('/products',products)
router.use('/category',category)
router.use('/posts',posts)

module.exports = router;
