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