const express = require("express");
const User = require("../model/usersModel");
const Pet = require("../model/petsModel");
const router = express.Router();
const bcrypt = require("bcrypt");

const { checkAuthenticated, checkNotAuthenticated } = require('./auth');

const urlencoder = express.urlencoded({extended: false,});

router.get("/", checkNotAuthenticated, function (req, res) {
    res.render("login");
});

router.get("/home", checkAuthenticated, async function (req, res) {
    try {
        // Fetch all pet data from the database using the Pet model
        const pets = await Pet.find({});

        // Pass the pet data to the home view template
        res.render("home", { pets: pets });
    } catch (error) {
        console.error('Error fetching pet data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/createpost", (req, res) => {
    res.render("createpost");
});

router.get("/login", checkNotAuthenticated, (req, res) => {
    res.render("login");
    console.log("login");
});


router.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register");
  console.log("register");
});

router.get("/signout", urlencoder, (req, res) => {
    res.redirect('/')
    req.session.destroy();
    console.log("index signout");
});

router.get("/about",(req, res) => {

    res.render("about", {
        loggedin:req.session.loggedin,
        role : req.session.role,

    });
});

router.post('/createpost', checkAuthenticated, async (req, res) => {
    const { petname, furtype, weight, likes, dislikes  } = req.body;

    console.log('Received pet data:', { petname, furtype, weight, likes, dislikes });

    try {
        const pet = new Pet({
            petname, 
            furtype, 
            weight, 
            likes, 
            dislikes
        });

        await pet.save();
        res.redirect("/home"); // Redirect to the login page after successful registration
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/register', checkNotAuthenticated, async (req, res) => {
    const { email, username, password } = req.body;

    console.log('Received registration data:', { email, username, password });

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    try {
        const user = new User({
            email,
            username,
            password: hash,
        });

        await user.save();
        res.redirect("/login"); // Redirect to the login page after successful registration
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post("/login", checkNotAuthenticated, async (req, res) => {
    const { username, password } = req.body;

    console.log("post login " + username);

    try {
        const user = await User.findOne({ username: username });

        if (user) {
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (isPasswordValid) {
                console.log("loginsuccess ");
                req.session.usernamename = user.username;
                req.session.email = user.email;
                req.session.loggedin = true; // Use boolean true instead of string "true"
                req.session.role = user.role;
                res.status(200).json({ message: 'Login successful.' });
            } else {
                console.log("login fail ");
                res.status(401).json({ err: 'Invalid Username/Password. Please try logging in again.' });
            }
        } else {
            console.log("login fail ");
            res.status(401).json({ err: 'Invalid Username/Password. Please try logging in again.' });
        }
    } catch (error) {
        console.error('Error while logging in:', error);
        res.status(500).json({ err: 'Internal Server Error.' });
    }
});

module.exports = router;