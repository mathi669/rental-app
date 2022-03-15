const express = require("express");
const { port } = require("./config")
const { engine } = require('express-handlebars')
const session = require('express-session')
const path = require('path')
const { DateTime } = require('luxon')
const moment = require("moment")

const routerUser = require('./routes/users')
const routerLibro = require('./routes/libros')
const routerRenta = require('./routes/renta')

const addSession = require('./middleware/session')

const app = express()

app.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized: false
}))

app.use(addSession)

app.engine('hbs', engine({
    extname: 'hbs',
    // defaultLayout: false,
    partialsDir: path.join(__dirname,'views','components'),
    helpers:{
        formatDate: function(date){
            const newDate = moment(date).format('yyyy-MM-DD')
            return newDate
        },
        dateToday: function(){
            const date = moment().format('yyyy-MM-DD')
            return date
        }
    },
}))

app.set('view engine', 'hbs')
app.set('views','./views')

app.use(express.static(path.join(__dirname,"static")))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(routerUser)
app.use(routerLibro)
app.use(routerRenta)

app.listen(port, function (){
    console.log("Funcionando ... http://localhost:"+port)
})