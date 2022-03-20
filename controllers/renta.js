const Book = require("../models/books")
const Renta = require("../models/renta")
const moment = require("moment")

class RentaController {
    async saveRent(req, res) {
        let count = await Renta.max()
        let data = {
            iduser: req.session.idUser,
            idlibro: req.body.idlibro,
            fecha_inicio: req.body.fecha_inicio,
            fecha_termino: req.body.fecha_termino,
            estado: 0,
            cantidad: req.body.cantidad,
            pago: req.body.precioBook * req.body.cantidad,
            recargo: 0,
            contador: count+1
        }
        let newRent = new Renta(data)
        let result = await newRent.save()
        if (result.success) {
            await Book.decrementUnits(data.idlibro, data.cantidad)
            return res.redirect('/')
        }
        
        return res.redirect(`/details/${data.idlibro}`)
    }

    async readRenta(req, res) {
        let dataRenta = await Renta.readByUser(req.session.idUser)
        let conta = await Renta.maxUser(req.session.idUser)
        return res.render('rentas',{dataRenta, conta,tam: dataRenta.length > 0, tittle: 'Mis rentas'})
    }

    async devolucion(req, res) {
        let id = req.params.id
        let cantidad = req.body.cantidad
        let resultIn = await Book.incrementUnits(id, cantidad)
        if (resultIn.affectedRows > 0) {
            let idRenta = req.params.idrentas
            Renta.updatedStatus(idRenta)
        }
        return res.redirect('/rentas')
    }
}

module.exports = RentaController