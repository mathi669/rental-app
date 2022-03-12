const { query } = require("express")
const Book = require("../models/books")

class LibroController {


    async getViewHome(req, res) {
        const readAll = await Book.readAllLibros()
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

    async readBookId(req, res){
        let datos = await Book.readBookById(req.params.id)        
        return res.render('details', {data: datos[0]})

    }

    async borrarLibro(req, res){
        let libro = await Book.deleteBook(req.params.id)
        return res.json(libro)
    }
    async editBook(req, res){
        let datos = await Book.readBookById(req.params.id)
        return res.render('edit', {data: datos[0]})

    }
    async updateBook(req, res){
        let edit = await Book.update(req.body, req.params.id)
        return res.redirect("/")
    }
}

module.exports = LibroController