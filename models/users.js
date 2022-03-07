const { insert, checkLogin } = require("../config/database")

class User {
    constructor(user) {
        this.nombre = user.nombre,
        this.appaterno = user.appaterno,
        this.apmaterno = user.apmaterno,
        this.email = user.email,
        this.nombreusuario = user.nombreusuario,
        this.password = user.password
    }

    static async login(data) {
        let result = await checkLogin(data)
        return result
    }

    async save() {
        const newUser = await insert('users', {
            nombre: this.nombre,
            appaterno: this.appaterno,
            apmaterno: this.apmaterno,
            email: this.email,
            nombreusuario: this.nombreusuario,
            password: this.password
        })
        return newUser
    }

    validateFields() {
        let result = {success: true, errors: []}
        if (!(this.nombre && this.apmaterno && this.apmaterno && this.email && this.nombreusuario && this.password)) {
            result.success = false
            result.errors.push('Complete todos los campos')
        }
        return result
    }
}

module.exports = User