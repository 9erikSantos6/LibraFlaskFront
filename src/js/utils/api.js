const API_BASE_URL = 'http://localhost:15000'; // URL base da API

export const API_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/registrar`,
    LIVROS: `${API_BASE_URL}/livros`,
    LIVRO: (id) => `${API_BASE_URL}/livros/${id}`,
};

export const requestAPI = async (method, url, body = null, token = null) => {
    let opcoes = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (token) {
        opcoes.headers['Authorization'] = `Bearer ${token}`;
    }

    if (body && method !== 'GET') {
        opcoes.body = JSON.stringify(body);
    }

    try {
        const resposta = await fetch(url, opcoes);
        if (!resposta.ok) {
            const textoErro = await resposta.text();
            throw new Error(`Erro de requisição! Status: ${resposta.status} - ${textoErro}`);
        }
        const texto = await resposta.text();
        return texto ? JSON.parse(texto) : null;
    } catch (erro) {
        console.error(erro);
        return null;
    }
}