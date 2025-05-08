import { customModalAlert } from '../modules/dom.js';
import { API_ENDPOINTS } from '../constants.js';

import * as utils from '../modules/utils.js';

const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');
const wrapperAuth = document.querySelector('.wrapper-auth');


// Adicionando o evento submit ao formulário de login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log('botao de login clicado');

    const userCredentials = {
        email: emailInput.value,
        password: passwordInput.value
    }

    // Verificar se o e-mail é válido
    if (!utils.isValidEmail(userCredentials.email)) {
        customModalAlert.abrirModal('Por favor, insira um e-mail válido!', 'Fechar');
        loginForm.reset();
        return;
    }

    utils.realizarRequisicaoAPI('POST', API_ENDPOINTS.LOGIN, userCredentials)
        .then(data => {
            if (data.status === 'error') {
                console.log("Deu merda no login");
                customModalAlert.abrirModal('Erro ao realizar login', 'Fechar');
                return;
            }
            if (utils.salvarAuthToken(data)) {
                customModalAlert.abrirModal('Usuário logado com sucesso!', 'Fechar');
            }
            loginForm.reset();
            wrapperAuth.classList.remove('active');
        })
        // .then(error =>
        .catch(error => {
            console.error(error);
            customModalAlert.abrirModal('Erro ao realizar login', 'Fechar');
        });
});
