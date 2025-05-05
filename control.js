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
// função genérica de toast
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    // remove após 3s (duração da animação)
    setTimeout(() => toast.remove(), 3000);
  }
  
let carrinho = [];

document.addEventListener("click", function(e) {
    if (e.target.classList.contains("btn-adicionar")) {
        const nome = e.target.dataset.nome;
        const preco = parseFloat(e.target.dataset.preco);
      
        carrinho.push({ nome, preco });
        atualizarCarrinho();
        showToast(`${nome} adicionado ao carrinho`, 'success');
      }
 
});

function atualizarCarrinho() {
    const lista = document.getElementById("listaCarrinho");
    const contador = document.getElementById("contadorCarrinho");
    const totalEl = document.getElementById("totalCarrinho");
  
    lista.innerHTML = "";
    let total = 0;
  
    carrinho.forEach((item, index) => {
      total += item.preco;
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.nome} - R$ ${item.preco.toFixed(2)}
        <button class="btn-remover" onclick="removerItem(${index})">Remover</button>
      `;
      lista.appendChild(li);
    });
  
    contador.textContent = carrinho.length;
    totalEl.textContent = `R$ ${total.toFixed(2)}`;
  }
  
function removerItem(index) {
   
        // pegue o nome antes de remover
        const nome = carrinho[index].nome;
        carrinho.splice(index, 1);
        atualizarCarrinho();
        showToast(`${nome} removido do carrinho`, 'error');
      
      
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function abrirCarrinho() {
  document.getElementById("modalCarrinho").style.display = "flex";
}

function fecharCarrinho() {
  document.getElementById("modalCarrinho").style.display = "none";
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  const mensagem = carrinho.map(item => `🛒 ${item.nome} - R$ ${item.preco.toFixed(2)}`).join('\n');
  const total = carrinho.reduce((acc, item) => acc + item.preco, 0);

  window.open(`https://wa.me/5511999999999?text=Olá! Quero comprar:\n${mensagem}\n\nTotal: R$ ${total.toFixed(2)}`, '_blank');
}
