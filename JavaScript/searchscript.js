// Função para buscar livros

async function searchBooks() {
    const searchInput = document.querySelector('.search-box input'); // Captura o input de pesquisa
    const searchTerm = searchInput.value.toLowerCase(); // Converte para minúsculas para comparação
    const resultsContainer = document.querySelector('.results'); // Container para exibir os resultados

    // Limpa resultados anteriores
    resultsContainer.innerHTML = '';
    if (searchTerm.length === 0) {
        return; // Não faz nada se o campo de pesquisa estiver vazio
    }
    try {
        // Faz uma requisição para o backend Flask
        const response = await fetch(`/search?query=${encodeURIComponent(searchTerm)}`);
        const books = await response.json();
        // Exibe os resultados
        if (books.length > 0) {
            books.forEach(book => {
                const bookElement = document.createElement('div');
                bookElement.classList.add('book-item');
                bookElement.innerHTML = `
                    <h3>${book.titulo}</h3>
                    <p>Autor: ${book.autor}</p>
                    <p>Ano: ${book.ano}</p>
                    <p>Gênero: ${book.genero}</p>
                    <p>Sinopse: ${book.sinopse}</p>
                `;
                resultsContainer.appendChild(bookElement);
            });
        } else {
            resultsContainer.innerHTML = '<p>Nenhum livro encontrado.</p>';
        }
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
        resultsContainer.innerHTML = '<p>Erro ao buscar livros.</p>';
    }
}

// Adiciona um evento de input à barra de pesquisa
document.querySelector('.search-box input').addEventListener('input', searchBooks);