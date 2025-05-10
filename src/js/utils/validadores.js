// Função para verificar se o e-mail já está cadastrado
export const checkEmailExists = (email) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];// Recupera todos os usuários do localStorage
    return users.some(user => user.email === email);// Verifica se algum usuário já possui o e-mail
}

// Função para verificar se o e-mail é valido
export const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}