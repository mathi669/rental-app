const Book = require("../models/books")
const Renta = require("../models/renta")
const moment = require("moment")

class RentaController {
    async saveRent(req, res) {
        let data = {
            iduser: req.session.idUser,
            idlibro: req.body.idlibro,
            fecha_inicio: req.body.fecha_inicio,
            fecha_termino: req.body.fecha_termino,
            cantidad: req.body.cantidad,
            estado: 0
        }
        let newRent = new Renta(data)
        let result = await newRent.save()
        if (result.success) {
            await Book.decrementUnits(data.idlibro, data.cantidad)
            return res.redirect('/')
        }

        // // ver como arreglar para que salga un mensaje de error sin perder el id del libro
        return res.redirect(`/details/${data.idlibro}`)
    }

    async readRenta(req, res) {
        let dataRenta = await Renta.readByUser(req.session.idUser)
        const fechaFin = moment(dataRenta[0].fecha_termino).format('yyyy-MM-DD')
        let booleano = fechaFin < moment().format('yyyy-MM-DD')
        return res.render('rentas',{data: dataRenta, booleano})
    }

    async devolucion(req, res) {
        let id = req.params.id
        let cantidad = req.params.cantidad
        
        let resultIn = await Book.incrementUnits(id, cantidad)
        if (resultIn.affectedRows > 0) {
            let idRenta = req.params.idrentas
            Renta.updatedStatus(idRenta)
        }
        return res.redirect('/rentas')
    }
}

module.exports = RentaController