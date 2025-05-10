const editProfileBtn = document.querySelector('.custom-nav-top-btn');
const closeBtn = document.querySelector('.icon-close-add');
const wrapperAdd = document.querySelector('.wrapper-add');
const form = document.querySelector('form');
const cancelBtn = document.querySelector('.btn-cancel');
const confirmBtn = document.querySelector('.btn-confirm');


// Abrir a janela
editProfileBtn.addEventListener('click', () => {
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
    if (!wrapperAdd.contains(e.target) && !editProfileBtn.contains(e.target)) {
        wrapperAdd.classList.remove('active-popup');
        wrapperAdd.classList.remove('active');
        form.reset(); // Limpa o formulário
        confirmBtn.disabled = false; // Habilita o botão de enviar novamente
    }
});

// Cancelar edição
document.querySelector('.btn-cancel').addEventListener('click', () => {
    document.querySelector('.wrapper-add').style.display = 'none'; // Esconder o formulário de edição
});