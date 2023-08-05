const mongoose = require('mongoose');

function connect() {
    return mongoose.connect("mongodb://0.0.0.0:27017/Petopia")
}

module.exports = connect;