// Função para verificar se o e-mail é valido
export const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})*$/;
    return emailRegex.test(email);
};

// Função para verificar se o nome de usuário é valido
export const isValidUsername = (username) => {
    const usernameRegex = /^[a-z0-9_-]{3,20}$/;
    return usernameRegex.test(username.toLowerCase());
}

// Função para verificar se a senha é valida
export const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,100}$/;
    return passwordRegex.test(password);
}

// Função para verificar se as senhas coincidem
export const passwordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
}