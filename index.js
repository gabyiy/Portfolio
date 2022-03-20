const express = require("express")
const bodyParser = require("body-parser")
const ejs = require ("ejs")
const mongoose = require ("mongoose")
const res = require("express/lib/response")


const app= express()

app.set("view engine", "ejs")

app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://gabi:711334@cluster0.4uo4k.mongodb.net/portfolioDB?retryWrites=true&w=majority")


const contactSchema = new mongoose.Schema({
  userName:String,
  email:String,
  comment:String
})

const User = mongoose.model("User",contactSchema)

const userPost = new User({
  userName:"Gabi",
  email:"lol",
  comment:"functioneaza"
})
// userPost.save()

app.get("/",(req,res)=>{

    res.render("index")
})


app.get("/projects",(req,res)=>{
  res.render("projects")
})

app.get("/resume",(req,res)=>{
  res.render("resume")
})

app.get("/contact",(req,res)=>{
  res.render("contact")
})

app.get("/usersMessages",(req,res)=>{
  User.find({},(err,result)=>{
    res.render("usersMessages",{users:result})
    console.log(result);
  })
 })

app.post("/contact",(req,res)=>{
  const newUser= new User({
    userName: req.body.name,
    email: req.body.email,
    comment: req.body.comment
  })
// newUser.save()

res.render("index")
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port,()=>{
    console.log("server up on port 3000");
});
