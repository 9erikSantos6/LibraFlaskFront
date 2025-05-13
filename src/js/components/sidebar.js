const openBtn = document.getElementById('openSidebarBtn');
const closeBtn = document.getElementById('closeSidebarBtn');
const sidebar = document.getElementById('sidebar');

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