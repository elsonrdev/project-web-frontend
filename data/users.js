// Função para obter todos os usuários
function getAllUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Função para obter um usuário por ID
function getUserById(id) {
    const users = getAllUsers();
    return users.find(user => user.id === id);
}

// Função para obter um usuário por email
function getUserByEmail(email) {
    const users = getAllUsers();
    return users.find(user => user.email === email);
}

// Função para criar um novo usuário
function createUser(userData) {
    const users = getAllUsers();
    const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return newUser;
}

// Função para atualizar um usuário
function updateUser(id, userData) {
    const users = getAllUsers();
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users[index] = { ...users[index], ...userData };
        localStorage.setItem('users', JSON.stringify(users));
        return users[index];
    }
    return null;
}

// Função para excluir um usuário
function deleteUser(id) {
    const users = getAllUsers();
    const filteredUsers = users.filter(user => user.id !== id);
    localStorage.setItem('users', JSON.stringify(filteredUsers));
    return true;
}

// Função para verificar se um email já está em uso
function isEmailInUse(email) {
    const users = getAllUsers();
    return users.some(user => user.email === email);
}

// Função para verificar credenciais de login
function verifyCredentials(email, password) {
    const user = getUserByEmail(email);
    if (user && user.password === password) {
        return user;
    }
    return null;
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
    isEmailInUse,
    verifyCredentials
}; 