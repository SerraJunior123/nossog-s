window.addEventListener("DOMContentLoaded", () => {
    // Verifica se o usuário já está cadastrado
    const usuarioCadastrado = localStorage.getItem("usuario");
  
    if (usuarioCadastrado) {
      const usuario = JSON.parse(usuarioCadastrado);
      const primeiroNome = usuario.nome.split(' ')[0]; // Pega o primeiro nome
  
      document.getElementById('nomeUsuario').textContent = primeiroNome;
      document.getElementById('loadingScreen').style.display = 'none';
      document.getElementById('app').style.display = 'block';
      
      // Carregar produtos
      carregarProdutos();
    } else {
      setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
        document.getElementById('cadastroModal').style.display = 'flex';
      }, 2000);
    }
  
    // Controla o envio do formulário de cadastro
    const form = document.getElementById("formCadastro");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const cadastro = {
        nome: document.getElementById("nome").value,
        rua: document.getElementById("rua").value,
        bairro: document.getElementById("bairro").value,
        telefone: document.getElementById("telefone").value,
        senha: document.getElementById("senha").value,
      };
  
      // Salva no localStorage
      localStorage.setItem("usuario", JSON.stringify(cadastro));
  
      // Envia os dados para a planilha de usuários
      enviarParaPlanilhaCadastro(cadastro);
  
      // Exibe o primeiro nome no app
      const primeiroNome = cadastro.nome.split(' ')[0];
      document.getElementById('nomeUsuario').textContent = primeiroNome;
  
      // Fecha o modal e mostra o app
      document.getElementById('cadastroModal').style.display = 'none';
      document.getElementById('app').style.display = 'block';
    });
  });

    function enviarParaPlanilhaCadastro(cadastro) {
      const scriptURL = 'https://script.google.com/macros/s/AKfycbzUbxMpUbD4z1NbccuJ3G7ZsCwCAieGr-DdbvRpGe0X-F5nyLLJ-MwWwYt1kLvUbRvnIQ/exec'; // Use a URL do seu Apps Script
    
      const formData = new FormData();
      formData.append('nome', cadastro.nome);
      formData.append('rua', cadastro.rua);
      formData.append('bairro', cadastro.bairro);
      formData.append('telefone', cadastro.telefone);
      formData.append('senha', cadastro.senha);
    
      fetch(scriptURL, {
        method: 'POST',
        body: formData
      })
      .then(response => response.text())
      .then(result => {
        console.log("Dados enviados para a planilha via Apps Script:", result);
      })
      .catch(error => {
        console.error("Erro ao enviar dados para a planilha:", error);
      });
    }
    
  
  // Função para carregar os produtos da planilha
  // Função para carregar os produtos da planilha
function carregarProdutos() {
  const sheetId = "1gjUkfzz0_0XWVXkMA4Bn0jC_RKWYuiCT0rSQ5KbGVHA"; // Substitua pela ID da sua planilha
  const apiKey = "AIzaSyD9RaM6QqFsE9I6egeRFXaq09qivzNieMk"; // Substitua pela sua chave de API do Google

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Produtos!A2:D?key=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const produtos = data.values;
      const container = document.getElementById("produtosContainer");
      container.innerHTML = ""; // Limpa o conteúdo anterior, caso haja

      produtos.forEach(produto => {
        const nome = produto[0];
        const preco = produto[1];
        const descricao = produto[2] || "";
        const imagemUrl = produto[3] || "images/default.jpg"; // Caso não tenha imagem, exibe uma padrão

        const card = document.createElement("div");
        card.className = "card-produto";

        card.innerHTML = `
        <img src="${imagemUrl}" alt="${nome}" class="img-produto" />
        <div class="info-produto">
          <h3>${nome}</h3>
          <p>${descricao}</p>
          <strong>R$ ${preco}</strong>
          <button>Comprar</button>
        </div>
      `;
      
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Erro ao carregar os produtos:", error);
    });
}
