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
            if (data.error) {
                console.error('Erro ao registrar usuário:\n', error);
                abrirModal('Erro ao registrar usuário', 'Fechar');
            }
            console.log(data); 
            customModalAlert.abrirModal('Usuário cadastrado com sucesso!', 'Fechar');
            registerForm.reset();
            wrapperAuth.classList.remove('active');
        })
        .catch(error => {
            console.error(error);
            customModalAlert.abrirModal(error.message, 'Fechar');
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


    