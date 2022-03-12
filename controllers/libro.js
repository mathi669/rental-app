const Book = require("../models/books")

class LibroController {


    async getViewHome(req, res) {
        const readAll = await Book.readAllLibros()
        // console.log(readAll)
        return res.render('home', {tittle: 'Home', readAll})
    }

    getLibros(req, res){
        return res.render('bookRegister',{tittle: 'Registo libro'})
    }

    async saveLibros(req,res){
        let newbook = new Book(req.body)
        let validation = newbook.validateBook()
        if(validation.success){
            let result = await newbook.save()
            if(!result.success){
                return res.render('bookRegister',{error: true, message: result.error, data: req.body})
            }
            return res.redirect('/')
        } else {
            return res.render('bookRegister', {error: true, message: validation.errors, data: req.body})
        }
    }
}

module.exports = LibroController