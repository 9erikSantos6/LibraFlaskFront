const modal = document.querySelector('.custom-modal-alert');
const modalMessage = modal.querySelector('#custom-modal-alert-message');
const modalCloseButton = modal.querySelector('#close-custom-modal-alert-btn');

const abrirModal = (message, closeBtnText = 'Fechar') => {
    modalMessage.textContent = message;
    modalCloseButton.textContent = closeBtnText;
    modalCloseButton.focus();
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
}

const fecharModal = () => {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    modalMessage.textContent = '';
    modalCloseButton.textContent = 'Fechar';
    modalCloseButton.blur();
}

modalCloseButton.addEventListener('click', fecharModal);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        fecharModal();
    }
});

export const customModalAlert = {
    abrirModal,
    fecharModal
};
