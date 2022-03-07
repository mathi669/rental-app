const express = require('express')
const LibroController = require('../controllers/libro')

const router = express.Router()
const libroController = new  LibroController()

router.get('/home', libroController.getViewHome)

module.exports = router