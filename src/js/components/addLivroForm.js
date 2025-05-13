import { customModalAlert } from './customModal.js';
import { API_ENDPOINTS, requestAPI } from '../utils/api.js';

const addLivroBtn = document.querySelector('.custom-nav-top-btn');
const closeBtn = document.querySelector('.icon-close-add');
const wrapperAdd = document.querySelector('.wrapper-add');
const form = document.querySelector('form');
const cancelBtn = document.querySelector('.btn-cancel');
const confirmBtn = document.querySelector('.btn-confirm');


// Abrir a janela
addLivroBtn.addEventListener('click', () => {
    wrapperAdd.classList.add('active-popup'); // Adiciona a classe para abrir a janela
    wrapperAdd.classList.add('active'); // Adiciona a classe para expandir a altura
    confirmBtn.disabled = false; // Habilitar o botão de enviar
});

// Fechar a janela
closeBtn.addEventListener('click', () => {
    wrapperAdd.classList.remove('active-popup'); // Remove a classe para fechar a janela
    wrapperAdd.classList.remove('active'); // Remove a classe para voltar à altura inicial
    form.reset(); // Limpa os campos do formulário
    confirmBtn.disabled = false; // Habilita o botão de enviar novamente
});

// Fecha a janela se clicar fora
document.addEventListener('click', (e) => {
    if (!wrapperAdd.contains(e.target) && !addLivroBtn.contains(e.target)) {
        wrapperAdd.classList.remove('active-popup');
        wrapperAdd.classList.remove('active');
        form.reset(); // Limpa o formulário
        confirmBtn.disabled = false; // Habilita o botão de enviar novamente
    }
});

// Envio do formulário (confirmar a adição do livro)
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Previne o envio padrão para não recarregar a página

    // Obter os valores dos campos do formulário
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const data = document.getElementById('data').value;
    const genero = document.getElementById('genero').value;
    const sinopse = document.getElementById('sinopse').value;

    // Verificar se todos os campos foram preenchidos
    if (!titulo || !autor || !data || !genero || !sinopse) { // Corrigido para 'data'
        customModalAlert.abrirModal('Por favor, preencha todos os campos!', 'Fechar');
        return;
    }

    // Criar um objeto livro
    const newBook = {
        titulo: titulo,
        autor: autor,
        data: data,
        genero: genero,
        sinopse: sinopse
    };

    requestAPI('POST', API_ENDPOINTS.LIVRO, newBook)
        .then(response => response.json()) // Espera a resposta em JSON
        .then(data => {
            // Exibe a mensagem personalizada de sucesso
            customModalAlert.abrirModal('Livro adicionado com sucesso!', 'Fechar');
            // Fechar a janela após o envio
            wrapperAdd.classList.remove('active-popup');
            wrapperAdd.classList.remove('active');
            // Limpar o formulário após o envio
            form.reset();
            console.log('Livro adicionado:\n', data);
        })
        .catch(error => {
            console.error(error);
            customModalAlert.abrirModal('correu um erro ao adicionar o livro', 'Fechar');
        })
        .finally(() => {
            // Habilitar o botão de envio novamente
            confirmBtn.disabled = false;
        });
});

// Formatação da data
document.getElementById("data").addEventListener("input", function (e) {
    let data = e.target.value.replace(/\D/g, '');
    if (data.length > 2 && data.length <= 4) {
        data = data.slice(0, 2) + '/' + data.slice(2);
    } else if (data.length > 4) {
        data = data.slice(0, 2) + '/' + data.slice(2, 4) + '/' + data.slice(4, 8);
    }
    e.target.value = data;
});

// Botão Cancelar: Limpar formulário e fechar a janela
cancelBtn.addEventListener('click', () => {
    form.reset(); // Limpa os campos do formulário
    wrapperAdd.classList.remove('active-popup'); // Fecha a janela
    wrapperAdd.classList.remove('active'); // Remove a classe de altura expandida
    confirmBtn.disabled = false; // Habilita o botão de enviar novamente
});