// const wrap = document.querySelector('.wrap');
// const bookContainer = document.getElementById('bookContainer');
// const prevBtn = document.getElementById('prevBtn');
// const nextBtn = document.getElementById('nextBtn');

// // Rolagem com o mouse
// let isDown = false;
// let startX;
// let scrollLeft;

// // Detecta quando o mouse estiver pressionado
// bookContainer.addEventListener('mousedown', (e) => {
//     isDown = true;
//     startX = e.pageX - bookContainer.offsetLeft;
//     scrollLeft = bookContainer.scrollLeft;
// });

// // Detecta quando o mouse deixar de ser pressionado
// bookContainer.addEventListener('mouseleave', () => {
//     isDown = false;
// });

// // Detecta quando o mouse deixar de ser pressionado
// bookContainer.addEventListener('mouseup', () => {
//     isDown = false;
// });

// // Rolagem com o mouse
// bookContainer.addEventListener('mousemove', (e) => {
//     if (!isDown) return; // Se não estiver pressionado, não faz nada
//     e.preventDefault();
//     const x = e.pageX - bookContainer.offsetLeft;
//     const walk = (x - startX) * 2; // Aumenta a velocidade de rolagem
//     bookContainer.scrollLeft = scrollLeft - walk;
// });

// // Navegação com os botões
// prevBtn.addEventListener('click', () => {
//     bookContainer.scrollLeft -= 200; // Ajuste a quantidade de rolagem
//     checkLoop();
// });

// // Navegação com os botões
// nextBtn.addEventListener('click', () => {
//     bookContainer.scrollLeft += 200; // Ajuste a quantidade de rolagem
//     checkLoop();
// });