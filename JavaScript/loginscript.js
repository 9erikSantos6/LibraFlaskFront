// Selecionando os elementos
const loginBtn = document.querySelector('.btn');
const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');
const wrapper = document.querySelector('.wrapper');

const alertMessage = document.querySelector('#alertMessage');
const closeModalBtn = document.querySelector('#closeModalBtn');

// Dados de login 
const validEmail = 'root@gmail.com';
const validPassword = '123';

// Função que lida com o login
function handleLogin(e) {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    // Verificar se o email e senha estão corretos
    if (email === validEmail && password === validPassword) {
        // Exibe mensagem de sucesso
        alertMessage.textContent = 'Login realizado com sucesso!';
        document.getElementById('customAlert').classList.add('active'); // Exibe o alerta

        // Fecha o modal de login
        wrapper.style.display = 'none';

        // Muda o texto do botão para "Logado"
        loginBtn.textContent = 'Logado';
    } else {
        // Caso as credenciais estejam erradas
        alertMessage.textContent = 'Credenciais inválidas. Tente novamente.';
        document.getElementById('customAlert').classList.add('active'); // Exibe o alerta
    }
}

// Evento para fechar o alerta
closeModalBtn.addEventListener('click', () => {
    document.getElementById('customAlert').classList.remove('active'); // Fecha o alerta
});

// Evento de envio do formulário de login
loginBtn.addEventListener('click', handleLogin);
