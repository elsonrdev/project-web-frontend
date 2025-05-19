const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Importando rotas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1); // Encerra o processo se não conseguir conectar ao MongoDB
});

// Middleware para logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// Rotas para servir os arquivos HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Middleware para tratar rotas não encontradas
app.use((req, res, next) => {
    res.status(404).json({ message: 'Rota não encontrada' });
});

// Tratamento de erros
app.use((err, req, res, next) => {
    console.error('Erro:', err);
    console.error('Stack:', err.stack);
    res.status(500).json({ 
        message: 'Erro no servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
    console.log(`MongoDB URI: ${process.env.MONGODB_URI ? 'Configurado' : 'Não configurado'}`);
    console.log(`JWT Secret: ${process.env.JWT_SECRET ? 'Configurado' : 'Não configurado'}`);
}); 