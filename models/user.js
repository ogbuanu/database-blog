const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: {
        required: true,
        type: String,
        minLength: 5
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String,
        minLength: 6
    },
    
})

module.exports = mongoose.model("User", UserSchema)