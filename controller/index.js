const express = require("express");
const User = require("../model/usersModel");
const router = express();

const urlencoder = express.urlencoded({extended: false,});

router.get("/", function (req, res) {
    res.render("home");
    console.log("index");
    // console.log(req.session.name);
});

router.get("/createpost", (req, res) => {
    res.render("createpost");
});

router.get("/login", function (req, res) {
    res.render("login");
    console.log("login");
});


router.get("/register", function (req, res) {
  res.render("register");
  console.log("register");
});

router.get("/signout", urlencoder, (req, res) => {
    res.redirect('/')
    req.session.destroy();
    console.log("index signout");
});

router.get("/about", function (req, res) {
  
      res.render("about", {
        loggedin:req.session.loggedin,
        role : req.session.role,

      });
  });
  router.get('/checkEmail', async function (req, res) {
    const email = req.query.email;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            // Email exists in the database
            res.json({ exists: true });
        } else {
            // Email does not exist in the database
            res.json({ exists: false });
        }
    } catch (error) {
        console.error('Error checking email:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/checkUsername', async function (req, res) {
    const username = req.query.username;
    try {
        const user = await User.findOne({ username: username });
        if (user) {
            // Username exists in the database
            res.json({ exists: true });
        } else {
            // Username does not exist in the database
            res.json({ exists: false });
        }
    } catch (error) {
        console.error('Error checking username:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/register', async function (req, res) {
    const { email, username, password } = req.body;
    
    console.log('Received registration data:', { email, username, password });

    try {
        const user = new User({
            email,
            username,
            password,
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully.' });
        res.render("login");
    } catch (error) {
        console.error('Error registering product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/userUpdate', async function (req, res) {
    const { username, password } = req.body;

    try {
        console.log('Update request:', req.body);

        const user = await User.findOne({ username });

        if (user) {
            // User found, update the status
            user.password = password;
            await product.save();
            res.json({ message: 'User information updated successfully.' });
        } else {
            console.log(`Account with username "${username}" not found.`);
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (error) {
        console.error('Error updating user information:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//app.use(urlencoder);

module.exports = router;