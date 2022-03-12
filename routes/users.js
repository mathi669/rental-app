const express = require('express')
const UserController = require('../controllers/users')

const router = express.Router()

const userController = new UserController()


router.get('/login', userController.getViewLogin)

router.post('/login', userController.login)

router.get('/register', userController.getViewRegister)

router.post('/register', userController.register)

router.get('/logout', userController.logout)


module.exports = router