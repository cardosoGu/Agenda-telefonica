// Importação de módulos necessários
const mongoose = require('mongoose');
const validator = require('validator'); // Validação de e-mail
const bcryptjs = require('bcryptjs'); // Hash de senhas
const LoginModel = require('./loginModel'); // Modelo de usuário para o MongoDB

// Classe responsável pelo registro de novos usuários
class Register {
    constructor(body) {
        this.body = body; 
        this.errors = []; 
        this.user = null; // Usuário criado, se o registro for bem-sucedido
    }

    // Método principal para registrar o usuário
    async register() {
        this.validar();
        await this.userExiste();
        if (this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync(); // Gera hash seguro da senha antes de salvar no banco
        this.body.senha = bcryptjs.hashSync(this.body.senha, salt);

        this.user = await LoginModel.create(this.body);
    }

    // Verifica se o usuário com o mesmo e-mail já existe
    async userExiste() {
        const user = await LoginModel.findOne({ email: this.body.email });
        if (user !== null) {
            this.errors.push('Email já está em uso.');
        }
    }

    // Valida os campos do formulário
    validar() {
        this.CleanUp();
        if (!validator.isEmail(this.body.email)) {
            this.errors.push('Email inválido.');
        }
        if (this.body.senha.length < 8 || this.body.senha.length > 16) {
            this.errors.push('Senha precisa ter entre 8 a 16 caracteres.');
        }
    }

    // Limpa e padroniza os dados recebidos
    CleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        // Apenas os campos necessários são mantidos
        this.body = {
            email: this.body.email,
            senha: this.body.senha,
        };
    }
}

// Exporta a classe Register para uso em outras partes do projeto
module.exports = { Register };
