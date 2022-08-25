const mongoose = require('mongoose')

 const connectDb = () => {
    console.log("Connecting...")
    mongoose.connect("mongodb://localhost/database_blog", () => {

   
        console.log("Connected...")
    })
}
module.exports = {
    connectDb
}