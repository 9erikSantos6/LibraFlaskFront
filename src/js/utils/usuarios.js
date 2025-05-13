// Função para salvar o usuário
export const saveUserData = (userData) => {
    let user = JSON.parse(localStorage.getItem('user')) || [];
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(usersData));
}

// Função para pegar todos os usuários
export const getUserData = () => {
    return JSON.parse(localStorage.getItem('user')) || [];
}

// Função para excluir todos os usuários (caso precise de uma função de limpeza)
export const clearUserData = () => {
    localStorage.removeItem('user');
}