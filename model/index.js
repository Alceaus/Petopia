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
const checking = await CollfindOne({ username:req.body.username})

try{
    if (checking.username== req.body.username && checking.email == req.body.email && checking.password== req.body.password){
        res.send("User already exist");
    }
    else {
        await LogInCollection. insertMany ([data]);
    }
}
catch{
    res.send ("Wrong inputs")
}

    res.status(201).render("home", {
        naming: req.body.username
    })

})

app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` })
        }

        else {
            res.send("incorrect password")
        }


    } 
    
    catch (e) {

        res.send("wrong details")   

    }

})
app.listen(3000, ()=>{
    console.log("port connected");
})