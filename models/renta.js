const { query, insert } = require("../config/database")

class Renta {
    constructor(renta) {
        this.iduser = renta.iduser,
        this.idlibro = renta.idlibro,
        this.fecha_inicio = renta.fecha_inicio,// aqui podemos poner una funcion que me de la fecha de actual
        this.fecha_termino = renta.fecha_termino,
        this.cantidad = renta.cantidad,
        this.estado = renta.estado
    }

    async save() {
        let newRent = await insert('rentas',{
            iduser: this.iduser,
            idlibro: this.idlibro,
            fecha_inicio: this.fecha_inicio,
            fecha_termino: this.fecha_termino,
            cantidad: this.cantidad,
            estado: this.estado
        })
        return newRent
    }

    static async readByUser(id) {
        return await query('SELECT l.idlibro, l.nombre, l.autor, l.img, l.año_publicacion, r.cantidad, r.idrentas, r.fecha_termino FROM rentas r INNER JOIN libro l ON r.idlibro = l.idlibro WHERE r.iduser = ? and r.estado = 0',[id])
    }

    static async updatedStatus(id) {
        let result = await query('UPDATE rentas SET estado = 1 WHERE idrentas = ?', [id])
        return result
    }
}

module.exports = Renta