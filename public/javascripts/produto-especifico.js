const imagens = document.querySelectorAll(".slide-imagens img");
const slideImg = document.querySelector(".slide-imagens")
const imgAtiva = document.querySelector(".img-ativa");
const btnPassa = document.querySelector(".passa-imagem")
const btnVolta = document.querySelector(".volta-imagem")

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