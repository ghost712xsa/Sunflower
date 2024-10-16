const leftImages = document.querySelectorAll('#leftImages .image');
const rightImages = document.querySelectorAll('#rightImages .image');
let selectedLeftImage = null;
let selectedRightImage = null;
const totalPairs = 3;
let correctPairs = 0;

const notificationSound = new Audio('Notification.mp3');

// Função para prevenir o comportamento duplo de touchstart + click
function addTouchEventSupport(element, handler) {
    let isTouching = false;

    element.addEventListener('touchstart', function (e) {
        isTouching = true; // Marcamos que estamos em um dispositivo com touch
        handler(e);
    });

    element.addEventListener('click', function (e) {
        if (!isTouching) {
            handler(e);
        }
        isTouching = false; // Resetamos após o click para evitar futuros problemas
    });
}

// Adicionando suporte a toque e click para as imagens da esquerda
leftImages.forEach(img => addTouchEventSupport(img, handleLeftClick));
// Adicionando suporte a toque e click para as imagens da direita
rightImages.forEach(img => addTouchEventSupport(img, handleRightClick));

function handleLeftClick(e) {
    if (!selectedLeftImage) {
        selectedLeftImage = e.target.closest('.image');
        selectedLeftImage.style.opacity = '0.5';
        checkMatch();
    }
}

function handleRightClick(e) {
    if (!selectedRightImage) {
        selectedRightImage = e.target.closest('.image');
        selectedRightImage.style.opacity = '0.5';
        checkMatch();
    }
}

function checkMatch() {
    if (selectedLeftImage && selectedRightImage) {
        if (selectedLeftImage.dataset.id === selectedRightImage.dataset.id) {
            selectedLeftImage.classList.add('success');
            selectedRightImage.classList.add('success');
            correctPairs++;
            const shapeName = getShapeName(selectedLeftImage.dataset.id);
            showDiscoveryPopup(`Parabéns! Você descobriu a forma: ${shapeName}`, () => {
                resetSelections();
                checkCompletion();
            });
        } else {
            selectedLeftImage.classList.add('error', 'tremble');
            selectedRightImage.classList.add('error', 'tremble');
            setTimeout(() => {
                selectedLeftImage.classList.remove('error', 'tremble');
                selectedRightImage.classList.remove('error', 'tremble');
                selectedLeftImage.style.opacity = '1';
                selectedRightImage.style.opacity = '1';
                resetSelections();
            }, 1000);
        }
    }
}

function resetSelections() {
    selectedLeftImage = null;
    selectedRightImage = null;
}

function checkCompletion() {
    if (correctPairs === totalPairs) {
        showFinalPopup('Parabéns! Você acertou todas as formas!');
    }
}

function showDiscoveryPopup(message, callback = null) {
    const popup = document.getElementById('discoveryPopup');
    document.getElementById('discoveryMessage').textContent = message;
    popup.style.display = 'block';
    notificationSound.play();
    setTimeout(() => {
        popup.style.display = 'none';
        if (callback) callback();
    }, 2000);
}

function showFinalPopup(message) {
    const popup = document.getElementById('popup');
    document.getElementById('popupMessage').textContent = message;
    popup.style.display = 'block';
}

function getShapeName(id) {
    switch(id) {
        case '1': return 'Oval';
        case '2': return 'Triângulo';
        case '3': return 'Retângulo vertical';
        case '4': return 'Círculo';
        case '5': return 'Quadrado';
        case '6': return 'Retângulo horizontal';
        case '7': return 'Losango';
        case '8': return 'Pentágono';
        case '9': return 'Prisma Hexagonal';
        case '10': return 'Cilindro';
        case '11': return 'Cúpula'; 
        case '12': return 'Retangulo';
        case '13': return 'Cilindro';
        case '14': return 'Retangulo';
        case '15': return 'Octógono';
        case '16': return 'Retângulo';
        case '17': return 'Diamante';
        default: return '';
    }
}

// Ocultar todos os popups ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    popup.style.display = 'none'; // Garante que o popup esteja oculto ao carregar
});
