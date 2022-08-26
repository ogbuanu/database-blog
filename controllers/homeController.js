const Post = require("../models/post")

const homeController = async (req, res) => {
    const user = req.session.user || null
    const message = req.query.message || null
    const posts = await Post.find({}).populate("owner").populate("comments.owner").sort({ _id: -1 });
    res.render("index", { user, message, posts })
}


module.exports = {
    homeController
}