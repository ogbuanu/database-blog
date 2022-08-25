const createPostController = (req, res) => {
    res.render("pages/createpost")
}

const editPostController = (req, res) => {
    res.render("pages/editpost")
}

const viewPostController = (req, res) => {
    res.render("pages/viewpost")
}

module.exports = {
    createPostController,
    editPostController,
    viewPostController
}