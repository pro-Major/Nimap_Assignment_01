const express = require("express")
const router = express.Router()

const {findCountriesTimezone} = require('../controllers/currentTime')

router.get('/get-current-time',findCountriesTimezone)

module.exports = router;