const express = require("express")
const homeRoute = require("./routes/home")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/post")
const {connectDb} = require("./models")
const bodyParser = require("body-parser")
const session = require("express-session")
const app = express()

connectDb()
app.set("view engine", "ejs")
app.use(session({secret: "dev"}))
app.use(express.static("public"))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))


app.use(homeRoute)


// Auth
app.use("/auth", authRoute)

// post
app.use("/post", postRoute)

app.listen(3000)