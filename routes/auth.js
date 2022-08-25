const { loginController, loginControllerPost, registerController, registerControllerPost, logoutController } = require("../controllers/authController")
const { isnotAuth } = require("../middlewares/Authentication")

const route = require("express").Router()

route.get("/login", isnotAuth, loginController)

route.post("/login", isnotAuth,  loginControllerPost)

route.get("/register", isnotAuth,  registerController)

route.post("/register", isnotAuth,  registerControllerPost)

route.get("/logout", logoutController)


module.exports = route