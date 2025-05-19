const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { protect } = require('../middleware/auth');

// Middleware para proteger todas as rotas
router.use(protect);

// Obter perfil do usuário
router.get('/profile', async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

// Atualizar perfil do usuário
router.put('/profile', async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        // Verifica se o email já está em uso por outro usuário
        if (email) {
            const existingUser = await User.findOne({ email, _id: { $ne: req.user._id } });
            if (existingUser) {
                return res.status(400).json({ message: 'Email já está em uso' });
            }
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name, email, phone },
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

// Alterar senha
router.put('/change-password', async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        // Busca o usuário com a senha
        const user = await User.findById(req.user._id).select('+password');
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Verifica a senha atual
        const isPasswordValid = await user.comparePassword(currentPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Senha atual incorreta' });
        }

        // Atualiza a senha
        user.password = newPassword;
        await user.save();

        res.json({ message: 'Senha alterada com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

module.exports = router; 