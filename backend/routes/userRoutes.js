const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authorize = require('../middleware/authorize')

// router.use(authorize('user'))
router.route('/:id')
    .put(authorize('user'),userController.updateUser)
router.route('/:id')
    .get(userController.getUserById)



module.exports = router