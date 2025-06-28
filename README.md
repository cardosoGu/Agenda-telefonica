# Projeto Agenda

Agenda simples feita com Node.js, Express e MongoDB pra gerenciar contatos de usuários.

---

## Funcionalidades

- Criar, editar, listar e deletar contatos
- Validação simples dos dados
- Login com email e senha criptografada
- Controle de contatos por usuário

---

## Tecnologias

- Node.js  
- Express  
- MongoDB + Mongoose  

- dotenv (variáveis de ambiente)  
- csurf (proteção CSRF)  
- express-session (sessões de usuário)  
- connect-mongo (armazenamento de sessão no MongoDB)  
- connect-flash (mensagens flash)  
- validator (validação de dados)  
- bcryptjs (hash de senha)  

---

## Estrutura padrão MVC

models/ → modelos do MongoDB (usuário, contato)

controllers/ → regras de negócio e controle das rotas

routes/ → definição das rotas da aplicação

views/ → templates (se usar view engine)

public/ → arquivos estáticos (css, js, imagens)

---

## Como rodar

1. Clone o repo:
```bash
git clone https://github.com/cardosoGu/Agenda-telefonica.git
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (ex: conexão com MongoDB) no arquivo `.env`

4. Rode o servidor:
```bash
npm start
```

5. Acesse em `http://localhost:3000` (ou porta configurada)

---

## Autor

Gustavo Cardoso - Programador em ascensão 🚀

https://github.com/cardosoGu
