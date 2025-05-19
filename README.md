# Tech Academy

Plataforma de cursos online desenvolvida com Node.js, Express, MongoDB e React.

## Funcionalidades

### Usuários
- Registro e login de usuários
- Gerenciamento de perfil
- Alteração de senha
- Visualização de cursos

### Administração
- Painel administrativo
- Gerenciamento de usuários (criar, editar, excluir)
- Controle de funções (admin/user)

## Tecnologias Utilizadas

- **Backend**
  - Node.js
  - Express
  - MongoDB (Mongoose)
  - JWT para autenticação
  - bcryptjs para criptografia de senhas

- **Frontend**
  - HTML5
  - CSS3
  - JavaScript (ES6+)
  - Local Storage para gerenciamento de estado

## Estrutura do Projeto

```
tech-academy/
├── models/
│   └── User.js
├── routes/
│   ├── auth.js
│   ├── users.js
│   └── admin.js
├── middleware/
│   └── auth.js
├── public/
│   ├── index.html
│   ├── admin.html
│   └── styles.css
├── server.js
├── package.json
└── README.md
```

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/tech-academy.git
cd tech-academy
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
MONGODB_URI=sua_uri_do_mongodb
JWT_SECRET=sua_chave_secreta
PORT=3000
```

4. Inicie o servidor:
```bash
npm start
```

Para desenvolvimento, use:
```bash
npm run dev
```

## Uso

1. Acesse a aplicação em `http://localhost:3000`
2. Registre um novo usuário
3. Faça login com suas credenciais
4. Acesse o painel administrativo em `http://localhost:3000/admin` (apenas para usuários admin)

## Segurança

- Senhas são criptografadas usando bcrypt
- Autenticação via JWT
- Proteção de rotas com middleware
- Validação de dados
- Sanitização de inputs

## Limitações

- Não implementa recuperação de senha
- Não possui sistema de notificações
- Não possui upload de arquivos
- Não possui sistema de pagamentos

## Melhorias Futuras

- Implementar sistema de cursos
- Adicionar sistema de pagamentos
- Implementar recuperação de senha
- Adicionar sistema de notificações
- Implementar upload de arquivos
- Adicionar testes automatizados
- Implementar CI/CD

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 