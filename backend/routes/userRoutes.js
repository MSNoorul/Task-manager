const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authorize = require('../middleware/authorize')

router.use(authorize('user'))
router.route('/user/:id')
    .put(userController.updateUser)



module.exports = router