
const { insert , query } = require("../config/database")

class Book {
    constructor(book){
        this.nombre = book.nombre,
        this.autor = book.autor,
        this.año_publicacion = book.año_publicacion,
        this.edicion = book.edicion,
        this.categoria = book.categoria,
        this.provincia = book.provincia,
        this.editorial = book.editorial,
        this.unidades = book.unidades,
        this.img = book.img,
        this.precio = book.precio,
        this.iduser = book.iduser
    }

    async save(){
        const newBook = await insert('libro',{
            nombre: this.nombre,
            autor: this.autor,
            año_publicacion: this.año_publicacion,
            edicion:this.edicion,
            categoria:this.categoria,
            provincia: this.provincia,
            editorial: this.editorial,
            unidades: this.unidades,
            img: this.img,
            precio: this.precio,
            iduser: this.iduser
        })
        return newBook
    }

    static async readAllLibros(){
        return query("SELECT * FROM libro")
    }

    static async decrementUnits(id, cantidad) {
        let result = await query(`UPDATE libro SET unidades = unidades - ${cantidad} WHERE idlibro = ?`,[id])
        console.log(result);
        return result
    }

    static async incrementUnits(id, cantidad) {
        let result = await query(`UPDATE libro SET unidades = unidades + ${cantidad} WHERE idlibro = ?`,[id])
        return result
    }

    validateBook(){
        let result = {success: true, errors: []}
        if (!(this.nombre && this.autor && this.año_publicacion && this.edicion && this.categoria && this.provincia && this.editorial && this.unidades &&  this.img && this.precio)) {
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