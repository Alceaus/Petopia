const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

const collection = require("./mongodb"); // Import your MongoDB collection here

const templatePath = path.join(__dirname, "../templates");
const publicPath = path.join(__dirname, "../public");
console.log(publicPath);

app.use(express.json());
app.use(express.static('public'));
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

//navigation bar

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/home", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/createpost", (req, res) => {
    res.render("createpost");
});

app.get("/Abigail", (req, res) => {
    res.render("Abigail");
});

app.get("/userprofile", (req, res) => {
    res.render("userprofile");
});

app.post("/register", async (req, res) => {
    const data = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }

    // Use the `collection` object to insert the data into your MongoDB collection
   
        const checking = await collection.findOne({ username: req.body.username });
        try {
        if (checking.username === req.body.username && checking.password===req.body.password) {
            res.send("User already exists");
        } else {
            await collection.insertMany([data]);;
        }
    } catch {
        res.send("Wrong inputs");
    }
    res.status(201).render("home", {
        username: req.body.username
    })
})

app.post('/login', async (req, res) => {
    try {
        const check = await collection.findOne({ username: req.body.username });

        if (check && check.password === req.body.password) {
            res.status(201).render("home", {naming: `${req.body.password}+${req.body.username}`
            })
        } else {
            res.send("Incorrect password or user does not exist");
        }
    } catch (e) {
        res.send("Wrong details");
    }
});



app.listen(3000, () => {
    console.log("Server connected at port 3000");
});
