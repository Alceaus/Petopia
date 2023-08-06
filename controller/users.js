const { Router } = require('express');
const User = require("../model/usersModel");

const router = Router();

router.get('/checkEmail', async function (req, res) {
    const email = req.query.Email;
    try {
        const user = await User.findOne({ Email: email });
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
    const username = req.query.r_username;
    try {
        const user = await User.findOne({ r_username: username });
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



module.exports = router;
