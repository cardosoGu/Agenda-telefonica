const express = require('express');
const route = express.Router()
const homeControler = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')
const contatoController = require('./src/controllers/contatoController');
const middleware = require('./src/middlewares/middleware');


//rotas da Home
route.get('/', homeControler.index)

//rotas de login
route.get('/login',middleware.logged, loginController.index)
route.post('/login/register', middleware.logged, loginController.register)
route.post('/login/entrar', middleware.logged,loginController.entrar)
route.post('/login/logout', middleware.loginRequired, loginController.logout)

//criacao de contatos
route.get('/contato',middleware.loginRequired, contatoController.addContatoHome)
route.post('/contato/register',middleware.loginRequired, contatoController.addContato)

//editar contatos
route.get('/contato/:id',middleware.loginRequired, contatoController.editContato)
route.post('/contato/edit/:id',middleware.loginRequired, contatoController.edit)

//deletar contato
route.post('/contato/delete/:id',middleware.loginRequired, contatoController.delete)




module.exports = route