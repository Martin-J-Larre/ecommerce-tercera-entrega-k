const guestMiddleware = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next()
    } else {
        res.redirect('/homepage')
    }
}

module.exports = {
    guestMiddleware
}