const textBox = document.getElementById('rpgTextBox');
const textElement = document.getElementById('rpgText');
const continueButton = document.getElementById('continueButton');
const skipButton = document.getElementById('skipButton');
const Rita = document.getElementById('RitaBrincando');
const muteButton = document.getElementById('muteButton'); // Botão de mutar

let textArray = [
    "CLIQUE EM 'CONTINUAR' PARA AVANÇAR",
    "OLÁ, QUE SURPRESA VOCÊ POR AQUI! VAMOS COMEÇAR NOSSO DIA COM MUITA AVENTURA E DIVERSÃO, EXPLORANDO NOSSO PEQUENO CANTINHO.",
    "VOU TE APRESENTAR ALGUMAS FORMAS, E GOSTARIA QUE VOCÊ ME AJUDASSE A ENCONTRAR ALGUNS OBJETOS PARECIDOS COM DETERMINADA FORMA.", 
    "VOCÊ ESTÁ PRONTO(A)? VAMOS COMEÇAR!"
];

// Arquivos de áudio correspondentes
let audioFiles = [
    "#",
    "1Quarto.mp3",  // Áudio correspondente ao primeiro texto
    "2Quarto.mp3",  // Áudio correspondente ao segundo texto
    "3Quarto.mp3"   // Áudio correspondente ao terceiro texto
];

let textIndex = 0;
let charIndex = 0;
let typingSpeed = 20; // Velocidade inicial da digitação (em milissegundos)
let audio = new Audio(); // Objeto de áudio

// Função para iniciar a reprodução de áudio
function playAudio(index) {
    if (audio) {
        audio.pause(); // Interrompe o áudio anterior
        audio.currentTime = 0; // Reseta o tempo do áudio
    }
    audio.src = audioFiles[index]; // Carrega o arquivo de áudio correspondente
    audio.play().catch((error) => {
        // Ocorre um erro se a reprodução for bloqueada
        console.log('Reprodução automática bloqueada, aguardando interação do usuário');
    });
}

// Função para digitar o texto automaticamente
function typeText() {
    if (charIndex === 0) {
        playAudio(textIndex); // Inicia o áudio correspondente ao texto assim que a digitação começa
    }
    
    if (charIndex < textArray[textIndex].length) {
        textElement.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, typingSpeed);
    }
}

// Inicializa a primeira linha de texto
window.addEventListener('load', () => {
    textElement.textContent = ''; // Limpa o conteúdo da caixa de texto ao carregar
    typeText(); // Inicia a digitação do texto

    // Carregar o estado do mute ao iniciar a página
    const isMuted = localStorage.getItem('isMuted') === 'true';
    audio.muted = isMuted; // Aplica o estado de mutação
    muteButton.textContent = isMuted ? 'Desmutar Som' : 'Mutar Som'; // Atualiza o texto do botão
});

// Função para passar para o próximo texto e áudio
continueButton.addEventListener('click', () => {
    if (textIndex < textArray.length - 1) {
        textIndex++;
        charIndex = 0;
        textElement.textContent = '';
        typingSpeed = 50; // Restaura a velocidade de digitação
        typeText();
    } else {
        // Redireciona para outra tela após o último texto
        window.location.href = 'PrimeiraTelaJogo.html';
    }
});

// Função para acelerar a digitação
skipButton.addEventListener('click', () => {
    typingSpeed = 0; // Ajusta a velocidade para instantâneo
    if (audio) {
        audio.pause(); // Interrompe o áudio atual
    }
});

// Função para mover a caixa de texto
let isDraggingTextBox = false;
let offsetXTextBox, offsetYTextBox;

textBox.addEventListener('mousedown', (e) => {
    isDraggingTextBox = true;
    offsetXTextBox = e.clientX - textBox.offsetLeft;
    offsetYTextBox = e.clientY - textBox.offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (isDraggingTextBox) {
        textBox.style.left = `${e.clientX - offsetXTextBox}px`;
        textBox.style.top = `${e.clientY - offsetYTextBox}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDraggingTextBox = false;
});

// Função para mover a imagem de Rita
let isDraggingRita = false;
let offsetXRita, offsetYRita;

Rita.addEventListener('mousedown', (e) => {
    isDraggingRita = true;
    offsetXRita = e.clientX - Rita.offsetLeft;
    offsetYRita = e.clientY - Rita.offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (isDraggingRita) {
        Rita.style.left = `${e.clientX - offsetXRita}px`;
        Rita.style.top = `${e.clientY - offsetYRita}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDraggingRita = false;
});

// Função que força a reprodução de áudio após interação
document.addEventListener('click', () => {
    if (audio.paused) {
        playAudio(textIndex);  // Reproduz o áudio assim que o usuário interage
    }
});

// Função para alternar o estado do mute
muteButton.addEventListener('click', () => {
    const isMuted = localStorage.getItem('isMuted') === 'true';
    const newMutedState = !isMuted;

    localStorage.setItem('isMuted', newMutedState); // Armazena o estado
    audio.muted = newMutedState; // Aplica o novo estado
    muteButton.textContent = newMutedState ? 'Desmutar Som' : 'Mutar Som'; // Atualiza o texto do botão
});
