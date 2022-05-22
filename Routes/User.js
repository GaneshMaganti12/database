const express = require('express')
const {AuthenticateUser, isAuthenticatedUser} = require('../Middleware/User')
const router = express.Router()
const {signup, login, getUsers, getUser, isUserPassword, resetPassword, newPassword} = require('../Controllers/User')


router.post('/signup', signup)

router.post('/login', AuthenticateUser, login)

router.get('/users',isAuthenticatedUser, getUsers)

router.get('/users/:id',isAuthenticatedUser, getUser)

router.patch('/change-password', isAuthenticatedUser, isUserPassword)

router.post('/reset-password', isAuthenticatedUser, resetPassword)

router.post('/new-password', isAuthenticatedUser, newPassword)


module.exports = router