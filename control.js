document.addEventListener('DOMContentLoaded', function () {
    let currentBanner = 0;
    const banners = document.querySelectorAll('#bannerRotativo .carousel-track img');
    const totalBanners = banners.length;

    if (banners.length === 0) {
        console.error("Nenhum banner encontrado.");
        return;
    }

    window.mudarBanner = function (direcao) {
        if (direcao === 'esquerda') {
            currentBanner = (currentBanner === 0) ? totalBanners - 1 : currentBanner - 1;
        } else if (direcao === 'direita') {
            currentBanner = (currentBanner === totalBanners - 1) ? 0 : currentBanner + 1;
        }

        const carouselTrack = document.querySelector('#bannerRotativo .carousel-track');
        carouselTrack.style.transform = `translateX(-${currentBanner * 100}%)`;
    };
});
function showToast(mensagem, cor = "#ff8800") {
    const toast = Toastify({
      text: mensagem,
      duration: 3000,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: cor
      },
      onClick: function () {} // opcional
    });
  
    toast.showToast();
  
    // Adiciona animação de ENTRADA
    setTimeout(() => {
      const toasts = document.querySelectorAll(".toastify");
      if (toasts.length > 0) {
        const lastToast = toasts[toasts.length - 1];
        lastToast.classList.add("animate__animated", "animate__bounceInRight");
  
        // Substitui fade out ao final da duração
        setTimeout(() => {
          lastToast.classList.remove("animate__bounceInRight");
          lastToast.classList.add("animate__fadeOutRight");
  
          // Remove o toast do DOM depois da animação
          setTimeout(() => {
            lastToast.remove();
          }, 1000); // tempo da animação de saída
        }, 2800); // tempo para começar a sumir (duration - 200ms)
      }
    }, 50);
  }
  

let carrinho = [];

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-adicionar")) {
        const nome = e.target.dataset.nome;
        const preco = parseFloat(e.target.dataset.preco);

        carrinho.push({ nome, preco });
        atualizarCarrinho();
        showToast(`${nome} adicionado ao carrinho`, '#28a745');
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
        li.classList.add("item-carrinho");
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
    const lista = document.getElementById("listaCarrinho");
    const li = lista.children[index];
    const nome = carrinho[index].nome;

    if (!li) return;

    li.classList.add("item-removendo");

    setTimeout(() => {
        carrinho.splice(index, 1);
        atualizarCarrinho();
        showToast(`${nome} removido do carrinho`,'#dc3545');
    }, 300);
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
