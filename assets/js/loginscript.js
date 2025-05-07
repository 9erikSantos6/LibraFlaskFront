const loginForm = document.querySelector('.login-form'); // Certifique-se de que a classe está correta
const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');
const loginBtn = document.querySelector('.btn');
const wrapper = document.querySelector('.wrapper');

// Modal de sucesso
const customAlert = document.getElementById('customAlert');
const closeAlert = document.getElementById('closeAlert');
const closeModalBtn = document.getElementById('closeModalBtn');
const alertMessage = document.getElementById('alertMessage');

// Adicionando o evento submit ao formulário de login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log('botao de login clicado');

    const userCredentials = {
        email: emailInput.value,
        password: passwordInput.value
    }

    // Verificar se o e-mail é válido
    if (!isValidEmail(userCredentials.email)) {
        alertMessage.textContent = 'Por favor, insira um e-mail válido!';
        customAlert.style.display = 'flex'; // Exibe o alerta
        loginForm.reset();
        return;
    }

    realizarRequisicaoAPI('POST', 'http://localhost:15000/auth/login', userCredentials)
        .then(data => {
            if (data.status === 'error') {
                // LOGICA PARA AVISAR QUE DEU ERRO...
                console.log("Deu merda no login");
                alertMessage.textContent = 'Erro ao realizar login!';
                customAlert.style.display = 'flex';
            }
            /*
                A API responde com 200 e token de atutenticação:
                {
                    "auth_token": "<user_thoken>"
                }
            */
            console.log(data);
            alertMessage.textContent = 'Usuário logado com sucesso!';
            customAlert.style.display = 'flex';
            loginForm.reset();
            wrapper.classList.remove('active');
            salvarAuthToken(data);
        })
        // .then(error =>
        .catch(error => {
            console.error('Erro ao logar usuário: ', error);
            // OUTRAS LOGICAS...
            alertMessage.textContent = 'Erro ao realizar login!';
            customAlert.style.display = 'flex';
        });
})

// Fechar o alerta do modal
closeAlert.addEventListener('click', () => {
    customAlert.style.display = 'none'; // Esconde o modal
});

// Fechar o alerta com o botão 'Fechar'
closeModalBtn.addEventListener('click', () => {
    customAlert.style.display = 'none'; // Esconde o modal
});
