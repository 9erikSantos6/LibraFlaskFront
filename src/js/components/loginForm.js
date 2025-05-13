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
            .then(data => {
                // Verificar se a resposta contém um token de autenticação
                if (data && data.auth_token) {
                    salvarAuthToken(data); // Salvar o token
                    // updateMenuState(); // Atualiza o estado do menu
                    customModalAlert.abrirModal('Usuário logado com sucesso!', 'Fechar');
                    loginForm.reset();
                    console.log(data);
                    wrapperAuth.classList.remove('active-popup'); // Fechar a tela de login

                    customNavTopBtn.textContent = 'Logado'; // Atualizar o texto do botão
                    customNavTopBtn.disabled = true; // Desabilitar o botão
                } else {
                    // Se não houver token, significa que houve um erro
                    customModalAlert.abrirModal('Erro ao realizar login: ' + (data.message || 'Credenciais inválidas'), 'Fechar');
                }
            })

        .catch(error => {
            console.error(error);
            customModalAlert.abrirModal('Erro ao realizar login', 'Fechar');
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
