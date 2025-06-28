const { Register } = require('../models/RegisterClass');
const { Login } = require('../models/LoginClass');

//index
exports.index = (req, res, next) => {
    res.render('login')
    console.log(req.session.user);


}

//Login
exports.entrar = async (req, res, next) => {
    try {
        const login = new Login(req.body) 
        await login.login()

        if (login.errors.length > 0) {
            req.flash('errors', login.errors) 
            req.session.save(() => {
                return res.redirect('/login')
            })
            return
        }

        req.flash('success', 'Voce fez login com sucesso!')
        req.session.user = login.user
        req.session.save(() => {
            res.redirect('/')
        })
    }
    catch (e) { console.log(e) }
}

//registrar
exports.register = async (req, res, next) => {
    try {
        const login = new Register(req.body) 
        await login.register() 

        if (login.errors.length > 0) {
            req.flash('errors', login.errors) 
            req.session.save(() => {
                return res.redirect('/login')
            })
            return
        }

        req.flash('success', 'Sua conta foi registrada com sucesso!')
        req.session.save(() => {
            res.redirect('/login')
        })
    }
    catch (e) { console.log(e) }
}

exports.logout = async (req, res, next) => {
    req.session.destroy(() => res.redirect('/'))

}