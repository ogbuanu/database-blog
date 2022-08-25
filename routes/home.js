const { homeController } = require("../controllers/homeController")

const route = require("express").Router()


route.get("/", homeController)


module.exports = route