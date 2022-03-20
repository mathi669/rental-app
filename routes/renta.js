const express = require('express')
const RentaController = require('../controllers/renta')

const router = express.Router()

const rentaController = new RentaController()

router.get('/rentas', rentaController.readRenta)
router.post('/devolucion/:id/:idrentas', rentaController.devolucion)
router.post('/saveRent', rentaController.saveRent)

module.exports = router