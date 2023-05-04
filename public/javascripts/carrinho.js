/*
ESSE CÓDIGO TÁ UMA PORCARIA OTIMIZAR ELE DEPOIS
*/

// -=-=-=- Variáveis -=-=-=-
const itensCarrinho = JSON.parse(localStorage.getItem("carrinho")); //Cria a array de objetos que vieram do carrinho
const containerProdutos = document.querySelector(".produtos-carrinho .produtos"); //Container dos produtos
const btnLimpaCarrinho = document.querySelector(".btn-limpar-carrinho"); //Botão limpa carrinho
const subtotalEL = document.querySelector("#valor-subtotal");
const totalEL = document.querySelector("#valor-total");
const freteEL = document.querySelector("#opcao-frete");


//Código principal

//Atualiza as infos de compra
const atualizaValorCompra = (cupom = 1) => {
  let valorTotal = 0;
  itensCarrinho.forEach((prod) => {
    valorTotal += prod.price * prod.quantidade;
  });

  subtotalEL.textContent = valorTotal.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  totalEL.textContent = valorTotal.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  freteEL.textContent = "Gratis";
};

//Condição de carrinho vazio e carrinho cheio
if (
  !itensCarrinho ||
  (Array.isArray(itensCarrinho) && itensCarrinho.length === 0)
) {
  containerProdutos.classList.add("vazio");
  containerProdutos.insertAdjacentHTML(
    "beforeend",
    `
  <h2>Não há produtos no carrinho</h2>
  `
  );

  btnLimpaCarrinho.style.display = "none";
} else {
  //Faz o request dos produtos no carrinho
  itensCarrinho.forEach((prod, i) => {
    fetch(`/enviarimagem/${prod.id}`)
      .then((response) => response.blob())
      .then((blob) => {
        const imgProd = URL.createObjectURL(blob);

        containerProdutos.insertAdjacentHTML(
          "beforeend",
          `    
      <div class="card-produto-carrinho" data-id=${prod.id}>
      <div class="container-img-desc">
        <a class="img-prod" href="/produto/${prod.id}">
          <img
            src="${imgProd}"
            alt=""
          />
        </a>

        <div class="descricao-produto">
          <a href="/produto/${prod.id}" class="descricao-produto">
            ${prod.name}
          </a>
        </div>
      </div>
      <div class="quantidade-prod ${prod.quantidade == 1 ? "unico" : ""}">
        <span class="menos">-</span>
        <span class="num">${prod.quantidade}</span>
        <span class="mais">+</span>
      </div>

      <div class="preco-prod">
        <span>${prod.price.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}</span>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="remover-prod"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
    </div>
      `
        );
      })
      .finally(() => {
        if (i === itensCarrinho.length - 1) atualizaValorCompra();
      });
  });

  //Botão limpa todos os produtos do carrinho
  btnLimpaCarrinho.addEventListener("click", function (e) {
    localStorage.removeItem("carrinho");
    location.reload();
  });
  const removerProdutoBotoes = document.querySelectorAll(".remover-prod");

  //Eventos no botão de remover produto
  const containerProdutos = document.querySelector(".produtos");

  containerProdutos.addEventListener("click", function (e) {
    const clicado =
      e.target.closest(".remover-prod") ||
      e.target.closest(".menos") ||
      e.target.closest(".mais");

    if (!clicado) return;

    //Pega o id do produto que foi clicado
    const produtoDel = clicado.closest(".card-produto-carrinho");
    const idProduto = Number(produtoDel.dataset.id);
    const indexProd = itensCarrinho.findIndex((prod) => prod.id === idProduto);

    //Remove produto com click na lixeirinha
    if (clicado.classList.contains("remover-prod")) {
      itensCarrinho.splice(indexProd, 1);

      location.reload();
    }
    //Aumenta a quantidade de produto
    else if (clicado.classList.contains("mais")) {
      itensCarrinho[indexProd].quantidade++;
    }
    //Diminui a quantidade de produto
    else if (clicado.classList.contains("menos")) {
      if (itensCarrinho[indexProd].quantidade === 1) {
        return;
      }
      itensCarrinho[indexProd].quantidade--;
    }

    location.reload();
    localStorage.setItem("carrinho", JSON.stringify(itensCarrinho));
  });
}
