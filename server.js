const express = require("express");
const { port } = require("./config")
const { engine } = require('express-handlebars')
const path = require('path')
const routerUser = require('./routes/users')
const routerLibro = require('./routes/libros')

const app = express()

app.engine('hbs', engine({
    extname: 'hbs',
    // defaultLayout: false,
    partialsDir: path.join(__dirname,'views','components')
}))

app.set('view engine', 'hbs')
app.set('views','./views')

app.use(express.urlencoded({extended:true}))

app.use(routerUser)
app.use(routerLibro)

app.listen(port, function (){
    console.log("Funcionando.. http://localhost:"+port)
})