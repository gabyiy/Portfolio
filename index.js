const express = require("express")
const bodyParser = require("body-parser")
const ejs = require ("ejs")
const mongoose = require ("mongoose")
const  dotenv = require ('dotenv');


var bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10);

dotenv.config();
const app= express()

app.set("view engine", "ejs")

app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect(process.env.MONGODB_URL)


const contactSchema = new mongoose.Schema({
  userName:String,
  email:String,
  comment:String
})

const User = mongoose.model("User",contactSchema)


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
    comment: req.body.message
  })  
 newUser.save()

res.render("index")
})



app.post("/delete",(req,res)=>{
   const idUser=req.body.checkbox

   User.findByIdAndRemove({_id:idUser},(err)=>{
     if(err){
       console.log(err);
     }else{
       console.log("user deletede succeusfuly");
       User.find({},(err,usersLeft)=>{
         if (err){
           console.log(err);
         }else{
          res.render("usersMessages",{users:usersLeft})
         }
       })
    
     }
   })
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port,()=>{
    console.log("server up on port 3000");
});
