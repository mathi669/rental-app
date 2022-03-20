const Book = require("../models/books");
const UserLibro = require("../models/user_libro");

class LibroController {

    async getViewHome(req, res) {

        let data
        let xbus = false
        let nombre = req.url.split('=')[1]

        if (nombre) {
            const resu = await Book.readFilterByName(nombre)
            if (resu.length > 0) {
                data = resu

            } else {
                if (req.session.loggedIn) {
                    const readFilter = await Book.readFilterBooksOtherUser(req.session.idUser)
                    data = readFilter
                } else {
                    const readAll = await Book.readAllLibros()
                    data = readAll
                }
                xbus = true
            }
        } else {
            if (req.session.loggedIn) {
                const readFilter = await Book.readFilterBooksOtherUser(req.session.idUser)
                data = readFilter
            } else {
                const readAll = await Book.readAllLibros()
                data = readAll
            }
        }

        
        return res.render('home', {tittle: 'Home', data, xbus})

        // let data

        // if (req.session.loggedIn) {
        //     const readFilter = await Book.readFilterBooksOtherUser(req.session.idUser)
        //     data = readFilter
        // } else {
        //     const readAll = await Book.readAllLibros()
        //     data = readAll
        // }
        // return res.render('home', {tittle: 'Home', data})
    }


    async getMyBooks(req, res) {
        let data = await Book.readFilterBooksUser(req.session.idUser)
        return res.render('myBooks', {tittle: 'My Books',data, validate: data.length > 0})
    }

    getLibros(req, res){
        let idUser = req.session.idUser
        return res.render('bookRegister',{tittle: 'Registo libro', id: idUser})
    }

    async saveLibros(req,res){
        console.log(req.body);
        let newbook = new Book(req.body)
        let validation = newbook.validateBook()
        if(validation.success){
            let result = await newbook.save()
            if(!result.success){
                return res.render('bookRegister',{error: true, message: result.error, data: req.body})
            }

            let data = {
                idbook: result.data.insertId,
                idusers: req.body.idusers
            }
            
            let newUserLibro = new UserLibro(data)
            await newUserLibro.save()
            
            return res.redirect('/')
        } else {
            return res.render('bookRegister', {error: true, message: validation.errors, data: req.body})
        }
    }

    async readBookId(req, res){
        let validate = false
        let datos = await Book.readBookById(req.params.id)

        // buscar en la tabla user_libro el idlibro
        let search = await UserLibro.getByIdBook(datos[0].idlibro)

        if (search.length > 0) {
            validate = search[0].idusers === req.session.idUser         
        }

        return res.render('details', {data: datos[0], stock: datos[0].unidades === 0, validate})

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
        await Book.update(req.body, req.params.id)
        return res.redirect("/")
    }
}

module.exports = LibroController