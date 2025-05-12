import { API_ENDPOINTS } from '../utils/api.js';
import { requestAPI } from '../utils/api.js';
import * as validador from '../utils/validadores.js';

import * as userAlertHandler from './userAlertHandler.js';

const wrapperAuth = document.querySelector('.wrapper-auth');
const registerForm = document.querySelector('.register-form'); // Corrigido para usar a classe


registerForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Previne o envio padrão

    // Obter os valores dos campos do formulário
    const nome = document.getElementById('registration-name').value;
    let username = document.getElementById('registration-username').value;
    const email = document.getElementById('registration-email').value;
    const senha = document.getElementById('registration-password').value;
    // const confirmacaoSenha = document.getElementById('registration-password-confirm').value;
    const confirmacaoSenha = senha; // Ainda não corretamente implementado
    const termos = document.getElementById('accept-terms');

    if (!termos.checked) {
        userAlertHandler.exibirMensagemErroComum('Você deve aceitar os termos de uso!');
        return;
    }

    if (!validador.isValidUsername(username)) {
        userAlertHandler.exibirMensagemErroComum('Nome de usuário inválido! \nO nome de usuário deve conter entre 4 e 20 caracteres, podendo conter letras, números, "_" e "-".');
        return;
    }

    if (!validador.isValidEmail(email)) {
        userAlertHandler.exibirMensagemErroComum('Por favor, insira um e-mail válido!');
        return;
    }

    if (!validador.isValidPassword(senha) || !validador.isValidPassword(confirmacaoSenha)) {
        userAlertHandler.exibirMensagemErroComum('As senhas devem conter pelo menos 8 a 100 caracteres, incluindo letras maiúsculas, minúsculas e números.');
        return;
    }

    if (!validador.passwordsMatch(senha, confirmacaoSenha)) {
        userAlertHandler.exibirMensagemErroComum('As senhas não coincidem!');
        return;
    }


    // Criar um objeto usuário
    const newUser = {
        email: email.toLowerCase(),
        password: senha,
        password_confirmation: senha,
        nome: nome,
        username: username.toLowerCase()
    };

    requestAPI('POST', API_ENDPOINTS.REGISTER, newUser)
        .then(resposta => {
            if (!resposta.ok) {
                console.error('Erro ao registrar usuário:\n', resposta.status, resposta.data);
                userAlertHandler.exibirMensagemErroAPI(resposta.data, resposta.status);
                return;
            }
            console.log(resposta.data);
            userAlertHandler.exibirMensagemSucesso('Usuário cadastrado com sucesso!');
            registerForm.reset();
            wrapperAuth.classList.remove('active');
        })
        .catch(error => {
            console.error(error);
            userAlertHandler.exibirMensagemErroComum(error.message);
        });
});