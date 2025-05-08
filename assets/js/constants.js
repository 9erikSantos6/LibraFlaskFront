const API_BASE_URL = 'http://localhost:15000'; // URL base da API

export const API_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/registrar`,
    LIVROS: `${API_BASE_URL}/livros`,
    LIVRO: (id) => `${API_BASE_URL}/livros/${id}`,
};