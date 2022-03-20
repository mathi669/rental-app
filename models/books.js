const { insert , query } = require("../config/database")

class Book {
    constructor(book){
        this.nombre = book.nombre,
        this.autor = book.autor,
        this.año_publicacion = book.año_publicacion,
        this.edicion = book.edicion,
        this.categoria = book.categoria,
        this.editorial = book.editorial,
        this.unidades = book.unidades,
        this.img = book.img,
        this.precio = book.precio
    }

    async save(){
        const newBook = await insert('libro',{
            nombre: this.nombre,
            autor: this.autor,
            año_publicacion: this.año_publicacion,
            edicion:this.edicion,
            categoria:this.categoria,
            editorial: this.editorial,
            unidades: this.unidades,
            img: this.img,
            precio: this.precio
        })
        return newBook
    }

    // usarlo cuando nadie se haya logeado
    static async readAllLibros(){
        return query("SELECT * FROM libro")
    }

    // usarlo cuando se hayan logeado, mostrar los libros que no son del usuario
    static async readFilterBooksOtherUser(id) {
        return query('SELECT * FROM libro WHERE idlibro not in (SELECT idbook FROM user_libro WHERE idusers = ?)',[id])
    }

    // libros del usuario logeado
    static async readFilterBooksUser(id) {
        return query('SELECT * FROM libro l INNER JOIN user_libro ul ON l.idlibro = ul.idbook WHERE idusers = ?',[id])
    }

    static async readFilterByName(nombre) {
        return query(`SELECT * FROM libro WHERE nombre LIKE '%${nombre}%'`)
    }

    static async decrementUnits(id, cantidad) {
        let result = await query(`UPDATE libro SET unidades = unidades - ${cantidad} WHERE idlibro = ?`,[id])
        return result
    }

    static async incrementUnits(id, cantidad) {
        let result = await query(`UPDATE libro SET unidades = unidades + ${cantidad} WHERE idlibro = ?`,[id])
        return result
    }

    validateBook(){
        let result = {success: true, errors: []}
        if (!(this.nombre && this.autor && this.año_publicacion && this.edicion && this.categoria && this.editorial && this.unidades &&  this.img && this.precio)) {
            result.success = false
            result.errors.push('Complete todos los campos')
        }
        return result
    }

    static async readBookById(id){
        let details = await query("SELECT * FROM libro WHERE idlibro=?", [id])
        return details 
    }

    static async deleteBook(id){
        let borrar = await query("DELETE FROM libro WHERE idlibro=?", [id])
        return borrar
    }
    static async update(data, id){
        let actualizar = await query("UPDATE libro SET ? WHERE idlibro=?", [data, id])
        return actualizar
    }
}

module.exports = Book