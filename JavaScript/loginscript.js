// Selecionando os elementos
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');
const loginBtn = document.querySelector('.btn');
const wrapper = document.querySelector('.wrapper');

// Modal de sucesso
const customAlert = document.getElementById('customAlert');
const closeAlert = document.getElementById('closeAlert');
const closeModalBtn = document.getElementById('closeModalBtn');
const alertMessage = document.getElementById('alertMessage');



// Função que lida com o login
function handleLogin(e) {
    e.preventDefault();

    console.log('botao de login clicado');

    const email = emailInput.value;
    const password = passwordInput.value;

    // Verificar se o e-mail é válido
    if (!isValidEmail(email)) {
        alertMessage.textContent = 'Por favor, insira um e-mail válido!';
        customAlert.style.display = 'flex'; // Exibe o alerta
        return;
    }

    // Verificar se o usuário existe
    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
        alertMessage.textContent = 'Este e-mail não está cadastrado!';
        customAlert.style.display = 'flex'; // Exibe o alerta
        return;
    }

    // Verificar se a senha está correta
    if (user.senha !== password) {
        alertMessage.textContent = 'Senha incorreta. Tente novamente.';
        customAlert.style.display = 'flex'; // Exibe o alerta
        return;
    }

    // Se tudo estiver correto
    alertMessage.textContent = 'Login realizado com sucesso!';
    customAlert.style.display = 'flex'; // Exibe o alerta

    // Fechar a tela de login
    wrapper.style.display = 'none';

    // Mudar o texto do botão para "Logado"
    loginBtn.textContent = 'Logado';
}

// Adicionando o evento submit ao formulário de login
loginForm.addEventListener('submit', handleLogin);



// Fechar o alerta do modal
closeAlert.addEventListener('click', () => {
    customAlert.style.display = 'none'; // Esconde o modal
});

// Fechar o alerta com o botão 'Fechar'
closeModalBtn.addEventListener('click', () => {
    customAlert.style.display = 'none'; // Esconde o modal
});
