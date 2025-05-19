const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware para proteger rotas
exports.protect = async (req, res, next) => {
    try {
        // Verifica se o token existe
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Não autorizado' });
        }

        // Verifica o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Verifica se o usuário ainda existe
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        // Adiciona o usuário ao request
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Não autorizado' });
    }
};

// Middleware para verificar se o usuário é admin
exports.admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Acesso negado' });
    }
}; 