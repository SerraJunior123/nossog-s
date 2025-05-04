document.addEventListener('DOMContentLoaded', function() {
    let currentBanner = 0;
    const banners = document.querySelectorAll('#bannerRotativo .carousel-track img'); // Seleciona todas as imagens do banner
    const totalBanners = banners.length;

    // Verifica se os banners existem
    if (banners.length === 0) {
        console.error("Nenhum banner encontrado.");
        return;
    }

    // Função para mudar o banner
    window.mudarBanner = function(direcao) {
        // Atualiza o índice do banner com base na direção
        if (direcao === 'esquerda') {
            currentBanner = (currentBanner === 0) ? totalBanners - 1 : currentBanner - 1;
        } else if (direcao === 'direita') {
            currentBanner = (currentBanner === totalBanners - 1) ? 0 : currentBanner + 1;
        }

        // Move a "track" para o banner correto
        const carouselTrack = document.querySelector('#bannerRotativo .carousel-track');
        carouselTrack.style.transform = `translateX(-${currentBanner * 100}%)`;
    };
});
