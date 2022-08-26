const {
    createPostController,
    editPostController,
    viewPostController,
    createPostControllerPost,
    commentController,
    deleteCommentController,
    editPostControllerPost,
    deletePostController
} = require("../controllers/postController")
const {isAuth} = require("../middlewares/Authentication")

const route = require("express").Router()

route.get("/create-post",isAuth, createPostController)

route.post("/create-post", isAuth, createPostControllerPost)

route.get("/edit-post/:id", isAuth, editPostController)
route.post("/edit-post/:id", isAuth, editPostControllerPost)

route.get("/view-post/:id", viewPostController)

route.post("/add-comment/:postId", isAuth, commentController)

route.get("/delete-comment/:postId/:id", isAuth, deleteCommentController)


route.all("/delete-post/:id", isAuth, deletePostController)




module.exports = route