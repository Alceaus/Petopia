const express = require("express");
const hbs = require("hbs");
const connect = require('./model/mongodb.js');
//const router = require("./controller"); // Import the router object
const app = express();
const session = require("express-session")
const passport = require('passport')

require('./passport-config.js')(passport);
var indexRouter = require('./controller/index');
//var usersRouter = require('./controller/users');

app.use('/static', express.static('public'));
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);
app.use(passport.initialize())
app.use(passport.session())

// Use the router object as middleware
//app.use(router);
app.use('/', indexRouter);
//app.use('/users', usersRouter);

app.listen(3000, async function() {
    console.log("Server connected at port 3000");
    try {
        await connect();
        console.log(`Now connected to MongoDB`);

    } catch (err) {
        console.log('Connection to MongoDB failed: ');
        console.error(err);
    }
});