// Função para salvar o livro no localStorage
export const saveBookData = (book) => {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}

// Função para pegar todos os livros do localStorage
export const getBooks = () => {
    return JSON.parse(localStorage.getItem('books')) || [];
}

// Função para excluir todos os livros (caso precise de uma função de limpeza)
export const clearBooks = () => {
    localStorage.removeItem('books');
}






