export const modal = document.querySelector('.custom-modal-alert');
export const modalMessage = modal.querySelector('#custom-modal-alert-message');
export const modalCloseButton = modal.querySelector('#close-custom-modal-alert-btn');

// Abre o modal
export const abrirModal = (message, closeBtnText = 'Fechar') => {
    modalMessage.textContent = message;
    modalCloseButton.textContent = closeBtnText;
    modalCloseButton.focus();
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
}

// Fecha o modal
export const fecharModal = () => {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    modalMessage.textContent = '';
    modalCloseButton.textContent = 'Fechar';
    modalCloseButton.blur();
}

// Fechar o modal ao clicar no botão
modalCloseButton.addEventListener('click', (e) => {
    fecharModal();
    e.stopPropagation();
});

// Evita que o modal seja fechado ao clicar fora dele
modal.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Fecha o modal ao pressionar a tecla ESC
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        fecharModal();
    }
});

// Exporta as funções
export const customModalAlert = {
    abrirModal,
    fecharModal
};

// Fechar o modal mas evita o fechamento do login
modalCloseButton.addEventListener('click', (e) => {
    e.stopPropagation();
    fecharModal();
});