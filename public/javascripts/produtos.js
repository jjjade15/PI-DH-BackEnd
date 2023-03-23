//Mostra a quantidade de resultados encontrados
const numProdutos = document.querySelector(".flex-anuncios").childElementCount;
document.querySelector("#quantid-produtos").innerText = numProdutos;

//Faz o request do filtro
const urlSite = new URL(location.href)

document.querySelector(".select-ord").addEventListener("change", function(e) {
  urlSite.searchParams.set("order", this.value);
  console.log(urlSite.href);
  window.location.href = urlSite;
});


