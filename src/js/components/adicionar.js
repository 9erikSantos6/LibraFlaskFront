// import { API_ENDPOINTS, requestAPI } from '../utils/api.js';
// import { customModalAlert } from './customModal.js';

// const bookContainer = document.getElementById('bookContainer');

// // Função para carregar os livros do banco de dados
// const loadBooks = async () => {
//     try {
//         const books = await requestAPI('GET', API_ENDPOINTS.LIVROS);
//         displayBooks(books);
//     } catch (error) {
//         customModalAlert.abrirModal('Erro ao carregar livros.', 'Fechar');
//     }
// };

// // Função para exibir os livros na tela
// const displayBooks = (books) => {
//     bookContainer.innerHTML = ''; // Limpa o container antes de adicionar novos livros
//     books.forEach(book => {
//         const bookItem = document.createElement('div');
//         bookItem.classList.add('book-item');
//         bookItem.innerHTML = `
//             <h2>${book.titulo}</h2>
//             <p>Autor: ${book.autor}</p>
//             <p>Ano: ${book.data}</p>
//             <p>Gênero: ${book.genero}</p>
//             <p>Sinopse: ${book.sinopse}</p>
//             <button class="delete-btn" data-id="${book.id}">Deletar</button>
//         `;
//         bookContainer.appendChild(bookItem);
//     });

//     // Adicionar evento de clique para cada botão de deletar
//     const deleteButtons = document.querySelectorAll('.delete-btn');
//     deleteButtons.forEach(button => {
//         button.addEventListener('click', deleteBook);
//     });
// };

// // Função para deletar um livro
// const deleteBook = async (e) => {
//     const bookId = e.target.getAttribute('data-id');
//     const response = await requestAPI('DELETE', API_ENDPOINTS.LIVRO(bookId));
//     if (response) {
//         customModalAlert.abrirModal('Livro deletado com sucesso!', 'Fechar');
//         loadBooks(); // Recarrega os livros após a deleção
//     } else {
//         customModalAlert.abrirModal('Erro ao deletar o livro.', 'Fechar');
//     }
// };

// // Carregar os livros ao iniciar a página
// loadBooks();

// // Adicionar evento de clique para o botão de adicionar livro
// // const addBookBtn = document.getElementById('addBookBtn');
// // addBookBtn.addEventListener('click', () => {
// //     const wrapperAdd = document.getElementById('wrapperAdd');
// //     wrapperAdd.classList.add('active-popup');
// //     wrapperAdd.classList.add('active');
// // });