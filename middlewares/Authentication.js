

const isAuth = (req, res, next) => {
    const user = req.session.user || null
    if (user) {
        next()
    }
    else {
        res.redirect("/auth/login")
    }
}

const isnotAuth = (req, res, next) => {
    const user = req.session.user || null
    if (user) {
   
        res.redirect("/")
    }
    else {
        next() 
    }
}

module.exports = {
    isAuth,
    isnotAuth
}