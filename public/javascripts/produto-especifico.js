
// VARIÁVEIS
const imagens = document.querySelectorAll(".slide-imagens img");
const slideImg = document.querySelector(".slide-imagens")
const imgAtiva = document.querySelector(".img-ativa");
const btnPassa = document.querySelector(".passa-imagem")
const btnVolta = document.querySelector(".volta-imagem")
const btnCompra = document.querySelector(".btn-add-carrinho");

//FAZ A PÁGINA MUDAR

let imgAtual = 0

function ativaImg(img) {
  
  imagens.forEach((im) => {
    im.classList.remove("ativa");
  })
  img.classList.add("ativa");
  
  imgAtiva.src = slideImg.querySelector(".ativa").src;
}

//Adiciona o event listener nas imagens
imagens.forEach((img, i) => {
  img.addEventListener("click", function(e) {
    ativaImg(this);
    imgAtual = i;
  });
})

//Adiciona o evento nos botões
btnVolta.addEventListener("click", function() {
  imgAtual === imagens.length - 1 ? imgAtual = 0 : imgAtual++;
  ativaImg(imagens[imgAtual]);
});

btnPassa.addEventListener("click", function() {
  imgAtual === 0 ? imgAtual = imagens.length - 1 : imgAtual--;
  ativaImg(imagens[imgAtual]);
});

//Transforma a primeira imagem na ativa
ativaImg(imagens[0]);

//ADICIONA O ITEM NO LOCAL STORAGE QUANDO CLICAR EM COMPRAR

//Caso o localstorage esteja vazio cria uma array chamada carrinho dentro dele
if(!localStorage.getItem("carrinho"))
  localStorage.setItem("carrinho", JSON.stringify([]));

const id = Number(location.href.split("/").slice(-1)[0]); //Gambiarra pra puxar o id do produto
let produto;

//Variável que vem o item no local storage
const itensCarrinhoStorage =  JSON.parse(localStorage.getItem("carrinho"));

//Verifica se o produto já existe
const existeProduto = (itens, produto) => {
  for(let prod of itens) {
    if(prod.id === produto.id) {
      return true;
    }
  }
  return false;
}

//Modal de produto adicionado no carrinho
const modalProduto = {
  janelaModal: document.querySelector(".modal-add-produto"),
  overlay: document.querySelector(".overlay"),
  botaoFechar: document.querySelector(".fecha-modal"),
  botaoContinua:  document.querySelector(".continuar-comprando"),

  init() {
    this.botaoFechar.addEventListener("click", this.fechaModal.bind(this));
    this.botaoContinua.addEventListener("click",this.fechaModal.bind(this));
    this.overlay.addEventListener("click", this.fechaModal.bind(this));

  },
  abreModal() {

    this.janelaModal.classList.remove("fechado");
    this.overlay.classList.remove("fechado");
    document.body.style.overflow = "hidden";
  },
  fechaModal() {
    this.janelaModal.classList.add("fechado");
    this.overlay.classList.add("fechado");
    document.body.style.overflow = "visible";
  },
}
modalProduto.init();

//Adiciona o produto no carrinho
btnCompra.addEventListener("click", function(e) {

  fetch(`/enviaprod/${id}`).then((resp) => resp.json()).then((dadoProd) => {
    if(existeProduto(itensCarrinhoStorage, dadoProd)) {
      return;
    }
    
    dadoProd.quantidade = 1;
    itensCarrinhoStorage.push(dadoProd);
    localStorage.setItem("carrinho", JSON.stringify(itensCarrinhoStorage));
    console.log(itensCarrinhoStorage)
  }).finally(()=> {
    modalProduto.abreModal();
  });
})

