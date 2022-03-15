const Renta = require("../models/renta");

class RentaController {
    async saveRent(req, res) {
        let data = {
            iduser: req.session.idUser,
            idlibro: req.body.idlibro,
            fecha_inicio: req.body.fecha_inicio,
            fecha_termino: req.body.fecha_termino
        }
        
        let newRent = new Renta(req.body)
        let result = await newRent.save()
        if (result.success) {
            return res.redirect('/')
        }

        // ver como arreglar para que salga un mensaje de error sin perder el id del libro
        return res.redirect(`/details/${data.idlibro}`)
    }
}

module.exports = RentaController