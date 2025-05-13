const customNavTopBtn = document.querySelector('.custom-nav-top-btn');
const customModal = document.querySelector('.custom-modal-alert');


const wrapperAuth = document.querySelector('.wrapper-auth');
const closeWrapperAuthIcon = document.querySelector('#close-wrapper-auth-icon');
const loginPainelLink = document.querySelector('.login-link')
const registerPainelLink = document.querySelector('.register-link');
const registerOverlay = document.querySelector('.overlay');



// Abrir a tela de registro
registerPainelLink.addEventListener('click', () => {
    wrapperAuth.classList.add('active');
});

// Alterna entre os painéis de autenticação
loginPainelLink.addEventListener('click', () => {
    wrapperAuth.classList.remove('active');
});


// Mostra o wrapper de autenticação
customNavTopBtn.addEventListener('click', () => {
    wrapperAuth.classList.add('active-popup');
});


// Fecha o wrapper de autenticação
closeWrapperAuthIcon.addEventListener('click', () => {
    wrapperAuth.classList.remove('active-popup');

});


// Fecha o wrapper de autenticação ao clicar na overlay
registerOverlay.addEventListener('click', () => {
    wrapperAuth.classList.remove('active-popup');

});

// Fecha o wrapper de autenticação se clicar fora dele
document.addEventListener('click', (e) => {
    const isClickInsidePopup = wrapperAuth.contains(e.target) || customNavTopBtn.contains(e.target);
    const customModalIsOpen = !customModal.classList.contains('hidden');
    if (!isClickInsidePopup && !customNavTopBtn.contains(e.target) && !customModalIsOpen) {
        wrapperAuth.classList.remove('active-popup');
    }
});