const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
const registerOverlay = document.querySelector('.overlay');
const wrap = document.querySelector('.wrap');

// Modal de sucesso
const customAlert = document.getElementById('customAlert');
const closeAlert = document.getElementById('closeAlert');
const closeModalBtn = document.getElementById('closeModalBtn');
const alertMessage = document.getElementById('alertMessage');

// Abrir a tela de registro
registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});
// Voltar para a tela de login
loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});
// Mostrar o popup
btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
    wrap.style.display = 'none';
});
// Fechar o popup
iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
    wrap.style.display = 'block';
});
// Fecha popup ao clicar na overlay
registerOverlay.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
    wrap.style.display = 'block';
});
// Fecha popup se clicar fora dele
document.addEventListener('click', (e) => {
    // Fecha popup se clicar fora dele
    const isClickInsidePopup = wrapper.contains(e.target) || btnPopup.contains(e.target);
    const isClickInsideAlert = customAlert.contains(e.target);
    if (!isClickInsidePopup && !btnPopup.contains(e.target) && !isClickInsideAlert) {
        wrapper.classList.remove('active-popup');
        wrap.style.display = 'block';
    }
});

// Envio do formulário de registro
const registerForm = document.querySelector('registerForm');
const usuarioInput = document.getElementById('usuarioInput');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Previne o envio padrão

    // Obter os valores dos campos do formulário
    const nome = document.getElementById('registerName').value; // Obter o valor do campo de nome
    const email = document.getElementById('registerEmail').value; // Obter o valor do campo de e-mail
    const senha = document.getElementById('registerPassword').value; // Obter o valor do campo de senha
    const termos = registerForm.querySelector('input[type="checkbox"]'); // Acessando o campo de termos de serviço

    // Verificar se aceitou os termos
    if (!termos.checked) {
        alertMessage.textContent = 'Você deve aceitar os termos e condições!';
        customAlert.style.display = 'flex';
        return;
    }


    // Gera um nome de usuário automaticamente com base no nome
    const username = nome.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 1000);
    usuarioInput.value = username; 


    // Criar um objeto usuário
    const newUser = {
        username: username,
        nome: nome,
        email: email,
        senha: senha,
        confirmaSenha: senha
    };
    // console.log(newUser);

    realizarRequisicaoAPI('POST', `${APIUR}/registrar`, newUser)
        .then(data => {
            console.log(data); 
            /*
             A API responde com status 200:

                {
                    "message": "Usuário registrado com sucesso",
                    "user": {
                        "email": "<e-mail do user>",
                        "nome": "<nome do user>",
                        "username": "<username do user"
                    }
                }

             */

             // Exibe uma mensagem personalizada no modal
            alertMessage.textContent = 'Usuário cadastrado com sucesso!';
            customAlert.style.display = 'flex';

            // Limpar o formulário
            registerForm.reset();

            // Fechar a tela de registro
            wrapper.classList.remove('active');
        })
        .catch(error => {
            console.error('Erro ao registrar usuário:', error);
            alertMessage.textContent = 'Ocorreu um erro ao registrar o usuário.';
            customAlert.style.display = 'flex';
        });   
});

// Fechar o alerta do modal
closeAlert.addEventListener('click', () => {
    customAlert.style.display = 'none'; // Esconde o modal
});

// Fechar o alerta com o botão 'Fechar'
closeModalBtn.addEventListener('click', () => {
    customAlert.style.display = 'none'; // Esconde o modal
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


    