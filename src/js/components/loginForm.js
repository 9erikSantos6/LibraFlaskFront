import { customModalAlert } from './customModal.js';
import { API_ENDPOINTS, requestAPI } from '../utils/api.js';
import { isValidEmail } from '../utils/validadores.js';
import { salvarAuthToken } from '../utils/auth.js';


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

    // Verificar se o e-mail é válido
    if (!isValidEmail(userCredentials.email)) {
        customModalAlert.abrirModal('Por favor, insira um e-mail válido!', 'Fechar');
        loginForm.reset();
        return;
    }

    requestAPI('POST', API_ENDPOINTS.LOGIN, userCredentials)
        // .then(res => res.json())
        .then(data => {
            if (data.error) {
                console.error('Erro ao realizar login:\n', data.error);
                customModalAlert.abrirModal('Erro ao realizar login', 'Fechar');
                return;
            }
            salvarAuthToken(data)
            customModalAlert.abrirModal('Usuário logado com sucesso!', 'Fechar');
            loginForm.reset();
            wrapperAuth.classList.remove('active');
        })
        .catch(error => {
            console.error(error);
            customModalAlert.abrirModal(error.message, 'Fechar');
        });
});
