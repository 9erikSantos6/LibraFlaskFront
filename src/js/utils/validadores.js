// Função para verificar se o e-mail é valido
export const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})*$/;
    return emailRegex.test(email);
};


export const isValidUsername = (username) => {
    const usernameRegex = /^[a-z0-9_-]{3,20}$/;
    return usernameRegex.test(username.toLowerCase());
}

export const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,100}$/;
    return passwordRegex.test(password);
}

export const passwordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
}