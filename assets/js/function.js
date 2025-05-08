// Função para salvar o livro no localStorage
function saveBookData(book) {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}

// Função para pegar todos os livros do localStorage
function getBooks() {
    return JSON.parse(localStorage.getItem('books')) || [];
}

// Função para excluir todos os livros (caso precise de uma função de limpeza)
function clearBooks() {
    localStorage.removeItem('books');
}

// Função para salvar o usuário
function saveUserData(user) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

// Função para pegar todos os usuários
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Função para verificar se o e-mail já está cadastrado
function checkEmailExists(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];// Recupera todos os usuários do localStorage
    return users.some(user => user.email === email);// Verifica se algum usuário já possui o e-mail
}

// Função para excluir todos os usuários (caso precise de uma função de limpeza)
function clearUsers() {
    localStorage.removeItem('users');
}

// Função para verificar se o e-mail é valido
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}


async function realizarRequisicaoAPI(method, url, body = null, token = null) {
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


function salvarAuthToken(data) {
    if (data.auth_token) {
        localStorage.setItem('auth_token', data.auth_token);
        return;
    }
    throw new Error('Token de autenticação não encontrado na resposta da API.');
}

function obterAuthToken() {
    return localStorage.getItem('auth_token');
}