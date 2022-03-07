class LibroController {
    getViewHome(req, res) {
        return res.render('home', {tittle: 'Home'})
    }
}

module.exports = LibroController