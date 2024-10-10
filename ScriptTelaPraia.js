const TextBox = document.getElementById('RpgTextBox');
const TextElement = document.getElementById('RpgText');
const ContinueButton = document.getElementById('ContinueButton');
const SkipButton = document.getElementById('SkipButton'); // Adicione o botão pular aqui
const RitaImage = document.getElementById('RitaImage');
const muteButton = document.getElementById('muteButton'); // Botão de mutar

let TextArray = [
    "CLIQUE EM 'CONTINUAR' PARA AVANÇAR",
    "O DIA ESTÁ ACABANDO, MAS A DIVERSÃO CONTINUA, VAMOS APROVEITAR ATÉ AMANHÃ MUITAS BRINCADEIRAS NA PRAIA!"
];

// Arquivo de áudio correspondente
let AudioFiles = [
    "#",
    "1Praia.mp3"  
];

let TextIndex = 0;
let CharIndex = 0;
let TypingSpeed = 20; // Velocidade inicial da digitação (em milissegundos)
let audio = new Audio(); // Objeto de áudio

// Função para iniciar a reprodução de áudio
function playAudio(index) {
    if (audio) {
        audio.pause(); // Interrompe o áudio anterior
        audio.currentTime = 0; // Reseta o tempo do áudio
    }
    audio.src = AudioFiles[index]; // Carrega o arquivo de áudio correspondente
    audio.play().catch((error) => {
        console.log('Reprodução automática bloqueada, aguardando interação do usuário');
    });
}

// Função para digitar o texto automaticamente
function typeText() {
    if (CharIndex < TextArray[TextIndex].length) {
        TextElement.textContent += TextArray[TextIndex].charAt(CharIndex);
        CharIndex++;
        setTimeout(typeText, TypingSpeed);
    }
}

// Inicializa a primeira linha de texto e o áudio quando a página carrega
window.addEventListener('load', () => {
    TextElement.textContent = ''; // Limpa o conteúdo da caixa de texto ao carregar
    typeText(); // Inicia a digitação do texto
    playAudio(TextIndex); // Inicia o áudio correspondente ao texto

    // Carregar o estado do mute ao iniciar a página
    const isMuted = localStorage.getItem('isMuted') === 'true';
    audio.muted = isMuted; // Aplica o estado de mutação
    muteButton.textContent = isMuted ? 'Desmutar Som' : 'Mutar Som'; // Atualiza o texto do botão
});

// Função para passar para o próximo texto e áudio
ContinueButton.addEventListener('click', () => {
    if (audio) {
        audio.pause(); // Interrompe o áudio atual
    }
    if (TextIndex < TextArray.length - 1) {
        TextIndex++;
        CharIndex = 0;
        TextElement.textContent = ''; // Limpa o texto anterior
        TypingSpeed = 50; // Restaura a velocidade de digitação
        typeText();
        playAudio(TextIndex); // Reproduz o próximo áudio
    } else {
        // Redireciona para outra tela após o último texto
        window.location.href = 'TelaPraiaJogo.html'; 
    }
});

// Função para acelerar a digitação
SkipButton.addEventListener('click', () => {
    TypingSpeed = 0; // Ajusta a velocidade para instantâneo
    if (audio) {
        audio.pause(); // Interrompe o áudio atual
    }
});

// Função para mover a caixa de texto
let isDraggingTextBox = false;
let offsetXTextBox, offsetYTextBox;

TextBox.addEventListener('mousedown', (e) => {
    isDraggingTextBox = true;
    offsetXTextBox = e.clientX - TextBox.offsetLeft;
    offsetYTextBox = e.clientY - TextBox.offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (isDraggingTextBox) {
        TextBox.style.left = `${e.clientX - offsetXTextBox}px`;
        TextBox.style.top = `${e.clientY - offsetYTextBox}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDraggingTextBox = false;
});

// Função para mover a imagem da Rita
let isDraggingRitaImage = false;
let offsetXRitaImage, offsetYRitaImage;

RitaImage.addEventListener('mousedown', (e) => {
    isDraggingRitaImage = true;
    offsetXRitaImage = e.clientX - RitaImage.offsetLeft;
    offsetYRitaImage = e.clientY - RitaImage.offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (isDraggingRitaImage) {
        RitaImage.style.left = `${e.clientX - offsetXRitaImage}px`;
        RitaImage.style.top = `${e.clientY - offsetYRitaImage}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDraggingRitaImage = false;
});

// Função que força a reprodução de áudio após interação
document.addEventListener('click', () => {
    if (audio.paused) {
        playAudio(TextIndex);  // Reproduz o áudio assim que o usuário interage
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
