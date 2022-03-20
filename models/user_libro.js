const { insert, query } = require("../config/database")

class UserLibro {
    constructor(userLibro) {
        this.idbook = userLibro.idbook,
        this.idusers = userLibro.idusers
    }

    async save() {
        const newUserLibro = await insert('user_libro',{
            idbook: this.idbook,
            idusers: this.idusers
        })
        return newUserLibro
    }

    static async getByIdBook(id) {
        return await query('SELECT * FROM user_libro WHERE idbook = ?',[id])
    }
}

module.exports = UserLibro