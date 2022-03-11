const Book = require("../models/books")

class LibroController {


    async getViewHome(req, res) {
        const readAll = await Book.readAllLibros()
        console.log(readAll)
        return res.render('home', {tittle: 'Home', readAll})
    }
}

module.exports = LibroController