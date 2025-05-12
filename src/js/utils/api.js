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
        const texto = await resposta.text();

        let data;
        try {
            data = JSON.parse(texto);
        } catch {
            data = texto;
        }

        return {
            ok: resposta.ok,
            status: resposta.status,
            data
        };
    } catch (erro) {
        if (erro instanceof TypeError && erro.message === 'Failed to fetch') {
            throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.');
        }
        throw erro;
    }
}