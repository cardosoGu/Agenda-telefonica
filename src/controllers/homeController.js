const contato = require('../models/contatoModel');

exports.index = async (req, res) => {
    try {
        if (req.session.user) {
           const contatos = await contato.buscaContatos(req.session.user._id)
        res.render('index', {contatos})
        return 
        }else{
             res.render('index')
        }
        
    } catch (e) {
        console.log(e);
        res.render('404')
    }
}