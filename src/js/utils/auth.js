export const salvarAuthToken = (data) => {
    if (data.auth_token) {
        localStorage.setItem('auth_token', data.auth_token);
        return;
    }
    throw new Error('Token de autenticação não encontrado na resposta da API.');
}

export const obterAuthToken = () => {
    return localStorage.getItem('auth_token');
}