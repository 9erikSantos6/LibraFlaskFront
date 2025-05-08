import { customModalAlert } from './dom.js';


const loginForm = document.querySelector('.login-form'); // Certifique-se de que a classe está correta
const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');
const loginBtn = document.querySelector('.btn');
const wrapper = document.querySelector('.wrapper');


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
        customModalAlert.abrirModal('Por favor, insira um e-mail válido!', 'Fechar');
        loginForm.reset();
        return;
    }

    realizarRequisicaoAPI('POST', 'http://localhost:15000/auth/login', userCredentials)
        .then(data => {
            if (data.status === 'error') {
                // LOGICA PARA AVISAR QUE DEU ERRO...
                console.log("Deu merda no login");
                customModalAlert.abrirModal('Erro ao realizar login', 'Fechar');
            }
            /*
                A API responde com 200 e token de atutenticação:
                {
                    "auth_token": "<user_thoken>"
                }
            */
            console.log(data);
            customModalAlert.abrirModal('Usuário logado com sucesso!', 'Fechar');
            loginForm.reset();
            wrapper.classList.remove('active');
            salvarAuthToken(data);
        })
        // .then(error =>
        .catch(error => {
            console.error('Erro ao logar usuário: ', error);
            customModalAlert.abrirModal('Erro ao realizar login', 'Fechar');
        });
});
