const express = require('express')
const LibroController = require('../controllers/libro')

const router = express.Router()
const libroController = new  LibroController()

router.get('/', libroController.getViewHome)
router.get('/bookRegister', libroController.getLibros)
router.post('/bookRegister', libroController.saveLibros)

module.exports = router