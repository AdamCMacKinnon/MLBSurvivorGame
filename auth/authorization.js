
function authorization(req,res,next) {
    if(req.session){
        if(req.session.user) {
            res.locals.authenticated = true
            next()
        } else {
            req.session.destroy()
            res.redirect('/')
        }
    } else {
        req.session.destroy()
        res.redirect('/')
    }
}

module.exports = authorization