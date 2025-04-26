const menuToggle = document.querySelector('.menu-toggle');
const closeToggle = document.querySelector('.close-toggle');
const sidebar = document.querySelector('.sidebar');
const sidebaroverlay = document.querySelector('.overlay');

// Toggle da sidebar
const toggleMenu = () => {
    sidebar.classList.toggle('active'); // Adiciona ou remove a classe 'active'
    sidebaroverlay.classList.toggle('active'); // Adiciona ou remove a classe 'active'

    // Alterna a visibilidade do menu e do X
    if (sidebar.classList.contains('active')) {
        menuToggle.style.display = 'none'; // Oculta o menu
        closeToggle.style.display = 'block'; // Mostra o X
    } else {
        menuToggle.style.display = 'block'; // Mostra o menu
        closeToggle.style.display = 'none'; // Oculta o X
    }
};

menuToggle.addEventListener('click', toggleMenu); // Chama a função ao clicar no menu
closeToggle.addEventListener('click', toggleMenu); // Chama a função ao clicar no X

// Fecha sidebar ou popup se clicar fora
document.addEventListener('click', (e) => {
    const isClickInsideSidebar = sidebar.contains(e.target) || menuToggle.contains(e.target) || closeToggle.contains(e.target);

    // Se o clique estiver fora da sidebar e ela estiver aberta
    if (!isClickInsideSidebar && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active'); // Fecha a sidebar
        sidebaroverlay.classList.remove('active');  // Volta o menu para os 3 traços
        menuToggle.style.display = 'block'; // Mostra o menu
        closeToggle.style.display = 'none'; // Oculta o X
    }
});