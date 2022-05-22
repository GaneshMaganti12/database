const express = require('express')
// const {AuthenticateUser, isAuthenticatedUser} = require('../Middleware/User')
const router = express.Router()
const {getTasks, addTasks, getUserTask} = require('../Controllers/Task')
const advancedQuery = require('../Middleware/Advanced-query')
const Task = require('../Model/Task')


router.route('/')
.get(advancedQuery(Task),getTasks)
.post(addTasks)

router.route('/user/:userid')
.get(getUserTask)


module.exports = router