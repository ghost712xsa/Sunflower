const textBox = document.getElementById('RpgTextBox');
const textElement = document.getElementById('RpgText');
const continueButton = document.getElementById('ContinueButton');
const skipButton = document.getElementById('SkipButton');
const RitaGamerImage = document.getElementById('RitaGamerImage');
const muteButton = document.getElementById('muteButton'); // Botão de mutar

let textArray = [
    "CLIQUE EM 'CONTINUAR' PARA AVANÇAR",
    "O DIA FOI LONGO, MAS AINDA TEMOS TEMPO DE JOGAR UM POUQUINHO ANTES DE DORMIR, O QUE VOCÊ ACHA?",
    "LEMBRE-SE, JOGAR É MUITO DIVERTIDO, MAS NÃO PODEMOS EXAGERAR VIU?",
    "DEIXE CADA ELETRÔNICO COM SEU PAR CORRESPONDENTE"
];

let audioFiles = [
    "#",
    "1QuartoGamer.mp3",
    "2QuartoGamer.mp3",
    "3QuartoGamer.mp3"
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
        console.log('Reprodução automática bloqueada, aguardando interação do usuário');
    });
}

// Função para digitar o texto automaticamente
function typeText() {
    if (charIndex < textArray[textIndex].length) {
        textElement.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, typingSpeed);
    }
}

// Inicializa a primeira linha de texto e o áudio correspondente
window.addEventListener('load', () => {
    textElement.textContent = ''; // Limpa o conteúdo da caixa de texto
    playAudio(textIndex); // Inicia o áudio correspondente
    typeText(); // Inicia a digitação do texto

    // Carregar o estado do mute ao iniciar a página
    const isMuted = localStorage.getItem('isMuted') === 'true';
    audio.muted = isMuted; // Aplica o estado de mutação
    muteButton.textContent = isMuted ? 'Desmutar Som' : 'Mutar Som'; // Atualiza o texto do botão
});

// Função para passar para o próximo texto
continueButton.addEventListener('click', () => {
    audio.pause(); // Interrompe o áudio atual
    audio.currentTime = 0; // Reseta o tempo do áudio

    if (textIndex < textArray.length - 1) {
        textIndex++;
        charIndex = 0;
        textElement.textContent = ''; // Limpa o texto anterior
        typingSpeed = 50; // Restaura a velocidade de digitação
        playAudio(textIndex); // Reproduz o próximo áudio
        typeText(); // Inicia a digitação do próximo texto
    } else {
        // Redireciona para outra tela após o último texto
        window.location.href = 'TelaGamerJogo.html'; 
    }
});

// Função para acelerar a digitação
skipButton.addEventListener('click', () => {
    typingSpeed = 0; // Ajusta a velocidade para instantâneo
    audio.pause(); // Interrompe o áudio atual
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

// Função para mover a imagem do RitaGamer
let isDraggingRitaGamerImage = false;
let offsetXRitaGamerImage, offsetYRitaGamerImage;

RitaGamerImage.addEventListener('mousedown', (e) => {
    isDraggingRitaGamerImage = true;
    offsetXRitaGamerImage = e.clientX - RitaGamerImage.offsetLeft;
    offsetYRitaGamerImage = e.clientY - RitaGamerImage.offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (isDraggingRitaGamerImage) {
        RitaGamerImage.style.left = `${e.clientX - offsetXRitaGamerImage}px`;
        RitaGamerImage.style.top = `${e.clientY - offsetYRitaGamerImage}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDraggingRitaGamerImage = false;
});

// Função que força a reprodução de áudio após interação
document.addEventListener('click', () => {
    if (audio.paused) {
        playAudio(textIndex); // Reproduz o áudio assim que o usuário interage
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
