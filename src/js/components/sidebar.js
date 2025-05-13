import { customModalAlert } from './customModal.js';

const openBtn = document.getElementById('openSidebarBtn');
const closeBtn = document.getElementById('closeSidebarBtn');
const sidebar = document.getElementById('sidebar');
const menuItems = document.querySelectorAll('.menu-item');

// Função para atualizar o estado do menu
const updateMenuState = () => {
    const authToken = localStorage.getItem('auth_token'); // Recupera o token de autenticação
    console.log('Token de autenticação:', authToken); // Imprime o token no console
    menuItems.forEach(item => {
        if (authToken) {
            item.classList.remove('disabled'); // Remove a classe que desabilita o item
        } else {
            item.classList.add('disabled'); // Adiciona uma classe que desabilita o item
        }
    });
};

// Verificar se o usuário está logado inicialmente
updateMenuState();

// Função para abrir ou fechar a sidebar
const toggleSidebar = (open) => {
    if (open) {
        sidebar.classList.add('active');
        openBtn.style.display = 'none';
        closeBtn.style.display = 'block';
    } else {
        sidebar.classList.remove('active');
        openBtn.style.display = 'block';
        closeBtn.style.display = 'none';
    }
}

// Adicionar evento de clique para cada item do menu
menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
        console.log('Item do menu clicado:', item.textContent);
        const authToken = localStorage.getItem('auth_token'); // Verifica o token novamente ao clicar
        if (!authToken) {
            e.preventDefault(); // Impede a navegação
            customModalAlert.abrirModal('Você deve fazer login primeiro!', 'Fechar');
        } else {
            console.log('Usuário logado, permitindo acesso ao item:', item.textContent);
        }
    });
});

// Abre a sidebar
openBtn.addEventListener('click', () => toggleSidebar(true));

// Fecha a sidebar
closeBtn.addEventListener('click', () => toggleSidebar(false));

// Fecha se clicar fora da sidebar
document.addEventListener('click', (e) => {
    const clickedInsideSidebar =
        sidebar.contains(e.target) ||
        openBtn.contains(e.target) ||
        closeBtn.contains(e.target);

    if (!clickedInsideSidebar && sidebar.classList.contains('active')) {
        toggleSidebar(false);
    }
});

// Botão de logout
const logoutBtn = document.getElementById('logoutBtn'); // Certifique-se de que o botão de logout existe
logoutBtn.addEventListener('click', () => {
    // Remover o token de autenticação
    localStorage.removeItem('auth_token');
    // Alterar o texto do botão de login de volta para "Login"
    const customNavTopBtn = document.querySelector('.custom-nav-top-btn');
    customNavTopBtn.textContent = 'Login / Sing-up'; // Muda o texto do botão
    customNavTopBtn.disabled = false; // Habilita o botão novamente
    // Atualiza o estado do menu após logout
    updateMenuState();
    // Exibir uma mensagem de sucesso
    customModalAlert.abrirModal('Você saiu com sucesso!', 'Fechar');

});