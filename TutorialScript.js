const images = document.querySelectorAll('.carousel-images img');
const imageContainer = document.querySelector('.carousel-images');
const counter = document.querySelector('.carousel-counter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
const totalImages = images.length;

function updateCarousel() {
    const imageWidth = images[0].clientWidth;
    imageContainer.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
    counter.textContent = `${currentIndex + 1}/${totalImages}`;
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalImages;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateCarousel();
});

window.addEventListener('resize', updateCarousel);
