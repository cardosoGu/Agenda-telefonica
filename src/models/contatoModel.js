const mongoose = require('mongoose');

// Esquema que define a estrutura do contato no MongoDB
const contatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: true },
    numero: { type: String, required: true },
    criadoEm: { type: Date, required: true, default: Date.now },
    user: { type: String, required: true }  // Quem criou o contato
})

const contatoModel = mongoose.model('contato', contatoSchema)

class AddContato {
    constructor(body, userId) {
        this.body = body
        this.errors = []
        this.contato = null           // Guarda o contato criado ou editado
        this.user = userId            // ID do usuário que fez a operação
    }

    async edit(id) {
        if (typeof id !== 'string') return
        this.validaCampos()
        if (this.errors.length > 0) return
        // Atualiza contato só se for do user e retorna o contato novo
        this.contato = await contatoModel.findOneAndUpdate({ _id: id, user: this.user }, this.body, { new: true })
    }

    async add() {
        this.cleanUp()               
        this.validaCampos()         
        if (this.errors.length > 0) return
        this.contato = await contatoModel.create(this.body) 
    }

    validaCampos() {
        if (!/^[a-zA-Z\s]+$/.test(this.body.nome))
            this.errors.push('Nome não pode conter números ou caracteres especiais')

        if (!/^[a-zA-Z\s]+$/.test(this.body.sobrenome))
            this.errors.push('Sobrenome pode conter apenas letras')

        if (this.body.numero.length !== 11)
            this.errors.push('Número de telefone inválido! Deve ter 11 dígitos')

        if (!this.user)
            this.errors.push('Usuário não identificado')
    }

    cleanUp() {
        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            numero: this.body.numero.replace(/\D/g, ''), //regex apenas numeros.
            user: this.user
        }
    }

    static async findContato(id, user) {
        if (typeof id !== 'string') return
        return await contatoModel.findOne({ user: user, _id: id })
    }

    static async buscaContatos(user) {
        // Busca todos contatos do usuário, ordenados do mais novo pro mais velho
        return await contatoModel.find({ user: user }).sort({ criadoEm: -1 })
    }

    static async delete(id, user) {
        if (typeof id !== 'string') return
        return await contatoModel.findOneAndDelete({ user: user, _id: id });
    }
}

module.exports = AddContato