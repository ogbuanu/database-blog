const Post = require("../models/post")

const createPostController = (req, res) => {
    const user = req.session.user || null
    const message = req.query.message || null
    res.render("pages/createpost", {user, message})
}
const createPostControllerPost = async (req, res) => {
    const user = req.session.user
    try {
        const newPost = new Post({ ...req.body, owner: user._id})
        await newPost.save()
        res.redirect("/?message=postCreated")
    } catch (error) {
        res.redirect(`/post/create-post?message=${error.message}`)
    }
}

const editPostController = async (req, res) => {
    const user = req.session.user
    const id = req.params.id.toString()
    const post = await Post.findOne({ _id: id, owner: user._id })
    
    res.render("pages/editpost", {user, post})
}
const editPostControllerPost = async (req, res) => {
    const user = req.session.user
    const id = req.params.id.toString()
    try {
        await Post.findOneAndUpdate({ _id: id, owner: user._id }, req.body)
        res.redirect(`/post/view-post/${id}?message=postUpdated`)
    } catch (error) {
        res.redirect(`/post/view-post/${id}?message=${error.message}`)
    }
}

const viewPostController = async (req, res) => {
    const user = req.session.user || null
    const id = req.params.id.toString()
    const message = req.query.message || null
    const post = await Post.findOne({ _id: id }).populate("owner").populate("comments.owner")
    if (post) {
       res.render("pages/viewpost", {user, post, message})
    }
    else {
        res.status(404).send("Post not found")
    }
   
}

const commentController = async (req, res) => {
    const user = req.session.user
    const postId = req.params.postId.toString()
    try {
        await Post.findOneAndUpdate({ _id: postId }, { $push: { comments: { ...req.body, owner: user._id } } })
        res.redirect(`/post/view-post/${postId}?message=commentAdded`)
    } catch (error) {
        res.redirect(`/post/view-post/${postId}?message=${error.message}`)
    }
}
const deleteCommentController = async (req, res) => {
    const user = req.session.user
    const postId = req.params.postId.toString()
    const id = req.params.id.toString()
    try {
        await Post.findOneAndUpdate({ _id: postId }, { $pull: { comments: { _id: id} } })
        res.redirect(`/post/view-post/${postId}?message=commentRemoved`)
    } catch (error) {
        res.redirect(`/post/view-post/${postId}?message=${error.message}`)
    }
}

const deletePostController = async (req, res) => {
    const user = req.session.user
    const id = req.params.id.toString()
    try {
        await Post.findOneAndDelete({ _id: id, owner: user._id })
        res.redirect(`/?message=postDeleted`)
    }
    catch (err) {
        res.redirect(`/post/view-post/${id}`)
    }
}

module.exports = {
    createPostController,
    editPostController,
    viewPostController,
    createPostControllerPost,
    commentController,
    deleteCommentController,
    editPostControllerPost,
    deletePostController
}