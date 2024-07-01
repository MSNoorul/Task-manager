const express = require('express')
const router = express.Router()
const taskControllers = require('../controllers/taskControllers')
const authorize = require('../middleware/authorize')


router.route('/create')
.post(authorize('manager'),taskControllers.createTask)

router.route('/')
.get(taskControllers.getAllTasks)

router.route('/update/:id')
.put(authorize('manager'),taskControllers.updateTask)

router.route('/delete/:id')
.delete(authorize('admin'),taskControllers.deleteTask)

module.exports = router