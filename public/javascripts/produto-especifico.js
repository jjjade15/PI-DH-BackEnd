
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

if(!localStorage.getItem("carrinho"))
  localStorage.setItem("carrinho", JSON.stringify([]));

const id = Number(location.href.split("/").slice(-1)[0]); //Gambiarra pra puxar o id do produto
let produto;

const itensCarrinhoStorage =  JSON.parse(localStorage.getItem("carrinho"));


const existeProduto = (itens, produto) => {
  itens.forEach((prod) => {
    if(prod.id == produto.id)
      return true;
  })

  return false;
}

btnCompra.addEventListener("click", function(e) {
  fetch(`/enviaprod/${id}`).then((resp) => resp.json()).then((dadoProd) => {
    console.log(existeProduto(itensCarrinhoStorage, dadoProd))
    if(existeProduto(itensCarrinhoStorage, dadoProd)) {
      return;
    }

    console.log("Ativou")
    itensCarrinhoStorage.push(dadoProd);
    localStorage.setItem("carrinho", JSON.stringify(itensCarrinhoStorage));
  
  });
})



