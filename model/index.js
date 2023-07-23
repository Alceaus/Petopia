const express=require("express")
const app=express()
const path=require("path")
const hbs=require("hbs")
const collection=require("./mongodb")

const templatePath=path.join(__dirname,'../templates')

//app.use(express.static('../css'));

app.use(express.json())
app.set("view engine","hbs")
app.set("views", templatePath)
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/home",(req,res)=>{
    res.render("home")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/register",(req,res)=>{
    res.render("register")
})


app.post("/register",async (req,res)=>{

const data={
    email:req.body.email,
    username:req.body.username,
    password:req.body.password
}

await collection.insertMany([data])

res.render("login")

})

app.listen(3000, ()=>{
    console.log("port connected");
})