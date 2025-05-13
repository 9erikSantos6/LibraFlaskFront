// Função para salvar o token de autenticação no localStorage
// Função para salvar o token de autenticação no localStorage
export const salvarAuthToken = (data) => {
    // Verifica se o token de autenticação foi retornado na resposta da API
    // Verifica se o token de autenticação foi retornado na resposta da API
    if (data.auth_token) {
        localStorage.setItem('auth_token', data.auth_token);
        return;
    }
    throw new Error('Token de autenticação não encontrado na resposta do servidor.');
}
// Função para obter o token de autenticação do localStorage
// Função para obter o token de autenticação do localStorage
export const obterAuthToken = () => {
    return localStorage.getItem('auth_token');
}