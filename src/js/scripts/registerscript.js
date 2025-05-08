// import { APIURL } from "./global";
import { customModalAlert } from '../modules/dom.js';
import { API_ENDPOINTS } from '../constants.js';

import * as utils from '../modules/utils.js';

const wrapperAuth = document.querySelector('.wrapper-auth');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnLogin = document.querySelector('.custom-nav-top-btn');
const iconClose = document.querySelector('.icon-close');
const registerOverlay = document.querySelector('.overlay');


// Abrir a tela de registro
registerLink.addEventListener('click', () => {
    wrapperAuth.classList.add('active');
});

// Voltar para a tela de login
loginLink.addEventListener('click', () => {
    wrapperAuth.classList.remove('active');
});

// Mostrar o popup
btnLogin.addEventListener('click', () => {
    wrapperAuth.classList.add('active-popup');
});

// Fechar o popup
iconClose.addEventListener('click', () => {
    wrapperAuth.classList.remove('active-popup');

});

// Fecha popup ao clicar na overlay
registerOverlay.addEventListener('click', () => {
    wrapperAuth.classList.remove('active-popup');

});

// Fecha popup se clicar fora dele
document.addEventListener('click', (e) => {
    const isClickInsidePopup = wrapperAuth.contains(e.target) || btnLogin.contains(e.target);
    if (!isClickInsidePopup && !btnLogin.contains(e.target)) {
        wrapperAuth.classList.remove('active-popup');
    }
});

// Envio do formulário de registro
const registerForm = document.querySelector('.register-form'); // Corrigido para usar a classe
const usuarioInput = document.getElementById('usuarioInput');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Previne o envio padrão

    // Obter os valores dos campos do formulário
    const nome = document.getElementById('nameRegister').value;
    const email = document.getElementById('emailRegister').value;
    const senha = document.getElementById('passwordRegister').value;
    const termos = registerForm.querySelector('input[type="checkbox"]');

    // Verificar se aceitou os termos
    if (!termos.checked) {
        customModalAlert.abrirModal('Você deve aceitar os termos de uso!', 'Fechar');
        return;
    }

    // Gera um nome de usuário automaticamente com base no nome
    const username = nome.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 1000);
    usuarioInput.value = username; 

    // Criar um objeto usuário
    const newUser  = {
        email:email,
        password:senha,
        password_confirmation:senha,
        nome:nome,
        username:username
    };

    utils.realizarRequisicaoAPI('POST', API_ENDPOINTS.REGISTER, newUser)
        .then(data => {
            if (data.status === 'error') {
                // console.error('Erro ao registrar usuário:', error);
                abrirModal('Erro ao registrar usuário', 'Fechar');
            }
            console.log(data); 
            customModalAlert.abrirModal('Usuário cadastrado com sucesso!', 'Fechar');
            registerForm.reset();
            wrapperAuth.classList.remove('active');
        })
        .catch(error => {
            console.error(error);
            customModalAlert.abrirModal('Erro ao registrar usuário', 'Fechar');
        });   
});




// registerForm.addEventListener('submit', (e) => {
    
//     Verificar se o e-mail é válido
//     if (!isValidEmail(email)) {
//         alertMessage.textContent = 'Por favor, insira um e-mail válido!';
//         customAlert.style.display = 'flex';
//         registerForm.querySelectorAll('input[placeholder=""]')[1].value = '';
//         return;
//     }

//     Verificar se o e-mail já está cadastrado
//     if (checkEmailExists(email)) {
//         alertMessage.textContent = 'Este e-mail já está registrado!';
//         customAlert.style.display = 'flex';
//         registerForm.querySelectorAll('input[placeholder=""]')[1].value = '';
//         return;
//     }
      
//     let baseUsername = nome.toLowerCase().replace(/\s+/g, '');
//     const randomNum = Math.floor(Math.random() * 1000);
//     let username = (baseUsername + randomNum).substring(0, 20);

//     Verificar se o e-mail é válido
//     if (!isValidEmail(email)) {
//         alertMessage.textContent = 'Por favor, insira um e-mail válido!';
//         customAlert.style.display = 'flex';
//         registerForm.querySelectorAll('input[placeholder=""]')[1].value = '';
//         return;
//     }

//     Verificar se o e-mail já está cadastrado
//     if (checkEmailExists(email)) {
//         alertMessage.textContent = 'Este e-mail já está registrado!';
//         customAlert.style.display = 'flex';
//         registerForm.querySelectorAll('input[placeholder=""]')[1].value = '';
//         return;
//     }
      
//     let baseUsername = nome.toLowerCase().replace(/\s+/g, '');
//     const randomNum = Math.floor(Math.random() * 1000);
//     let username = (baseUsername + randomNum).substring(0, 20);

    
// });


    