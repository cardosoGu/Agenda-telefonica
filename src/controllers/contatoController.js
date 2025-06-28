// Importa o modelo de contatos
const AddContato = require('../models/contatoModel');

// Render home
exports.addContatoHome = (req, res, next) => {
    // Envia um objeto vazio para evitar erro nos campos do formulário
    res.render('contato', { contato: {} });
}

// Cria um novo contato (POST /contato/register)
exports.addContato = async (req, res, next) => {
    try {
        const addCtt = new AddContato(req.body, req.session.user._id);
        await addCtt.add();

        if (addCtt.errors.length > 0) {
            req.flash('errors', addCtt.errors);
            req.session.save(() => res.redirect('/contato'));
            return;
        }
        req.flash('success', 'Contato criado com sucesso!');
        req.session.save(() => res.redirect(`/contato/${addCtt.contato._id}`));

    } catch (e) {
        console.error(e);
        res.render('404');
    }
}

// Renderiza formulário de edição preenchido com os dados do contato (GET /contato/:id)
exports.editContato = async (req, res, next) => {
    if (!req.params.id) return res.render('404');
    const contato = await AddContato.findContato(req.params.id, req.session.user._id);
    if (!contato) return res.render('404');

    // Renderiza o formulário de edição com os dados carregados
    res.render('contato', { contato });
}

// Atualiza um contato existente (POST /contato/edit/:id)
exports.edit = async (req, res, next) => {
    try {
        if (!req.params.id) return res.render('404');

        // Cria instância com os novos dados do formulário
        const editCtt = new AddContato(req.body, req.session.user._id);
        await editCtt.edit(req.params.id);

        if (editCtt.errors.length > 0) {
            req.flash('errors', editCtt.errors);
            req.session.save(() => res.redirect(req.get('referer')));
            return;
        }

        req.flash('success', 'Contato editado com sucesso!');
        req.session.save(() => res.redirect(`/contato/${editCtt.contato._id}`));

    } catch (e) {
        console.error(e);
        res.render('404');
    }
}

// Deleta um contato (GET /contato/delete/:id)
exports.delete = async (req, res, next) => {
    if (!req.params.id) return res.render('404');

    try {
        const contato = await AddContato.delete(req.params.id, req.session.user._id);
        if (!contato) return res.render('404');

        req.flash('success', 'Contato apagado!');
        req.session.save(() => res.redirect('/'));

    } catch (e) {
        console.error(e);
        res.render('404');
    }
}
