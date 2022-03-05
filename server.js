const express = require("express");
const { port } = require("./config")

const app = express()

app.listen(port, function (){
    console.log("Funcionando.. http://localhost:"+port)
})