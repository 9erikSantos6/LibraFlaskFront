// import { APIURL } from "./global";
import { customModalAlert } from './customModal.js';
import { API_ENDPOINTS } from '../utils/api.js';
import { requestAPI } from '../utils/api.js';


const wrapperAuth = document.querySelector('.wrapper-auth');
const registerForm = document.querySelector('.register-form'); // Corrigido para usar a classe


registerForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Previne o envio padrão

    // Obter os valores dos campos do formulário
    const nome = document.getElementById('registration-name').value;
    const email = document.getElementById('registration-email').value;
    const senha = document.getElementById('registration-password').value;
    const termos = registerForm.querySelector('input[type="checkbox"]');

    // Verificar se aceitou os termos
    if (!termos.checked) {
        customModalAlert.abrirModal('Você deve aceitar os termos de uso!', 'Fechar');
        return;
    }

    // Gera um nome de usuário automaticamente com base no nome
    const username = nome.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 1000);

    // Criar um objeto usuário
    const newUser  = {
        email:email,
        password:senha,
        password_confirmation:senha,
        nome:nome,
        username:username
    };

    requestAPI('POST', API_ENDPOINTS.REGISTER, newUser)
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

    