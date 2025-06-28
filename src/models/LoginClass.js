const mongoose = require('mongoose');
const validator = require('validator'); // valida email
const bcryptjs = require('bcryptjs');   // pra hash e comparar senha
const LoginModel = require('./loginModel');

class Login {
    constructor(body) {
        this.body = body
        this.errors = []
        this.user = null  // vai guardar o user encontrado no login
    }

    async login() {
        this.validar()
        if (this.errors.length > 0) return  // para se tiver erro na validação

        // busca usuário pelo email
        this.user = await LoginModel.findOne({ email: this.body.email })
        if (this.user === null) {
            this.errors.push('Email não está cadastrado!')
            return
        }

        // compara senha do form com o hash do banco
        if (!bcryptjs.compareSync(this.body.senha, this.user.senha)) {
            this.errors.push('Senha incorreta!')
            this.user = null
            return
        }
    }

    validar() {
        this.CleanUp()
        // verifica se email é válido
        if (!validator.isEmail(this.body.email)) this.errors.push('Email inválido!')
        // verifica se senha tem entre 8 e 16 caracteres
        if (this.body.senha.length < 8 || this.body.senha.length > 16) this.errors.push('Senha incorreta!')
    }

    CleanUp() {
        // garante que todos os campos são strings, se não, zera eles
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }
        // mantem só email e senha no corpo (limpando qualquer extra, tipo _csrf)
        this.body = {
            email: this.body.email,
            senha: this.body.senha
        }
    }
}

module.exports = { Login }
