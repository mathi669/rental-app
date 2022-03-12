const User = require("../models/users")
const bcrypt = require('bcrypt')

class UserController {
    getViewIndex(req, res) {
        return res.render('index',{tittle: 'Index'})
    }

    getViewRegister(req, res) {
        return res.render('register', {tittle: 'Register'})
    }

    getViewLogin(req, res) {
        return res.render('login', {tittle: 'Log In'})
    }

    logout(req, res) {
        req.session.destroy()
        return res.redirect('/')
    }

    async register(req, res) {
        let newUser = new User(req.body)
        let validation = newUser.validateFields()
        if (validation.success) {
            let result = await newUser.save()
            if (!result.success) {
                return res.render('register',{error: true, message: result.error, data: req.body})
            }
            return res.redirect('/')
        } else {
            return res.render('register', {error: true, message: validation.errors, data: req.body})
        }
        
        // return res.redirect('/home')
    }

    async login(req, res) {
        let dataresult = await User.login(req.body)
        let tam = Object.keys(dataresult).length

        if (tam === 0 || !(await bcrypt.compare(req.body.password, dataresult[0].password))) {
            return res.render('login', {error: true, message: 'Nombre de usuario y/o contraseña incorrecta', data: req.body})
        }
        req.session.loggedIn = true
        req.session.username = dataresult[0].nombreusuario
        req.session.idUser = dataresult[0].id
        return res.redirect('/')
    }
}

module.exports = UserController