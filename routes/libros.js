const express = require('express')
const LibroController = require('../controllers/libro')

const router = express.Router()
const libroController = new  LibroController()

router.get('/', libroController.getViewHome)
router.get('/myBooks', libroController.getMyBooks)
router.get('/bookRegister', libroController.getLibros)
router.post('/bookRegister', libroController.saveLibros)
router.get('/details/:id', libroController.readBookId )
router.delete('/delete/:id', libroController.borrarLibro)
router.get('/edit/:id', libroController.editBook)
// router.get('/buscado', libroController.searchBook)
router.post('/edit/:id', libroController.updateBook)

module.exports = router