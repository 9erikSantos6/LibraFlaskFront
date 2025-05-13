import { API_ENDPOINTS, requestAPI } from '../utils/api.js';
import { isValidEmail, isValidPassword } from '../utils/validadores.js';
import { salvarAuthToken } from '../utils/auth.js';

import * as userAlertHandler from './userAlertHandler.js';

const wrapperAuth = document.querySelector('.wrapper-auth');
const loginForm = document.querySelector('.login-form');


loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userEmailInput = document.getElementById('login-email');
    const userPasswordInput = document.getElementById('login-password');

    const userCredentials = {
        email: userEmailInput.value,
        password: userPasswordInput.value
    }

    requestAPI('POST', API_ENDPOINTS.LOGIN, userCredentials)
        .then(resposta => {
            if (!resposta.ok) {
                console.error('Erro ao realizar login:\n', resposta.status, resposta.data);
                userAlertHandler.exibirMensagemErroAPI(resposta.data, resposta.status);
                loginForm.reset();
                return;
            }
            salvarAuthToken(resposta.data)
            userAlertHandler.exibirMensagemSucesso('Usuário logado com sucesso!');
            loginForm.reset();
            wrapperAuth.classList.remove('active-popup'); // Fechar a tela de login
            customNavTopBtn.textContent = 'Logado'; // Atualizar o texto do botão
            customNavTopBtn.disabled = true; // Desabilitar o botão
        })
        // Tratamento de erro
        .catch(error => {
            console.error(error);
            userAlertHandler.exibirMensagemErroComum(error.message);
        });
});

// Verificar se o usuário está logado
const authToken = localStorage.getItem('auth_token');
const customNavTopBtn = document.querySelector('.custom-nav-top-btn');
if (authToken) {
    // O usuário está logado
    customNavTopBtn.textContent = 'Logado'; // Muda o texto do botão
    customNavTopBtn.disabled = true; // Desabilita o botão
} else {
    // O usuário não está logado
    customNavTopBtn.textContent = 'Login / Sing-up'; // Muda o texto do botão de volta
    customNavTopBtn.disabled = false; // Habilita o botão
}
