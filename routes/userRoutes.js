const express = require('express')
const router = express.Router()

const { VerifyRefreshToken } = require('../controllers/authController')
const { GetVerificationToken } = require('../controllers/userController')
const { SignUp, Login ,logoutFunction} = require('../controllers/authController');
const { authValidation } = require('../Validations/userValidation')
const validationError =  require('../middleware/validationError')
const {authenticateUser} = require('../middleware/authenticateUser')

router
    .route('/token')
    .post(VerifyRefreshToken, GetVerificationToken)

router
    .route('/logout')
    .get(logoutFunction)

router
    .post('/register', authValidation, validationError, SignUp)

router
    .route('/login')
    .post(Login)

router
    .route('/tokenexpire')
    .get(authenticateUser,logoutFunction)




module.exports = router