const { query, insert } = require("../config/database")

class Renta {
    constructor(renta) {
        this.iduser = renta.iduser,
        this.idlibro = renta.idlibro,
        this.fecha_inicio = renta.fecha_inicio,
        this.fecha_termino = renta.fecha_termino,
        this.cantidad = renta.cantidad,
        this.estado = renta.estado,
        this.pago = renta.pago,
        this.recargo = renta.recargo,
        this.contador = renta.contador
    }

    async save() {
        let newRent = await insert('rentas',{
            iduser: this.iduser,
            idlibro: this.idlibro,
            fecha_inicio: this.fecha_inicio,
            fecha_termino: this.fecha_termino,
            cantidad: this.cantidad,
            estado: this.estado,
            pago: this.pago,
            recargo: this.recargo,
            contador: this.contador
        })
        return newRent
    }

    static async readByUser(id) {
        return await query('SELECT l.idlibro, l.nombre, l.autor, l.img, l.año_publicacion, l.precio, r.cantidad, r.idrentas, r.fecha_termino, r.contador FROM rentas r INNER JOIN libro l ON r.idlibro = l.idlibro WHERE r.iduser = ? and r.estado = 0',[id])
    }

    static async max() {
        let count = await query('SELECT count(idlibro) as con FROM rentas')
        return count[0].con
    }

    static async maxUser(id) {
        let count = await query('SELECT count(*) as con FROM rentas WHERE iduser = ? and estado = 0',[id])
        console.log(count[0].con);
        return count[0].con
    }

    static async updatedStatus(id) {
        let result = await query('UPDATE rentas SET estado = 1 WHERE idrentas = ?', [id])
        return result
    }
}

module.exports = Renta