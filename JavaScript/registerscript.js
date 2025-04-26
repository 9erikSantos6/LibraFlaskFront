const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
const registerOverlay = document.querySelector('.overlay');

// Modal de sucesso
const customAlert = document.getElementById('customAlert');
const closeAlert = document.getElementById('closeAlert');
const closeModalBtn = document.getElementById('closeModalBtn');
const alertMessage = document.getElementById('alertMessage');

// Abrir a tela de registro
registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

// Voltar para a tela de login
loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

// Mostrar o popup
btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

// Fechar o popup
iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});

// Fecha popup ao clicar na overlay
registerOverlay.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});

document.addEventListener('click', (e) => {
    // Fecha popup se clicar fora dele
    const isClickInsidePopup = wrapper.contains(e.target) || btnPopup.contains(e.target);
    if (!isClickInsidePopup && !btnPopup.contains(e.target)) {
        wrapper.classList.remove('active-popup'); // Fecha o popup
    }
});

// Função para verificar se o e-mail já está registrado
function checkEmailExists(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.email === email);
}

// Função para validar o e-mail
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

// Salvar os dados do usuário no localStorage
function saveUserData(user) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

// Envio do formulário de registro
const registerForm = document.querySelector('.form-box.register form');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Previne o envio padrão

    // Obter os valores dos campos do formulário
    const nome = registerForm.querySelector('input[placeholder=""]').value;
    const email = registerForm.querySelectorAll('input[placeholder=""]')[1].value;
    const senha = registerForm.querySelector('input[type="password"]').value;
    const emailInput = registerForm.querySelector('input[placeholder=""]'); // Acessando o campo de email

    // Verificar se o e-mail já está cadastrado
    if (checkEmailExists(email)) {
        emailInput.style.borderColor = 'red';
        alertMessage.textContent = 'Este e-mail já está registrado!';
        customAlert.style.display = 'flex';
        return;
    }

    // Verificar se o e-mail é válido
    if (!isValidEmail(email)) {
        emailInput.style.borderColor = 'red';
        alertMessage.textContent = 'Por favor, insira um e-mail válido!';
        customAlert.style.display = 'flex';
        return;
    }

    // Criar um objeto usuário
    const newUser = {
        nome: nome,
        email: email,
        senha: senha
    };

    // Salvar os dados do usuário no localStorage
    saveUserData(newUser);

    // Exibe uma mensagem personalizada no modal
    alertMessage.textContent = 'Usuário cadastrado com sucesso!';
    customAlert.style.display = 'flex';

    // Limpar o formulário
    registerForm.reset();

    // Fechar a tela de registro
    wrapper.classList.remove('active');

    // Abrir a tela de login
    loginLink.click();
});

// Fechar o alerta do modal
closeAlert.addEventListener('click', () => {
    customAlert.style.display = 'none'; // Esconde o modal
});

// Fechar o alerta com o botão 'Fechar'
closeModalBtn.addEventListener('click', () => {
    customAlert.style.display = 'none'; // Esconde o modal
});

// Envio do formulário de login
const loginForm = document.querySelector('.form-box.login form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Previne o envio padrão

    const email = loginForm.querySelector('input[placeholder="E-mail"]').value;
    const senha = loginForm.querySelector('input[type="password"]').value;

    // Verificar se o usuário existe
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.senha === senha);

    if (user) {
        // Exibe mensagem de login bem-sucedido
        alertMessage.textContent = 'Login bem-sucedido!';
        customAlert.style.display = 'flex';

        // Limpa o formulário de login
        loginForm.reset();

        // Aqui você pode adicionar um redirecionamento ou outra ação pós-login
        // Exemplo: redireciona para a página principal
        // window.location.href = 'pagina-principal.html';
    } else {
        // Exibe mensagem de erro de login
        alertMessage.textContent = 'E-mail ou senha incorretos!';
        customAlert.style.display = 'flex';
    }
});
