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

    // Verificar se o e-mail é válido
    if (!isValidEmail(userEmailInput)) {
        userAlertHandler.exibirMensagemErroComum('Por favor, insira um e-mail válido!');
        loginForm.reset();
        return;
    }

    if (!isValidPassword(userPasswordInput)) {
        userAlertHandler.exibirMensagemErroComum('Isso não corresponde a um formato de senha válido!');
        loginForm.reset();
        return;
    }

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
            salvarAuthToken(data)
            userAlertHandler.exibirMensagemSucesso('Usuário logado com sucesso!');
            loginForm.reset();
            wrapperAuth.classList.remove('active');
        })
        .catch(error => {
            console.error(error);
            userAlertHandler.abrirModal(error.message, 'Fechar');
        });
});
