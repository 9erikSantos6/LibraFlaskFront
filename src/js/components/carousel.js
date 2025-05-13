const carouselItems = document.getElementById('carouselItems');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
const itemWidth = 170; // Largura do item + margem

// Função para carregar os livros da API
const loadBooks = async () => {
    try {
        const response = await fetch('http://localhost:15000/livros'); // URL da API
        const books = await response.json();
        displayBooks(books);
    } catch (error) {
        console.error('Erro ao carregar livros:', error);
    }
};

// Função para exibir os livros no carrossel
const displayBooks = (books) => {
    carouselItems.innerHTML = ''; // Limpa o container antes de adicionar novos livros
    books.forEach(book => {
        const item = document.createElement('div');
        item.classList.add('carousel-item');
        item.innerHTML = `
            <h3>${book.titulo}</h3>
            <p>Ano: ${book.ano}</p>
        `;
        carouselItems.appendChild(item);
    });
};

// Função para mover o carrossel
const moveCarousel = (direction) => {
    const totalItems = carouselItems.children.length;
    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % totalItems;
    } else {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    }
    carouselItems.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
};

// Eventos dos botões
prevBtn.addEventListener('click', () => moveCarousel('prev'));
nextBtn.addEventListener('click', () => moveCarousel('next'));

// Rolagem com o mouse
let isDown = false;
let startX;
let scrollLeft;

carouselItems.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - carouselItems.offsetLeft;
    scrollLeft = carouselItems.scrollLeft;
});

carouselItems.addEventListener('mouseleave', () => {
    isDown = false;
});

carouselItems.addEventListener('mouseup', () => {
    isDown = false;
});

carouselItems.addEventListener('mousemove', (e) => {
    if (!isDown) return; // Se não estiver pressionado, não faz nada
    e.preventDefault();
    const x = e.pageX - carouselItems.offsetLeft;
    const walk = (x - startX) * 2; // Aumenta a velocidade de rolagem
    carouselItems.scrollLeft = scrollLeft - walk;
});

// Carregar os livros ao iniciar a página
loadBooks();
