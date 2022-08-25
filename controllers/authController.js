const User = require("../models/user")
const bcrypt = require("bcrypt")

const saltRounds = 10;

const logoutController = (req, res) => {
    req.session.destroy()
    res.redirect("/auth/login")
}

const loginController = (req, res) => {
    const message = req.query.message || null
    const user = req.session.user || null
    res.render("pages/auth/login", {message, user})

}


const loginControllerPost = async (req, res) => {
    
    try {
        const user = await User.findOne({ username: req.body.username })
        if (user) {
            const passwordCheck = await bcrypt.compare(req.body.password, user.password)
            if (passwordCheck) {
            
                req.session.user = user
                res.redirect("/")
            }
            else {
                res.redirect("/auth/login?message=invalid")
            }
        }
        else {
            res.redirect("/auth/login?message=invalid")
            
        }
    }
    catch (err) {
        res.redirect(`/auth/login?message=${err.message}`)
    }

}

const registerController = (req, res) => {
    const message = req.query.message || null
    const user = req.session.user || null
    res.render("pages/auth/register", {message, user})

}


const registerControllerPost = async (req, res) => {
    try {
        const user = new User(req.body)
        if (await checkUserExist(user.username)) {
            res.redirect("/auth/register?message=userExist")

        }
        else {
            user.password = await bcrypt.hash(user.password, saltRounds)
            await user.save()
            res.redirect("/auth/login?message=success")

        }
    }
    catch (err) {
        res.redirect(`/auth/register?message=${err.message}`)
    }

}
const checkUserExist = async (username) => {
    const user = await User.find({ username: username })
    if (!user.length) {
        return false
    }
    return true
}


module.exports = {
    loginControllerPost,
    loginController,
    registerControllerPost,
    registerController,
    logoutController
}