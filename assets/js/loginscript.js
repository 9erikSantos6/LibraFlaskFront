// Selecionando os elementos
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

// Função que lida com o login
function handleLogin(e) {
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
        return;
    } else {
        realizarRequisicaoAPI('POST', APIURL, userCredentials)
            .then(data => {
                console.log(data);
                /*
                    A API responde com 200 e token de atutenticação:
                    {
                        "auth_token": "<user_thoken>"
                    }
                */
            })
            // .then(error =>
            .catch(error => {
                console.error(error);
                // OUTRAS LOGICAS...
            });
        return;
    }
}

// Adicionando o evento submit ao formulário de login
loginForm.addEventListener('submit', handleLogin); // Descomentada

// Fechar o alerta do modal
closeAlert.addEventListener('click', () => {
    customAlert.style.display = 'none'; // Esconde o modal
});

// Fechar o alerta com o botão 'Fechar'
closeModalBtn.addEventListener('click', () => {
    customAlert.style.display = 'none'; // Esconde o modal
});
