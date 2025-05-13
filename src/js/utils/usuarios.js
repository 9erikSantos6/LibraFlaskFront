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


export function gerarUsername(nome) {
    // Remove acentos, converte para minúsculas, remove caracteres especiais e espaços
    let base = nome
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .toLowerCase()
        .replace(/[^a-z0-9]/g, ''); // Remove tudo que não é letra ou número

    // Garante que a base não fique vazia
    if (!base) base = 'user';

    // Gera um sufixo aleatório de 4 números
    const sufixo = Math.floor(1000 + Math.random() * 9000);

    // Junta base + sufixo e limita a 20 caracteres
    let username = (base + sufixo).slice(0, 20);

    return username;
}