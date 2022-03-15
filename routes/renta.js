const express = require('express')
const RentaController = require('../controllers/renta')

const router = express.Router()

const rentaController = new RentaController()

router.post('/saveRent', rentaController.saveRent)

module.exports = router