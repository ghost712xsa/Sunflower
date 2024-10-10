const texts = [
  "Bem-vindo ao jogo! Clique em 'Continuar' para continuar.",
  "Neste jogo, você enfrentará muitos desafios.",
  "Escolha 'Jogar' para iniciar sua aventura ou 'Fases' para selecionar um nível."
];

let textIndex = 0;
const dialogText = document.getElementById('dialog-text');
const nextButton = document.getElementById('next-button');
const playButtonDialog = document.getElementById('play-button-dialog');
const dialogBox = document.querySelector('.dialog-box');
const dogImage = document.querySelector('.dog');

// Verifica se o diálogo já foi mostrado
if (localStorage.getItem('dialogShown') !== 'true') {
  dialogBox.style.display = 'block';
  dogImage.style.display = 'block';
  
  nextButton.addEventListener('click', () => {
    textIndex++;
    if (textIndex < texts.length) {
      dialogText.textContent = texts[textIndex];
    } else {
      nextButton.style.display = 'none';
      playButtonDialog.style.display = 'block';
    }
  });

  playButtonDialog.addEventListener('click', () => {
    dialogBox.style.display = 'none';
    dogImage.style.display = 'none';
    localStorage.setItem('dialogShown', 'true'); // Marca o diálogo como mostrado
  });
} else {
  // Se o diálogo já foi mostrado, oculta os elementos
  dialogBox.style.display = 'none';
  dogImage.style.display = 'none';
}
