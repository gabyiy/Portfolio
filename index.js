const express = require("express")
const bodyParser = require("body-parser")
const ejs = require ("ejs")
const mongoose = require ("mongoose")


const app= express()

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

mongoose.connect("mongodb+srv://gabi:711334@cluster0.4uo4k.mongodb.net/portfolioDB?retryWrites=true&w=majority")

app.get("/",(req,res)=>{

    res.render("index")
})

app.listen(3000,()=>{
console.log("server up");
})