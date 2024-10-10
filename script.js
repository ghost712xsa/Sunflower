document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeToggleButton = document.getElementById('theme-toggle');
    
    // URL da imagem de fundo claro
    const lightImage = 'FundoClaro.png?v=1.0';

    // Função para carregar a imagem de fundo e o tema do localStorage
    function loadBackgroundImage() {
        // Define a imagem de fundo para a imagem clara
        body.style.backgroundImage = `url('${lightImage}')`;
        themeToggleButton.classList.add('light');
    }

    // Carregar a imagem de fundo ao carregar a página
    loadBackgroundImage();

    // JavaScript para exibir e ocultar o pop-up
    document.getElementById('info-image').addEventListener('click', function() {
        document.getElementById('popup').style.display = 'block';
    });

    document.getElementById('close-popup').addEventListener('click', function() {
        document.getElementById('popup').style.display = 'none';
    });

    // Função para forçar a orientação da tela
    function lockOrientation() {
        screen.orientation.lock('landscape').catch(err => {
            console.log('Orientation lock failed: ', err);
        });
    }

    // Tenta bloquear a orientação ao carregar a página
    lockOrientation();
    
    // Tenta bloquear a orientação sempre que o dispositivo muda de orientação
    window.addEventListener('orientationchange', lockOrientation);
});
