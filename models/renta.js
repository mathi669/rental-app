const { query, insert } = require("../config/database")

class Renta {
    constructor(renta) {
        this.iduser = renta.iduser,
        this.idlibro = renta.idlibro,
        this.fecha_inicio = renta.fecha_inicio,// aqui podemos poner una funcion que me de la fecha de actual
        this.fecha_termino = renta.fecha_termino
    }

    async save() {
        let newRent = await insert('rentas',{
            iduser: this.iduser,
            idlibro: this.idlibro,
            fecha_inicio: this.fecha_inicio,
            fecha_termino: this.fecha_termino
        })
        console.log(newRent);
        return newRent
    }
}

module.exports = Renta