const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const User = require('../models/User');

// Middleware para verificar se o usuário é admin
router.use(protect);
router.use(admin);

// Listar todos os usuários
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

// Obter usuário por ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

// Criar novo usuário
router.post('/users', async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;

        // Verifica se o email já está em uso
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email já está em uso' });
        }

        const user = await User.create({
            name,
            email,
            password,
            phone,
            role: role || 'user'
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

// Atualizar usuário
router.put('/users/:id', async (req, res) => {
    try {
        const { name, email, phone, role } = req.body;

        // Verifica se o email já está em uso por outro usuário
        if (email) {
            const existingUser = await User.findOne({ email, _id: { $ne: req.params.id } });
            if (existingUser) {
                return res.status(400).json({ message: 'Email já está em uso' });
            }
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, phone, role },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

// Excluir usuário
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

module.exports = router; 