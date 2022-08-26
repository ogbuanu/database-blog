const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 8
    },
    body: {
        type: String,
        required: true,
        minLength: 10
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    comments: [
        {
            owner: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: "User"
            },
            body: {
                type: String,
                required: true,
                minLength: 8
            }
        }
    ]
})


module.exports = mongoose.model("Post", PostSchema)