const userInfo = document.getElementById('userInfo');
const deleteProfileBtn = document.getElementById('deleteProfileBtn');

const editProfileBtn = document.querySelector('.custom-nav-top-btn');
const closeBtn = document.querySelector('.icon-close-add');
const wrapperAdd = document.querySelector('.wrapper-add');
const form = document.querySelector('form');
const cancelBtn = document.querySelector('.btn-cancel');
const confirmBtn = document.querySelector('.btn-confirm');




// // Função para carregar as informações do usuário
// const loadUser Info = async () => {
//     try {
//         const response = await fetch('http://localhost:15000/usuario'); // Endpoint para obter o usuário
//         const user = await response.json();
//         displayUser Info(user);
//     } catch (error) {
//         console.error('Erro ao carregar informações do usuário:', error);
//     }
// };


// // Função para exibir as informações do usuário
// const displayUser Info = (user) => {
//     userInfo.innerHTML = `
//         <h2>Nome de Usuário: ${user.username}</h2>
//         <p><strong>Nome:</strong> ${user.nome}</p>
//         <p><strong>Email:</strong> ${user.email}</p>
//     `;
// };

// // Função para deletar o perfil
// const deleteProfile = async () => {
//     const response = await fetch('http://localhost:15000/usuario', {
//         method: 'DELETE',
//         headers: {
//             'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
//         }
//     });
//     if (response.ok) {
//         customModalAlert.abrirModal('Perfil deletado com sucesso!', 'Fechar');
//         localStorage.removeItem('auth_token'); // Remove o token
//         window.location.href = './index.html'; // Redireciona para a página inicial
//     } else {
//         customModalAlert.abrirModal('Erro ao deletar o perfil.', 'Fechar');
//     }
// };

// // Evento para o botão de deletar perfil
// deleteProfileBtn.addEventListener('click', deleteProfile);



// Abrir a janela
editProfileBtn.addEventListener('click', () => {
    wrapperAdd.classList.add('active-popup'); // Adiciona a classe para abrir a janela
    wrapperAdd.classList.add('active'); // Adiciona a classe para expandir a altura
    confirmBtn.disabled = false; // Habilitar o botão de enviar
});

// Fechar a janela
closeBtn.addEventListener('click', () => {
    wrapperAdd.classList.remove('active-popup'); // Remove a classe para fechar a janela
    wrapperAdd.classList.remove('active'); // Remove a classe para voltar à altura inicial
    form.reset(); // Limpa os campos do formulário
    confirmBtn.disabled = false; // Habilita o botão de enviar novamente
});

// Fecha a janela se clicar fora
document.addEventListener('click', (e) => {
    if (!wrapperAdd.contains(e.target) && !editProfileBtn.contains(e.target)) {
        wrapperAdd.classList.remove('active-popup');
        wrapperAdd.classList.remove('active');
        form.reset(); // Limpa o formulário
        confirmBtn.disabled = false; // Habilita o botão de enviar novamente
    }
});

// Cancelar edição
document.querySelector('.btn-cancel').addEventListener('click', () => {
    document.querySelector('.wrapper-add').style.display = 'none'; // Esconder o formulário de edição
});

// Carregar as informações do usuário ao iniciar a página
// loadUser Info();