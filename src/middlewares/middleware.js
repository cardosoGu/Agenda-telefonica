const middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors')
    res.locals.success = req.flash('success')
    res.locals.user = req.session.user
    next();
}
const checkCsrfError = (err, req, res, next) => {
    if (err && err.code === 'EBADCSRFTOKEN') {
        return res.render('404')
    }
    next()
}
const csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next();
}
const loginRequired = (req, res, next) => {
    if (!req.session.user) {
        req.flash('errors', 'Precisa estar logado!')
        return req.session.save(() => {
            res.redirect('/')

        })
    }
    next();
}
const logged = (req, res, next) => {
    if (req.session.user) {
        req.flash('errors', 'ja esta logado, precisa finalizar o login atual primeiro!')
        return req.session.save(() => {
            res.redirect('/')

        })
    }
    next();
}
module.exports = { logged, loginRequired, middlewareGlobal, checkCsrfError, csrfMiddleware }