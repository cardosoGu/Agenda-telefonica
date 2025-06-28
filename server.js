// Carrega variáveis de ambiente do arquivo .env
require('dotenv').config();

// Importação de módulos principais
const express = require('express');
const app = express();
const mongoose = require('mongoose'); // ODM para MongoDB
const route = require('./routes'); // Rotas da aplicação
const path = require('path');
const csrf = require('csurf'); // Proteção contra CSRF
const session = require('express-session'); // Gerenciamento de sessões
const mongoStore = require('connect-mongo'); // Armazenamento de sessões no MongoDB
const flash = require('connect-flash'); // Mensagens temporárias (flash)
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

// Conexão com MongoDB
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log('Conectado ao banco de dados');
        app.emit('pronto'); // Emite evento para iniciar o servidor após conexão
    })
    .catch(e => console.error(e));

// Inicializa servidor após conexão com o banco
app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('Servidor rodando: http://localhost:3000');
    });
});

// Configuração de sessão com armazenamento no MongoDB
const sessionOptions = session({
    secret: process.env.MY_KEY,
    store: mongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash()); // Habilita mensagens flash

// Middlewares globais
app.use(express.urlencoded({ extended: true })); // Permite leitura de dados de formulários
app.use(express.static(path.resolve(__dirname, 'public'))); // Servir arquivos estáticos

// Proteção CSRF
app.use(csrf());
app.use(checkCsrfError);
app.use(middlewareGlobal);
app.use(csrfMiddleware);

// Rotas
app.use(route);

// Configuração da view engine (EJS)
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');