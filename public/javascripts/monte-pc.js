"use strict";

/* 
 FAZER CADA CAIXA TER UM VALOR PRÓPRIO E CRIAR A FUNÇÃO SOMA TOTAL QUE SOMA O VALOR DE TODAS AS CAIXAS
*/

import { realParaNumber, numberParaReal } from "./moeda.js";

function MontePC() {
  const menuContainer = document.querySelector(".menu_monte_pc");
  const valorTotalEl = document.querySelector(".valor-total .total");
  const caixaProds = menuContainer.querySelector(".produtos-montepc");
  const botaoAvancar = menuContainer.querySelector(".btn-avancar");
  const selectFabricantes = menuContainer.querySelector("#marcas-prod");

  let caixaOpcaoSelecionada;
  let valorTotal = 0;

  //Função que mostra o conteúdo dentro do menu
  const conteudoMenu = (tipoProd) => {
    //Muda o titulo do menu
    const tituloMenu = menuContainer.querySelector("#titulo-produto");
    tituloMenu.textContent = tipoProd;

    //Puxa os dados do produto
    let produtosDados;
    const fabricantes = new Set();
    fetch(`/monteseupc/${tipoProd.toLowerCase()}`)
      .then((resp) => resp.json())
      .then((prods) => {
        produtosDados = prods;

        //Puxa as imagens
        prods.forEach((prod, i) => {
          fetch(`/enviarimagem/${prod.id}`)
            .then((resp) => resp.blob())
            .then((blob) => {
              const imgProd = URL.createObjectURL(blob);
              caixaProds.insertAdjacentHTML(
                "beforeend",
                `
                <div class="produto">
                  <input type="radio" name="produto" id="" />
          
                  <!-- Infos do produto -->
                <div class="info-produto">
                  <div class="foto-produto"><img src="${imgProd}" alt=""></div>
          
                  <div class="descricao">
                    <h2>
                      ${prod.name}
                    </h2>
                    <span class="preco"
                      ><span id="preco-produto">${prod.price}</span>
                      <span class="preco-parcelado"></span
                    ></span>
                    </div>
                  </div>
                  <button>Selecionar</button>
                </div>
              
              `
              );

              fabricantes.add(prod.fabricante);
            })
            .finally(() => {
              if (i === prods.length - 1) {
                fabricantes.forEach((fab) => {
                  selectFabricantes.insertAdjacentHTML(
                    "beforeend",
                    `
                  <option value="${fab}">${fab.toUpperCase()}</option>
                  `
                  );
                });
              }
            });
        });
      });

    /* Adicionar as marcas*/
  };

  //Função que deixa como selected o produto clicado
  caixaProds.addEventListener("click", function (e) {
    e.preventDefault();
    const clicado = e.target.closest(".produto");

    if (!clicado) return;

    //Tira a classe selected de todos os produtos
    this.querySelectorAll(".produto").forEach((el) => {
      el.classList.remove("selected");
    });

    clicado.classList.add("selected");
    const checkboxClicado = clicado.querySelector("input");
    checkboxClicado.checked = "true";
  });

  //Evento no botão avancar que seleciona o elemento e leva as informações dele pra caixa dele e muda a caixa do valor total
  botaoAvancar.addEventListener("click", function (e) {
    if (!caixaOpcaoSelecionada) return;

    //Procura o selected
    const produto = menuContainer.querySelector(".produto.selected");

    if (!produto) return;

    //Leva as informações para a caixa selecionada

    //Soma o valor total
    const somaTotal = () => {};

    //Fecha o menu
    mudaMenuMontePC();

    // const prodSelecionado = produtos.reduce((acc, prod) => {
    //   console.log(acc);
    // });
  });

  //Função que abre e fecha o menu
  const mudaMenuMontePC = (tipoProd) => {
    if (!menuContainer.classList.contains("aberto")) {
      menuContainer.style.right = "0";
      document.body.style.overflow = "hidden";
      menuContainer.classList.add("aberto");

      document.body.insertAdjacentHTML("afterbegin", `<div id="blur"> </div>`);

      //Depois de abrir o menu chama a função que mostra o conteúdo
      conteudoMenu(tipoProd);
    } else {
      menuContainer.style.right = "-100%";
      document.body.style.overflow = "visible";
      menuContainer.classList.remove("aberto");
      document.querySelector("#blur").remove();
      //Remove todos os produtos recebidos
      caixaProds.innerHTML = "";
      selectFabricantes.innerHTML = "";
      selectFabricantes.innerHTML = `<option value="" selected>Todas as Marcas</option>`;
    }
  };

  //Abre o menu
  const opcoesPecas = document.querySelector(".opcoes-pecas");
  opcoesPecas.addEventListener("click", function (e) {
    const clicado = e.target.closest(".opcao-btn");

    //Retorna caso o clicado seja nulo
    if (!clicado) return;

    mudaMenuMontePC(clicado.dataset.tipoPeca);
    caixaOpcaoSelecionada = clicado.closest(".opcao");
  });

  //Eventos para fechar o menu
  document.body.addEventListener("click", function (e) {
    if (
      e.target === document.querySelector("#blur") &&
      menuContainer.classList.contains("aberto")
    )
      mudaMenuMontePC();
  });
  document
    .querySelector(".fecha-montepc")
    .addEventListener("click", mudaMenuMontePC);
}

MontePC();
