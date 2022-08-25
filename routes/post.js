const { createPostController, editPostController, viewPostController } = require("../controllers/postController")

const route = require("express").Router()

route.get("/create-post", createPostController)

route.get("/edit-post", editPostController)

route.get("/view-post", viewPostController)

module.exports = route