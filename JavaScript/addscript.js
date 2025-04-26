const openBtn = document.querySelector('.btnAdd-popup');
const closeBtn = document.querySelector('.icon-close-add');
const wrapperAdd = document.querySelector('.wrapper-add');
const form = document.querySelector('form');
const cancelBtn = document.querySelector('.btn-cancel');
const confirmBtn = document.querySelector('.btn-confirm');

const customAlert = document.getElementById('customAlert');
const closeAlert = document.getElementById('closeAlert');
const closeModalBtn = document.getElementById('closeModalBtn');
const alertMessage = document.getElementById('alertMessage');

// Abrir a janela
openBtn.addEventListener('click', () => {
    wrapperAdd.classList.add('active-popup'); // Adiciona a classe para abrir a janela
    wrapperAdd.classList.add('active'); // Adiciona a classe para expandir a altura
    confirmBtn.disabled = false;// Habilitar o botão de enviar
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
    if (!wrapperAdd.contains(e.target) && !openBtn.contains(e.target)) {
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
    const titulo = form.querySelector('input[placeholder=""]').value;
    const autor = form.querySelectorAll('input[placeholder=""]')[1].value;
    const ano = form.querySelector('input[type="number"]').value;
    const genero = form.querySelectorAll('input[placeholder=""]')[2].value;
    const sinopse = form.querySelector('textarea').value;


     // Criar um objeto livro
     const newBook = {
        titulo: titulo,
        autor: autor,
        ano: ano,
        genero: genero,
        sinopse: sinopse
    };
    
    // Salvar os dados no localStorage
    saveBookData(newBook);

    // Exibe uma mensagem personalizada
    alertMessage.textContent = 'Livro adicionado com sucesso!';
    customAlert.style.display = 'flex';

    // Desabilitar o botão de envio após o primeiro envio
    confirmBtn.disabled = true;

    // Fechar a janela após o envio
    wrapperAdd.classList.remove('active-popup');
    wrapperAdd.classList.remove('active');

    // Limpar o formulário após o envio
    form.reset();

    // Habilitar o botão de envio novamente após limpar o formulário
    confirmBtn.disabled = false;
});

// Botão Cancelar: Limpar formulário e fechar a janela
cancelBtn.addEventListener('click', () => {
    form.reset(); // Limpa os campos do formulário
    wrapperAdd.classList.remove('active-popup'); // Fecha a janela
    wrapperAdd.classList.remove('active'); // Remove a classe de altura expandida
    confirmBtn.disabled = false; // Habilita o botão de enviar novamente
});

// Fechar o alerta
closeAlert.addEventListener('click', () => {
    customAlert.style.display = 'none'; // Esconde a modal
});

// Fechar o alerta com o botão 'Fechar'
closeModalBtn.addEventListener('click', () => {
    customAlert.style.display = 'none'; // Esconde a modal
});